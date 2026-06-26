/**
 * Product JSON-LD helpers — tier-based AggregateOffer pricing for GSC compliance.
 */

import type { ServerCatalogModel } from '@/lib/catalog/serverCatalog';
import { BASE_URL } from './types';

const SITE_NAME = 'ingenious targeting laboratory';
const DEFAULT_LOW_PRICE = 17297;

/** Starting prices from pricing guide (USD, no formatting). */
const TIER_LOW_PRICE: Record<string, number> = {
  Knockout: 17297,
  'KO/CKO mice': 17297,
  Knockin: 21299,
  'point mutantion mice': 21299,
  'point mutation mice': 21299,
  Humanized: 22298,
  'Target humanized mice': 22298,
  'Conditional Knockout': 22298,
  'Cre/Dre Toolbox of Mice': 22298,
  'over expression mice': 21299,
  'fluorescent mouse': 21299,
  'random transgenic mice': 21299,
  'Immunodeficient mice': 22298,
  'disease model mice': 22298,
  other: 17297,
  'regular mice': 17297,
};

function normalizeModelType(modelType: string): string {
  return modelType.trim().toLowerCase();
}

export function getTierLowPrice(modelType: string | undefined | null): number {
  if (!modelType) return DEFAULT_LOW_PRICE;
  const direct = TIER_LOW_PRICE[modelType.trim()];
  if (direct) return direct;

  const lower = normalizeModelType(modelType);
  if (lower.includes('conditional') || lower.includes('cko')) return 22298;
  if (lower.includes('humanized') || lower.includes('human')) return 22298;
  if (
    lower.includes('point') ||
    lower.includes('knockin') ||
    lower.includes('knock-in') ||
    lower.includes('reporter') ||
    lower.includes('fluorescent') ||
    lower.includes('transgenic') ||
    lower.includes('over expression')
  ) {
    return 21299;
  }
  if (lower.includes('knockout') || lower.includes('ko')) return 17297;

  return DEFAULT_LOW_PRICE;
}

function priceValidUntil(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

export function isCatalogInStock(availability: string | undefined | null): boolean {
  return (availability || '').toLowerCase().includes('live');
}

export type ProductOfferOptions = {
  geneName?: string;
  catalogNumber?: string;
  orderUrl?: string;
};

export function buildCatalogProductOffer(
  model: Pick<ServerCatalogModel, 'modelType' | 'availability' | 'catalogNumber' | 'geneName'>,
  options: ProductOfferOptions = {},
) {
  const geneName = options.geneName ?? model.geneName;
  const catalogNumber = options.catalogNumber ?? model.catalogNumber;
  const lowPrice = getTierLowPrice(model.modelType);
  const inStock = isCatalogInStock(model.availability);

  return {
    '@type': 'AggregateOffer' as const,
    priceCurrency: 'USD',
    lowPrice: String(lowPrice),
    highPrice: String(lowPrice),
    offerCount: 1,
    availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
    url:
      options.orderUrl ??
      `${BASE_URL}/order-catalog-models/?gene=${encodeURIComponent(geneName)}&catalog=${encodeURIComponent(catalogNumber)}`,
    priceValidUntil: priceValidUntil(),
    seller: {
      '@type': 'Organization' as const,
      '@id': `${BASE_URL}/#organization`,
      name: SITE_NAME,
      url: BASE_URL,
    },
  };
}

export function buildFeaturedProductOffer(orderUrl: string, modelTypeLabel = 'Humanized') {
  const lowPrice = getTierLowPrice(modelTypeLabel);
  return {
    '@type': 'AggregateOffer' as const,
    priceCurrency: 'USD',
    lowPrice: String(lowPrice),
    highPrice: String(lowPrice),
    offerCount: 1,
    availability: 'https://schema.org/InStock',
    url: orderUrl,
    priceValidUntil: priceValidUntil(),
    seller: {
      '@type': 'Organization' as const,
      '@id': `${BASE_URL}/#organization`,
      name: SITE_NAME,
      url: BASE_URL,
    },
  };
}

export function buildServiceOffer(url: string, modelTypeLabel = 'Custom mouse model') {
  const lowPrice = getTierLowPrice(modelTypeLabel);
  return {
    '@type': 'Offer' as const,
    url,
    priceCurrency: 'USD',
    price: String(lowPrice),
    availability: 'https://schema.org/InStock',
    priceValidUntil: priceValidUntil(),
    seller: {
      '@type': 'Organization' as const,
      '@id': `${BASE_URL}/#organization`,
      name: SITE_NAME,
      url: BASE_URL,
    },
  };
}

export function buildCatalogProductSchema(
  model: ServerCatalogModel,
  extra: {
    name?: string;
    description?: string;
    additionalProperty?: Array<{ '@type': 'PropertyValue'; name: string; value: string }>;
  } = {},
) {
  const geneName = model.geneName;
  return {
    '@type': 'Product' as const,
    name: extra.name ?? (model.modelAbbrev || `${geneName} ${model.modelType || ''} Mouse Model`.trim()),
    description:
      extra.description ??
      `${model.modelType || 'Genetically engineered'} mouse model for ${geneName}. ${model.category ? `Category: ${model.category}.` : ''}`,
    sku: model.catalogNumber,
    mpn: model.catalogNumber,
    brand: { '@type': 'Brand' as const, name: SITE_NAME },
    category: model.category || 'Genetically engineered mouse model',
    ...(extra.additionalProperty?.length ? { additionalProperty: extra.additionalProperty } : {}),
    offers: buildCatalogProductOffer(model),
  };
}
