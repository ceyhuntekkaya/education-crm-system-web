import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * RFQ Item sayfası için action button konfigürasyonu
 */
export const createItemActionButtons = (
  router: AppRouterInstance,
  rfqId: number
) => [
  {
    label: "Yeni Kalem Ekle",
    icon: "ph-plus-circle",
    onClick: () =>
      router.push(`/supply/company/rfqs/items/${rfqId}/add-edit/new`),
    variant: "primary" as const,
  },
];

/**
 * RFQ Item sayfası için empty state action konfigürasyonu
 */
export const createItemEmptyStateAction = (
  router: AppRouterInstance,
  rfqId: number
) => ({
  label: "İlk Kalemi Ekle",
  onClick: () =>
    router.push(`/supply/company/rfqs/items/${rfqId}/add-edit/new`),
});
