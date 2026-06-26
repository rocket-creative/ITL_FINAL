import { describe, expect, it } from 'vitest';
import {
  buildCatalogProductOffer,
  buildServiceOffer,
  getTierLowPrice,
} from '../productSchema';

describe('productSchema', () => {
  it('maps knockout model types to tier starting price', () => {
    expect(getTierLowPrice('Knockout')).toBe(17297);
    expect(getTierLowPrice('Conditional Knockout')).toBe(22298);
    expect(getTierLowPrice('point mutantion mice')).toBe(21299);
  });

  it('emits numeric lowPrice on catalog AggregateOffer', () => {
    const offer = buildCatalogProductOffer({
      geneName: 'Tp53',
      modelType: 'Knockout',
      availability: 'Live',
      catalogNumber: 'HU 123456',
    });
    expect(offer.lowPrice).toBe('17297');
    expect(offer.priceCurrency).toBe('USD');
  });

  it('emits numeric price on service Offer', () => {
    const offer = buildServiceOffer('https://www.genetargeting.com/request-quote/', 'Humanized');
    expect(offer.price).toBe('22298');
    expect(offer.priceCurrency).toBe('USD');
  });
});
