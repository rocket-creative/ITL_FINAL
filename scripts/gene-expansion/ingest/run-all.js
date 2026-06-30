#!/usr/bin/env node
/**
 * Run all gene biology ingest jobs in sequence.
 */

const { spawnSync } = require('child_process');
const path = require('path');

const JOBS = [
  'ingest-impc-viability.js',
  'ingest-expression.js',
  'ingest-orthologs.js',
  'ingest-clinvar-omim.js',
  'ingest-existing-alleles.js',
  'ingest-catalog-normalize.js',
];

for (const job of JOBS) {
  console.log(`\n=== ${job} ===`);
  const res = spawnSync('node', [path.join(__dirname, job)], { stdio: 'inherit' });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

console.log('\nAll ingest jobs complete.');
