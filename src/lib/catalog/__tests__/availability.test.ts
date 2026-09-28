import { describe, expect, it } from 'vitest';
import { stockFormsFor, stockFormsFromAvailability } from '../availability';

describe('stockFormsFromAvailability', () => {
  it('maps established live to LIVE', () => {
    expect(stockFormsFromAvailability('Live')).toEqual(['LIVE']);
    expect(stockFormsFromAvailability('Repository live')).toEqual(['LIVE']);
  });

  it('maps founder live to IN PRODUCTION, not LIVE', () => {
    expect(stockFormsFromAvailability('F0 live')).toEqual(['IN PRODUCTION']);
    expect(stockFormsFromAvailability('F1 live')).toEqual(['IN PRODUCTION']);
  });

  it('maps sperm to SPERM only, including sperm cryo', () => {
    expect(stockFormsFromAvailability('Sperm')).toEqual(['SPERM']);
    expect(stockFormsFromAvailability('sperm cryopreservation')).toEqual(['SPERM']);
  });

  it('maps embryo cryo to EMBRYO only', () => {
    expect(stockFormsFromAvailability('Embryo')).toEqual(['EMBRYO']);
    expect(stockFormsFromAvailability('embryo cryopreservation')).toEqual(['EMBRYO']);
    expect(stockFormsFromAvailability('F0 embryo cryopreservation')).toEqual(['EMBRYO']);
    expect(stockFormsFromAvailability('Cryopreserved')).toEqual(['EMBRYO']);
  });

  it('maps developing to DEVELOPING', () => {
    expect(stockFormsFromAvailability('Developing')).toEqual(['DEVELOPING']);
  });

  it('keeps an unrecognized status in caps', () => {
    expect(stockFormsFromAvailability('On hold')).toEqual(['ON HOLD']);
  });
});

describe('stockFormsFor', () => {
  it('dedupes a mixed gene into display order', () => {
    expect(
      stockFormsFor([
        'Developing',
        'Sperm',
        'F1 live',
        'Live',
        'F0 embryo cryopreservation',
        'Live',
      ]),
    ).toEqual(['LIVE', 'SPERM', 'EMBRYO', 'DEVELOPING', 'IN PRODUCTION']);
  });

  it('returns nothing for blank availability', () => {
    expect(stockFormsFor(['', null, undefined])).toEqual([]);
  });
});
