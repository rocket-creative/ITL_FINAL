import { describe, expect, it } from 'vitest';
import {
  buildCatalogProductOffer,
  buildReadyToShipProperty,
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

  it('prefers model abbreviation in catalog order offer URL', () => {
    const offer = buildCatalogProductOffer({
      geneName: 'Tp53',
      modelAbbrev: 'Tp53-KO',
      modelType: 'Knockout',
      availability: 'Live',
      catalogNumber: 'HU 123456',
    });
    expect(offer.url).toContain('model=Tp53-KO');
    expect(offer.url).toContain('catalog=HU%20123456');
    expect(offer.url).not.toContain('gene=');
  });

  it('records READY TO SHIP and the stock state', () => {
    expect(buildReadyToShipProperty('Live')).toEqual({
      '@type': 'PropertyValue',
      name: 'READY TO SHIP',
      value: 'LIVE',
    });
    expect(buildReadyToShipProperty('Sperm cryopreservation').value).toBe('SPERM');
    expect(buildReadyToShipProperty('F0 live').value).toBe('IN PRODUCTION');
    expect(buildReadyToShipProperty('').value).toBe('Inquire');
  });

  it('emits numeric price on service Offer', () => {
    const offer = buildServiceOffer('https://www.genetargeting.com/request-quote/', 'Humanized');
    expect(offer.price).toBe('22298');
    expect(offer.priceCurrency).toBe('USD');
  });
});
