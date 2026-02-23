import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Etkinlikler sayfası için aksiyon butonları oluşturur
 */
export const createEventActionButtons = (router: AppRouterInstance) => [
  {
    label: "Yeni Etkinlik Ekle",
    onClick: () => router.push("/individual/instructor/events/add-edit/new"),
    icon: "ph-plus",
    variant: "primary" as const,
  },
];

/**
 * Empty state için aksiyon butonu oluşturur
 */
export const createEventEmptyStateAction = (router: AppRouterInstance) => ({
  label: "İlk Etkinliği Ekle",
  onClick: () => router.push("/individual/instructor/events/add-edit/new"),
  icon: "ph-plus",
  variant: "primary" as const,
});
