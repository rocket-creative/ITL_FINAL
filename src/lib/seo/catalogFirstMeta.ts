/**
 * Catalog first → generate when ready SEO helpers.
 * Applied site wide via generateMetadata unless catalogFirst: false.
 */

import { isRevenuePillarPath } from './revenuePillars';

export const CATALOG_MODEL_COUNT = '14,774+';

const DESCRIPTION_MAX = 160;
const TITLE_MAX = 58;

const SKIP_PATH_PREFIXES = [
  '/admin',
  '/thank-you',
  '/privacy',
  '/terms',
  '/accessibility',
  '/og-preview',
  '/contact',
  '/general-contact',
  '/schedule-meeting',
  '/current-openings',
  '/lab-signals',
  '/video-library',
  '/not-found',
  '/pricing-guide',
];

const CATALOG_HUB_PREFIXES = [
  '/catalog-mouse-models',
  '/all-catalog-mouse-models',
  '/disease-model-catalog',
  '/reporter-mouse-catalog',
  '/order-catalog-models',
  '/order-inquiry-catalog-models',
  '/featured-model',
];

const QUOTE_PATH_PREFIXES = ['/request-quote', '/start-your-project'];

export type CatalogMetaVariant =
  | 'default'
  | 'catalogHub'
  | 'quote'
  | 'publications'
  | 'skip';

export function hasCatalogSignal(text: string): boolean {
  return /catalog|14,?774|ready.?to.?ship|browse.*model|off.?the.?shelf|live colon/i.test(text);
}

export function shouldSkipCatalogMeta(path: string): boolean {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (isRevenuePillarPath(normalized)) return true;
  return SKIP_PATH_PREFIXES.some((prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`));
}

export function getCatalogMetaVariant(path: string): CatalogMetaVariant {
  const normalized = path.startsWith('/') ? path : `/${path}`;

  if (shouldSkipCatalogMeta(normalized)) {
    return 'skip';
  }
  if (CATALOG_HUB_PREFIXES.some((prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`))) {
    return 'catalogHub';
  }
  if (QUOTE_PATH_PREFIXES.some((prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`))) {
    return 'quote';
  }
  if (normalized === '/publications' || normalized.startsWith('/publications/')) {
    return 'publications';
  }
  return 'default';
}

export function trimDescription(text: string, max = DESCRIPTION_MAX): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) {
    return normalized;
  }
  const cut = normalized.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = lastSpace > max * 0.55 ? cut.slice(0, lastSpace) : cut;
  return `${trimmed.trim()}…`;
}

export function trimTitle(text: string, max = TITLE_MAX): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) {
    return normalized;
  }
  const cut = normalized.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 20 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function applyCatalogFirstDescription(description: string, path: string): string {
  if (hasCatalogSignal(description) || shouldSkipCatalogMeta(path)) {
    return trimDescription(description);
  }

  switch (getCatalogMetaVariant(path)) {
    case 'catalogHub':
      return trimDescription(
        `Browse ${CATALOG_MODEL_COUNT} study ready mouse and rat models. ${description} Request a quote when the library does not list your allele.`,
      );
    case 'quote':
      return trimDescription(
        `Search ${CATALOG_MODEL_COUNT} catalog models first. ${description}`,
      );
    case 'publications':
      return trimDescription(
        `Most programs start in the catalog. ${description} Request a generated line when your study outgrows off the shelf.`,
      );
    default:
      return trimDescription(
        `Browse ${CATALOG_MODEL_COUNT} catalog models for a faster start, or request a generated line. ${description}`,
      );
  }
}

export function enhanceTitleForCatalogFirst(title: string, path: string): string {
  if (hasCatalogSignal(title) || shouldSkipCatalogMeta(path)) {
    return title;
  }

  const variant = getCatalogMetaVariant(path);

  if (variant === 'catalogHub') {
    if (!/14,?774/i.test(title)) {
      return trimTitle(title.replace(/\bCatalog\b/i, `${CATALOG_MODEL_COUNT} Catalog`));
    }
    return title;
  }

  if (variant === 'quote') {
    return trimTitle(`${title.replace(/^Generated /, '')} | Catalog Search + Quote`);
  }

  const cleaned = title.replace(/^Generated /, '');

  if (cleaned.includes('|')) {
    const parts = cleaned.split('|').map((part) => part.trim());
    const lastPart = parts[parts.length - 1] ?? '';
    const isBrandSuffix = /^(ITL|ingenious targeting laboratory)$/i.test(lastPart);

    if (isBrandSuffix && parts.length === 2 && !hasCatalogSignal(parts[0] ?? '')) {
      return trimTitle(`${parts[0]} | Catalog + Generation | ${lastPart}`);
    }

    if (!parts.some((part) => /catalog/i.test(part))) {
      parts[1] = 'Catalog + Generation';
      return trimTitle(parts.slice(0, 2).join(' | '));
    }
    return title;
  }

  return trimTitle(`${cleaned} | Catalog + Generation`);
}

export function applyCatalogFirstMeta(
  title: string,
  description: string,
  path: string,
  catalogFirst = true,
): { title: string; description: string } {
  if (!catalogFirst) {
    return { title, description: trimDescription(description) };
  }

  return {
    title: enhanceTitleForCatalogFirst(title, path),
    description: applyCatalogFirstDescription(description, path),
  };
}

/**
 * Homepage and root layout defaults (Google SERP title + description).
 * Lead with “model generation” (JAX/Taconic scientist language) instead of “generated,”
 * then catalog / study ready so both business paths are clear in the snippet.
 */
export const ROOT_CATALOG_FIRST_META = {
  title: 'Mouse Model Generation & Catalog | 14,774+ Lines',
  description:
    `Generate knockout, knockin, and humanized mouse models, or browse ${CATALOG_MODEL_COUNT} study ready catalog strains. U.S. PhD oversight and germline guarantee since 1998.`,
  ogLine1: 'Mouse Model Generation & Catalog',
  ogLine2: 'Generate Models | Study Ready Catalog',
  ogLine3: '2,800+ Projects | 800+ Publications',
} as const;
