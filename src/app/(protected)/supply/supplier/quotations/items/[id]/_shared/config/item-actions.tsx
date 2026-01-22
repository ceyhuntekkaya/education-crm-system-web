import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Quotation Item sayfası için action button konfigürasyonu
 */
export const createItemActionButtons = (
  router: AppRouterInstance,
  quotationId: number,
) => [
  {
    label: "Geri",
    icon: "ph-arrow-left",
    onClick: () =>
      router.push(`/supply/supplier/quotations/detail/${quotationId}`),
    variant: "secondary" as const,
  },
  {
    label: "Yeni Kalem Ekle",
    icon: "ph-plus-circle",
    onClick: () =>
      router.push(
        `/supply/supplier/quotations/items/${quotationId}/add-edit/new`,
      ),
    variant: "primary" as const,
  },
];

/**
 * Quotation Item sayfası için empty state action konfigürasyonu
 */
export const createItemEmptyStateAction = (
  router: AppRouterInstance,
  quotationId: number,
) => ({
  label: "İlk Kalemi Ekle",
  onClick: () =>
    router.push(
      `/supply/supplier/quotations/items/${quotationId}/add-edit/new`,
    ),
});
