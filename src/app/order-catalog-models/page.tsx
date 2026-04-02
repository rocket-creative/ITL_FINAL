/**
 * Order Inquiry - Catalog Models Page
 * Request form for ordering from the ITL catalog of mouse models
 * Server Component: passes searchParams.model to client form
 */

import OrderCatalogFormClient from './OrderCatalogFormClient';

export default async function OrderInquiryCatalogModelsPage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string; catalog?: string }>;
}) {
  const { model, catalog } = await searchParams;
  return <OrderCatalogFormClient initialModel={model} initialCatalog={catalog} />;
}
