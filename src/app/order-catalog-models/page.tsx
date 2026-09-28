/**
 * Order Inquiry - Catalog Models Page
 * Request form for ordering from the ingenious targeting laboratory catalog of mouse models
 * Server Component: passes searchParams into client form prefill
 *
 * Prefill URL params:
 *   model   — Model Abbreviation (preferred)
 *   gene    — legacy fallback when model is absent
 *   catalog — ingenious targeting laboratory Catalog Number
 */

import OrderCatalogFormClient from './OrderCatalogFormClient';

export default async function OrderInquiryCatalogModelsPage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string; catalog?: string; gene?: string }>;
}) {
  const { model, catalog, gene } = await searchParams;
  return (
    <OrderCatalogFormClient
      initialModel={model ?? gene}
      initialCatalog={catalog}
    />
  );
}
