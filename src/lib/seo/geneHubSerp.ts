/**
 * SERP title/description helpers for priority gene hubs.
 */

import { PI_TAXONOMY_GROUPS } from '@/data/priorityGenes';

const TITLE_MAX = 60;
const DESC_MIN = 150;
const DESC_MAX = 160;
const TRUST_CHIP = 'Since 1998, 100% germline';

function trimToMax(text: string, max: number): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  const cut = normalized.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = lastSpace > max * 0.55 ? cut.slice(0, lastSpace) : cut;
  return `${trimmed.trim()}…`;
}

function padDescription(text: string): string {
  let out = text.replace(/\s+/g, ' ').trim();
  if (out.length > DESC_MAX) return trimToMax(out, DESC_MAX);
  if (out.length >= DESC_MIN) return out;

  // Only append complete phrases that fit, never mid-sentence cuts.
  const fillers = [
    ' U.S. QC included.',
    ' Quote in 24 hours.',
    ' Browse catalog or generate.',
    ' Peer reviewed since 1998.',
  ];
  for (const f of fillers) {
    if (out.length >= DESC_MIN) break;
    if (out.length + f.length <= DESC_MAX) out += f;
  }

  if (out.length < DESC_MIN) {
    out = trimToMax(`${out} Contact ingenious targeting laboratory for allele design.`, DESC_MAX);
  }
  return out.length > DESC_MAX ? trimToMax(out, DESC_MAX) : out;
}

/**
 * Build a SERP title ≤60 characters for a priority gene hub.
 */
export function buildPriorityGeneTitle(
  mouse: string,
  human: string,
  catalogCount: number,
): string {
  // Brand is applied by the root layout title template only.
  const candidates =
    catalogCount > 0
      ? [
          `${mouse} (${human}) mouse models`,
          `${mouse} knockout & knockin mice`,
          `${mouse} mouse models`,
          `${mouse} models`,
        ]
      : [
          `${mouse} (${human}) model generation`,
          `${mouse} mouse model generation`,
          `${mouse} mouse models`,
          `${mouse} models`,
        ];

  for (const c of candidates) {
    if (c.length <= TITLE_MAX) return c;
  }
  return trimToMax(`${mouse} mouse models`, TITLE_MAX);
}

/**
 * Build a SERP description 150 to 160 characters mentioning KO/KI/humanized, trust, and CTA.
 */
export function buildPriorityGeneDescription(
  mouse: string,
  human: string,
  catalogCount: number,
  modLabels: string[],
): string {
  const mods =
    modLabels.length > 0
      ? modLabels.slice(0, 3).join(', ')
      : 'knockout, knockin, humanized';

  const lead =
    catalogCount > 0
      ? `${catalogCount} ${mouse} (${human}) catalog mouse model${catalogCount === 1 ? '' : 's'} including ${mods}.`
      : `Generate ${mouse} (${human}) knockout, knockin, and humanized mouse models.`;

  const body = `${lead} ${TRUST_CHIP}. Request a quote or order catalog lines.`;
  return padDescription(body);
}

/**
 * Flattened PI taxonomy labels for schema.org alternateName coverage.
 */
export function buildGeneHubAlternateNames(): string[] {
  const seen = new Set<string>();
  const names: string[] = [];
  for (const group of PI_TAXONOMY_GROUPS) {
    for (const child of group.children) {
      const label = child.label.trim();
      if (!label || seen.has(label)) continue;
      seen.add(label);
      names.push(label);
    }
  }
  return names;
}
