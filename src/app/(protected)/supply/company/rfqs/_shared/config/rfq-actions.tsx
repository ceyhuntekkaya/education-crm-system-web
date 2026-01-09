import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * RFQ sayfası için action button konfigürasyonu
 */
export const createRFQActionButtons = (router: AppRouterInstance) => [
  {
    label: "Yeni İlan Ekle",
    icon: "ph-plus-circle",
    onClick: () => router.push("/supply/company/rfqs/add-edit/new"),
    variant: "primary" as const,
  },
];

/**
 * RFQ sayfası için empty state action konfigürasyonu
 */
export const createRFQEmptyStateAction = (router: AppRouterInstance) => ({
  label: "İlk İlanı Oluştur",
  onClick: () => router.push("/supply/company/rfqs/add-edit/new"),
});
