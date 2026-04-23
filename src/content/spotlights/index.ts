import { yamamoto2025 } from './yamamoto-2025';
import { feske2025 } from './feske-2025';
import { billadeau2025 } from './billadeau-2025';
import type { Spotlight, ModelType } from './_schema';

export const spotlights: Spotlight[] = [yamamoto2025, feske2025, billadeau2025];

export function getSpotlightBySlug(slug: string): Spotlight | undefined {
  return spotlights.find((s) => s.slug === slug);
}

export function getPublishedSpotlights(): Spotlight[] {
  return spotlights
    .filter((s) => s.status === 'published')
    .sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
    );
}

export function getSpotlightsByModelType(modelType: ModelType, limit = 3): Spotlight[] {
  return getPublishedSpotlights()
    .filter((s) => s.modelType === modelType)
    .slice(0, limit);
}

export type { Spotlight, ModelType } from './_schema';
