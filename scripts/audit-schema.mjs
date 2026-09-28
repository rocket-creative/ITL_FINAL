#!/usr/bin/env node
/**
 * JSON-LD audit
 *
 * Two modes:
 *
 *   node scripts/audit-schema.mjs
 *     Static source scan of src/app/**\/{page,metadata,layout}.tsx. Fast, needs
 *     no build, catches the structural mistakes that show up as literals in
 *     source: wrong phone number, missing @id, URLs without a trailing slash,
 *     duplicate node types on one page, FAQ UI with no FAQPage node.
 *
 *   node scripts/audit-schema.mjs --html
 *     Parses prerendered HTML under .next/server/app after `npm run build`,
 *     JSON.parses every ld+json block, and validates the real emitted graph.
 *     Ground truth, but only covers routes Next prerendered.
 *
 * Flags:
 *   --json          machine-readable output
 *   --only <substr> limit to routes whose path contains substr
 *   --quiet         suppress the per-route pass lines
 *
 * Exit code is 1 when any ERROR-severity finding is present, so this can gate CI.
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';

const ROOT = process.cwd();
const APP_DIR = join(ROOT, 'src', 'app');
const HTML_DIR = join(ROOT, '.next', 'server', 'app');
const BASE_URL = 'https://www.genetargeting.com';

// Kept in sync with src/lib/seo/organization.ts. If that file changes, this
// audit is the thing that tells you which pages still carry the old value.
const NAP = {
  telephone: '+1-631-468-8534',
  email: 'inquiry@genetargeting.com',
  streetAddress: '761-80 Coates Avenue',
  postalCode: '11741',
  orgId: `${BASE_URL}/#organization`,
};

const ARGS = process.argv.slice(2);
const MODE_HTML = ARGS.includes('--html');
const AS_JSON = ARGS.includes('--json');
const QUIET = ARGS.includes('--quiet');
const ONLY = (() => {
  const inline = ARGS.find((a) => a.startsWith('--only='));
  if (inline) return inline.slice('--only='.length) || null;
  const i = ARGS.indexOf('--only');
  return i !== -1 ? ARGS[i + 1] ?? null : null;
})();

/** Node types that must never appear twice on one page. */
const SINGLETON_TYPES = new Set([
  'BreadcrumbList',
  'FAQPage',
  'Organization',
  'WebSite',
  'ContactPage',
  'Article',
  'TechArticle',
]);

const findings = [];

function report(severity, route, rule, message) {
  findings.push({ severity, route, rule, message });
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/** src/app/foo/bar/page.tsx -> /foo/bar/ ; strips route groups and slots. */
function routeFromAppFile(file) {
  const rel = relative(APP_DIR, file).split(sep);
  rel.pop();
  const segments = rel.filter((s) => !(s.startsWith('(') && s.endsWith(')')) && !s.startsWith('@'));
  return segments.length ? `/${segments.join('/')}/` : '/';
}

// ---------------------------------------------------------------------------
// Shared validators, run against parsed JSON-LD objects
// ---------------------------------------------------------------------------

function collectNodes(value, out = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectNodes(item, out);
    return out;
  }
  if (value && typeof value === 'object') {
    if (typeof value['@type'] === 'string') out.push(value);
    if (Array.isArray(value['@graph'])) collectNodes(value['@graph'], out);
    for (const [key, child] of Object.entries(value)) {
      if (key === '@graph') continue;
      collectNodes(child, out);
    }
  }
  return out;
}

/**
 * The nodes a block actually declares: `@graph` members, or the block itself.
 * Unlike collectNodes this does not descend, so a Service's nested Offer stubs
 * are not mistaken for page-level entities.
 */
function declaredNodes(block) {
  if (Array.isArray(block['@graph'])) {
    return block['@graph'].filter(
      (node) => node && typeof node === 'object' && typeof node['@type'] === 'string'
    );
  }
  return typeof block?.['@type'] === 'string' ? [block] : [];
}

