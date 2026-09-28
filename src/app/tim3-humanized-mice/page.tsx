import PageClient from './PageClient';
import { MarketingCatalogTable, MarketingReadyToShip } from '@/components/catalog/MarketingCatalogParts';

const PREFIXES = ['hTIM3', 'hHAVCR2'];

export default function Page() {
  return (
    <PageClient
      heroExtra={<MarketingReadyToShip prefixes={PREFIXES} />}
      catalogTable={<MarketingCatalogTable prefixes={PREFIXES} />}
    />
  );
}