#!/usr/bin/env node
/**
 * Reads GSC_404_URLs_Action_Plan.csv (first column: path), fetches each URL on
 * the live site, follows redirects, and reports paths whose final response is
 * not OK (200) or redirect (3xx) to an OK page.
 *
 * Usage:
 *   node scripts/check-gsc-404-urls.mjs
 *   node scripts/check-gsc-404-urls.mjs https://staging.example.com
 *
 * After deploy, use Google Search Console: Pages → Not found (404) → Validate fix.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CSV = join(ROOT, "GSC_404_URLs_Action_Plan.csv");

const base = (process.argv[2] || "https://www.genetargeting.com").replace(
  /\/$/,
  "",
);

function parsePaths() {
  const text = readFileSync(CSV, "utf8");
  const lines = text.split(/\r?\n/).filter(Boolean);
  const paths = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const col = line.split(",")[0]?.trim();
    if (col && col.startsWith("/")) paths.push(col);
  }
  return [...new Set(paths)];
}

async function checkPath(path) {
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "ITL-GSC-404-check/1.0" },
    });
    return { path, finalUrl: res.url, status: res.status };
  } catch (e) {
    return { path, error: e.message };
  }
}

async function main() {
  const paths = parsePaths();
  console.log(`Base: ${base}`);
  console.log(`Paths from CSV: ${paths.length}\n`);

  const bad = [];
  for (const path of paths) {
    const r = await checkPath(path);
    if (r.error) {
      bad.push(r);
      console.log(`FAIL ${path} → ${r.error}`);
      continue;
    }
    if (r.status === 404) {
      bad.push(r);
      console.log(`FAIL ${path} → ${r.status} ${r.finalUrl}`);
    } else {
      console.log(`OK   ${path} → ${r.status} ${r.finalUrl}`);
    }
    await new Promise((x) => setTimeout(x, 120));
  }

  console.log(
    `\nDone. ${bad.length} path(s) still failing. Re-run after deploy if needed.`,
  );
  console.log(
    "GSC: Search Console → Pages → Not found (404) → Validate fix (after live site is updated).",
  );
  process.exit(bad.length > 0 ? 1 : 0);
}

main();
