import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Tedarikçi RFQ sayfası için action button konfigürasyonu
 */
export const createSupplierRFQActionButtons = (router: AppRouterInstance) => [
  //   {
  //     label: "Teklif Oluştur",
  //     icon: "ph-plus-circle",
  //     onClick: () => router.push("/supply/supplier/quotations/add-edit/new"),
  //     variant: "primary" as const,
  //   },
];

/**
 * Tedarikçi RFQ sayfası için empty state action konfigürasyonu
 */
export const createSupplierRFQEmptyStateAction = (
  router: AppRouterInstance,
) => ({
  label: "Tekliflerime Git",
  onClick: () => router.push("/supply/supplier/quotations"),
});