function isMissingTrailingSlash(url) {
  if (typeof url !== 'string') return false;
  if (!url.startsWith(BASE_URL)) return false;
  const rest = url.slice(BASE_URL.length);
  if (rest === '' || rest === '/') return false;
  const [pathname] = rest.split(/[?#]/);
  if (pathname.endsWith('/')) return false;
  // Files and API routes legitimately have no trailing slash.
  if (/\.[a-z0-9]{2,5}$/i.test(pathname)) return false;
  if (pathname.startsWith('/api/')) return false;
  return true;
}

function validateParsed(route, blocks) {
  const allNodes = [];
  const topLevelTypes = [];
  // Nodes a crawler treats as entities in their own right. Nested stubs such as
  // hasOfferCatalog -> Offer -> itemOffered are descriptive, not addressable,
  // so they are exempt from the @id rule.
  const topLevelNodes = [];

  for (const block of blocks) {
    const nodes = collectNodes(block);
    allNodes.push(...nodes);

    for (const node of declaredNodes(block)) {
      topLevelTypes.push(node['@type']);
      topLevelNodes.push(node);
    }

    if (!block['@context']) {
      report('error', route, 'missing-context', 'A ld+json block has no @context.');
    }
  }

  // Duplicate singleton types
  const counts = new Map();
  for (const type of topLevelTypes) {
    counts.set(type, (counts.get(type) ?? 0) + 1);
  }
  for (const [type, count] of counts) {
    if (count > 1 && SINGLETON_TYPES.has(type)) {
      report('error', route, 'duplicate-type', `${type} is emitted ${count} times on one page.`);
    }
  }

  // @id belongs on entities the page declares, not on nested descriptive stubs.
  for (const node of topLevelNodes) {
    const type = node['@type'];
    const needsId =
      (SINGLETON_TYPES.has(type) && type !== 'BreadcrumbList') ||
      type === 'Service' ||
      type === 'Product';
    if (needsId && !node['@id']) {
      report('warn', route, 'missing-id', `${type} node has no @id.`);
    }
  }

  for (const node of allNodes) {
    const type = node['@type'];

    // NAP drift
    if (node.telephone && node.telephone !== NAP.telephone) {
      report(
        'error',
        route,
        'nap-mismatch',
        `telephone "${node.telephone}" does not match organization.ts ("${NAP.telephone}").`
      );
    }
    if (node.email && node.email !== NAP.email) {
      report('warn', route, 'nap-mismatch', `email "${node.email}" does not match organization.ts.`);
    }
    if (node['@type'] === 'PostalAddress') {
      if (node.streetAddress && node.streetAddress !== NAP.streetAddress) {
        report('error', route, 'nap-mismatch', `streetAddress "${node.streetAddress}" does not match organization.ts.`);
      }
      if (node.postalCode && node.postalCode !== NAP.postalCode) {
        report('error', route, 'nap-mismatch', `postalCode "${node.postalCode}" does not match organization.ts.`);
      }
    }
    if (type === 'Organization' && node['@id'] && node['@id'] !== NAP.orgId) {
      report('error', route, 'org-id', `Organization @id "${node['@id']}" is not the canonical ORG_ID.`);
    }

    // provider / publisher must resolve to the canonical org
    for (const key of ['provider', 'publisher']) {
      const value = node[key];
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const isOrg = value['@type'] === 'Organization' || value['@id'];
        if (isOrg && !value['@id']) {
          report('warn', route, 'unlinked-provider', `${type}.${key} is an Organization with no @id.`);
        }
      }
    }

    // Trailing slashes
    for (const key of ['url', '@id', 'item', 'mainEntityOfPage']) {
      const value = typeof node[key] === 'object' ? node[key]?.['@id'] : node[key];
      if (isMissingTrailingSlash(value)) {
        report('error', route, 'trailing-slash', `${type}.${key} "${value}" is missing a trailing slash.`);
      }
    }

    // Breadcrumb hygiene
    if (type === 'BreadcrumbList') {
      const items = node.itemListElement ?? [];
      items.forEach((item, index) => {
        if (item.position !== index + 1) {
          report('warn', route, 'breadcrumb-position', `BreadcrumbList position ${item.position} at index ${index}.`);
        }
        if (isMissingTrailingSlash(item.item)) {
          report('error', route, 'trailing-slash', `Breadcrumb item "${item.item}" is missing a trailing slash.`);
        }
      });
      const last = items[items.length - 1];
      if (last && typeof last.item === 'string' && !last.item.includes(route.replace(/\/$/, ''))) {
        report('warn', route, 'breadcrumb-self', `Last breadcrumb "${last.item}" does not point at this route.`);
      }
    }

    if (type === 'FAQPage') {
      const questions = node.mainEntity ?? [];
      if (!questions.length) {
        report('error', route, 'empty-faq', 'FAQPage has no mainEntity questions.');
      }
      for (const q of questions) {
        const text = q?.acceptedAnswer?.text;
        if (!text || typeof text !== 'string' || !text.trim()) {
          report('error', route, 'faq-answer', `Question "${q?.name ?? '?'}" has no answer text.`);
        } else if (text.startsWith('[object') || text.includes('React.')) {
          report('error', route, 'faq-answer', `Question "${q?.name}" answer text is a stringified React node.`);
        }
      }
    }
  }

  return { types: topLevelTypes };
}

// ---------------------------------------------------------------------------
// Mode 1: static source scan
// ---------------------------------------------------------------------------

/**
 * Pulls the source text of each ld+json block. These contain JS expressions,
 * not JSON, so we validate them with targeted textual checks rather than
 * pretending to parse them.
 */
function extractLdBlocks(source) {
  const blocks = [];
  const marker = 'application/ld+json';
  let index = source.indexOf(marker);
  while (index !== -1) {
    // Balance braces from the first { after the marker to capture the object.
    const start = source.indexOf('{', index);
    if (start === -1) break;
    let depth = 0;
    let end = start;
    for (let i = start; i < source.length; i++) {
      if (source[i] === '{') depth++;
      else if (source[i] === '}') {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    blocks.push(source.slice(start, end));
    index = source.indexOf(marker, end);
  }
  return blocks;
}

function typesIn(text) {
  const types = [];
  const re = /['"]@type['"]\s*:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = re.exec(text))) types.push(match[1]);
  return types;
}

function staticScan() {
  const files = walk(APP_DIR).filter((f) => /\/(page|layout|metadata)\.tsx?$/.test(f.replace(/\\/g, '/')));
  const byRoute = new Map();

  for (const file of files) {
    const route = routeFromAppFile(file);
    if (ONLY && !route.includes(ONLY)) continue;
    if (!byRoute.has(route)) byRoute.set(route, []);
    byRoute.get(route).push(file);
  }

  const routes = [];

  for (const [route, routeFiles] of [...byRoute.entries()].sort()) {
    const sources = routeFiles.map((f) => ({ file: f, text: readFileSync(f, 'utf8') }));
    // A server page.tsx often delegates the whole render, schema included, to a
    // sibling client component. Pull those in or every such route looks empty.
    for (const extra of resolveLocalImports(routeFiles, sources)) sources.push(extra);
    const combined = sources.map((s) => s.text).join('\n');
    const pageSource = sources.find((s) => /page\.tsx?$/.test(s.file))?.text ?? '';
    if (!pageSource) continue;

    const rel = relative(ROOT, routeFiles.find((f) => /page\.tsx?$/.test(f)));
    const emittedTypes = [];

    for (const { text } of sources) {
      for (const block of extractLdBlocks(text)) {
        const blockTypes = typesIn(block);
        emittedTypes.push(...blockTypes);

        const primary = blockTypes[0];
        if (primary && SINGLETON_TYPES.has(primary) && primary !== 'BreadcrumbList') {
          if (!/['"]@id['"]\s*:/.test(block)) {
            report('warn', route, 'missing-id', `Inline ${primary} block has no @id (${rel}).`);
          }
        }
        if (primary === 'Service' && !/['"]@id['"]\s*:/.test(block)) {
          report('warn', route, 'missing-id', `Inline Service block has no @id (${rel}).`);
        }
        if (primary === 'Service' && /['"]provider['"]/.test(block) && !/@id/.test(block)) {
          report('warn', route, 'unlinked-provider', `Service.provider has no @id (${rel}).`);
        }
      }
    }

    // Component-emitted nodes
    const usesBreadcrumbComponent = /<BreadcrumbSchema\b/.test(combined);
    const usesFaqComponent = /<FAQPageSchema\b/.test(combined);
    const usesFaqBuilder = /buildFAQSchema\s*\(/.test(combined);
    const usesServiceBuilder = /buildServiceSchema\s*\(/.test(combined);
    const usesArticleBuilder = /build(Tech)?ArticleSchema\s*\(/.test(combined);
    const usesContactBuilder = /buildContactPageSchema\s*\(/.test(combined);
    const exportsBreadcrumb = /generateBreadcrumbs\s*\(/.test(combined);

    if (usesBreadcrumbComponent) emittedTypes.push('BreadcrumbList');
    if (usesFaqComponent || usesFaqBuilder) emittedTypes.push('FAQPage');
    if (usesServiceBuilder) emittedTypes.push('Service');
    if (usesArticleBuilder) emittedTypes.push('Article');
    if (usesContactBuilder) emittedTypes.push('ContactPage');

    // Duplicate BreadcrumbList: component plus an inline literal
    const inlineBreadcrumbs = (combined.match(/['"]@type['"]\s*:\s*['"]BreadcrumbList['"]/g) ?? []).length;
    if (usesBreadcrumbComponent && inlineBreadcrumbs > 0) {
      report(
        'error',
        route,
        'duplicate-type',
        `BreadcrumbList emitted twice: <BreadcrumbSchema /> plus ${inlineBreadcrumbs} inline literal(s) (${rel}).`
      );
    } else if (inlineBreadcrumbs > 1) {
      report('error', route, 'duplicate-type', `BreadcrumbList emitted ${inlineBreadcrumbs} times inline (${rel}).`);
    }
    if (exportsBreadcrumb && !usesBreadcrumbComponent && inlineBreadcrumbs === 0 && !/\/thank-you\/$/.test(route) && route !== '/thank-you/') {
      report(
        'warn',
        route,
        'unused-breadcrumb',
        `metadata.ts exports a breadcrumbSchema but the page never renders it (${rel}).`
      );
    }

    // Duplicate Organization / other singletons among inline literals
    const inlineCounts = new Map();
    for (const type of typesIn(combined)) {
      inlineCounts.set(type, (inlineCounts.get(type) ?? 0) + 1);
    }
    for (const [type, count] of inlineCounts) {
      // Organization is excluded: provider and publisher both reference the
      // canonical node by @id on the same page, which is correct. A genuine
      // second *declaration* is caught by the duplicated-org rule below.
      if (count > 1 && SINGLETON_TYPES.has(type) && type !== 'BreadcrumbList' && type !== 'Organization') {
        report('error', route, 'duplicate-type', `${type} emitted ${count} times (${rel}).`);
      }
    }

    // Organization node outside the root layout: should be a ref, not a copy
    if (route !== '/' && /['"]@type['"]\s*:\s*['"]Organization['"]/.test(combined)) {
      const declaresFullOrg = /['"]knowsAbout['"]|['"]numberOfEmployees['"]|['"]alternateName['"]/.test(combined);
      if (declaresFullOrg) {
        report(
          'warn',
          route,
          'duplicated-org',
          `Declares a full Organization node. Use organizationRef from src/lib/seo/organization.ts (${rel}).`
        );
      }
    }

    // NAP drift in source literals
    const phoneMatches = combined.match(/\+1-631-468-\d{4}/g) ?? [];
    for (const phone of new Set(phoneMatches)) {
      if (phone !== NAP.telephone) {
        report('error', route, 'nap-mismatch', `Source contains phone "${phone}", expected "${NAP.telephone}" (${rel}).`);
      }
    }

    // Trailing slashes in absolute URL literals inside ld+json blocks
    for (const { text, file } of sources) {
      for (const block of extractLdBlocks(text)) {
        const urls = block.match(/https:\/\/www\.genetargeting\.com[^'"`\s)]*/g) ?? [];
        for (const url of new Set(urls)) {
          // A URL built from a template expression can't be judged statically.
          if (url.includes('${')) continue;
          if (isMissingTrailingSlash(url)) {
            report(
              'error',
              route,
              'trailing-slash',
              `"${url}" is missing a trailing slash (${relative(ROOT, file)}).`
            );
          }
        }
      }
    }

    // FAQ UI with no FAQPage node
    const hasFaqUi = /UXUIDCAnimatedFAQ|AnimatedFAQ|faqData|faqs=\{/.test(combined);
    const hasFaqSchema = emittedTypes.includes('FAQPage');
    if (hasFaqUi && !hasFaqSchema) {
      report('error', route, 'faq-without-schema', `Renders FAQ UI but emits no FAQPage schema (${rel}).`);
    }

    // No structured data at all on a content route. Confirmation pages are
    // noindex by design, so they are exempt.
    const isConfirmation = /\/thank-you\/$/.test(route) || route === '/thank-you/';
    if (!emittedTypes.length && !/\[/.test(route) && !isConfirmation) {
      report('warn', route, 'no-schema', `No JSON-LD of any kind (${rel}).`);
    }

    // React nodes passed as FAQ answers end up as "[object Object]" unless they
    // go through <FAQPageSchema />, which flattens the tree to text.
    if (hasFaqComponentAnswerRisk(combined) && hasFaqSchema && !usesFaqComponent) {
      report(
        'warn',
        route,
        'faq-answer',
        `FAQ answers may contain JSX; FAQPage answer text needs a plain-string source (${rel}).`
      );
    }

    routes.push({ route, file: rel, types: [...new Set(emittedTypes)] });
  }

  return routes;
}

/**
 * Reads sibling modules a route imports with a relative specifier, one level
 * deep. Covers the `page.tsx` -> `FooClient.tsx` delegation pattern.
 */
function resolveLocalImports(routeFiles, sources) {
  const dirs = new Set(routeFiles.map((f) => dirname(f)));
  const seen = new Set(routeFiles);
  const extra = [];

  for (const { text } of sources) {
    const re = /from\s+['"](\.\.?\/[^'"]+)['"]/g;
    let match;
    while ((match = re.exec(text))) {
      const spec = match[1];
      for (const dir of dirs) {
        for (const ext of ['.tsx', '.ts']) {
          const candidate = resolve(dir, `${spec}${ext}`);
          if (seen.has(candidate) || !existsSync(candidate)) continue;
          seen.add(candidate);
          extra.push({ file: candidate, text: readFileSync(candidate, 'utf8') });
        }
      }
    }
  }

  return extra;
}

/** Heuristic: an answer built from JSX rather than a plain string. */
function hasFaqComponentAnswerRisk(source) {
  return /answer:\s*\(\s*</.test(source) || /answer:\s*</.test(source);
}

// ---------------------------------------------------------------------------
// Mode 2: prerendered HTML
// ---------------------------------------------------------------------------

function htmlScan() {
  if (!existsSync(HTML_DIR)) {
    console.error(`No prerendered output at ${relative(ROOT, HTML_DIR)}. Run "npm run build" first.`);
    process.exit(2);
  }

  const files = walk(HTML_DIR).filter((f) => f.endsWith('.html'));
  const routes = [];

  for (const file of files.sort()) {
    const rel = relative(HTML_DIR, file).replace(/\\/g, '/');
    const route = rel === 'index.html' ? '/' : `/${rel.replace(/\.html$/, '')}/`;
    if (ONLY && !route.includes(ONLY)) continue;

    const html = readFileSync(file, 'utf8');
    const blocks = [];
    const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
    let match;
    while ((match = re.exec(html))) {
      const raw = match[1]
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
      try {
        blocks.push(JSON.parse(raw));
      } catch (error) {
        report('error', route, 'invalid-json', `ld+json block does not parse: ${error.message}`);
      }
    }

    if (!blocks.length) {
      report('warn', route, 'no-schema', 'No JSON-LD in prerendered HTML.');
      routes.push({ route, file: rel, types: [] });
      continue;
    }

    const { types } = validateParsed(route, blocks);

    const hasFaqUi = /aria-expanded=/.test(html) && /faq/i.test(html);
    if (hasFaqUi && !types.includes('FAQPage')) {
      report('warn', route, 'faq-without-schema', 'Page looks like it renders an FAQ accordion but emits no FAQPage.');
    }

    routes.push({ route, file: rel, types: [...new Set(types)] });
  }

  return routes;
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

const routes = MODE_HTML ? htmlScan() : staticScan();

const errors = findings.filter((f) => f.severity === 'error');
const warnings = findings.filter((f) => f.severity === 'warn');

if (AS_JSON) {
  console.log(JSON.stringify({ mode: MODE_HTML ? 'html' : 'static', routes, findings }, null, 2));
} else {
  const byRoute = new Map();
  for (const finding of findings) {
    if (!byRoute.has(finding.route)) byRoute.set(finding.route, []);
    byRoute.get(finding.route).push(finding);
  }

  console.log(`\nJSON-LD audit  ·  mode: ${MODE_HTML ? 'prerendered HTML' : 'static source'}`);
  console.log(`Routes scanned: ${routes.length}\n`);

  for (const [route, routeFindings] of [...byRoute.entries()].sort()) {
    console.log(route);
    for (const f of routeFindings) {
      const tag = f.severity === 'error' ? 'ERROR' : 'warn ';
      console.log(`  ${tag}  [${f.rule}] ${f.message}`);
    }
    console.log('');
  }

  if (!QUIET) {
    const byRule = new Map();
    for (const f of findings) {
      const key = `${f.severity}:${f.rule}`;
      byRule.set(key, (byRule.get(key) ?? 0) + 1);
    }
    console.log('Findings by rule:');
    for (const [key, count] of [...byRule.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`  ${String(count).padStart(4)}  ${key}`);
    }
    console.log('');
  }

  console.log(`${errors.length} error(s), ${warnings.length} warning(s) across ${byRoute.size} route(s).`);
}

process.exit(errors.length > 0 ? 1 : 0);
