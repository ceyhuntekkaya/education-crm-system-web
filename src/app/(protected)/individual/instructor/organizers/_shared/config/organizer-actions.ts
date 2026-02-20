import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Etkinlik Düzenleyenleri sayfası için aksiyon butonları oluşturur
 */
export const createOrganizerActionButtons = (router: AppRouterInstance) => [
  {
    label: "Yeni Organizatör Ekle",
    onClick: () =>
      router.push("/individual/instructor/organizers/add-edit/new"),
    icon: "ph-plus",
    variant: "primary" as const,
  },
];

/**
 * Empty state için aksiyon butonu oluşturur
 */
export const createOrganizerEmptyStateAction = (router: AppRouterInstance) => ({
  label: "İlk Organizatörü Ekle",
  onClick: () => router.push("/individual/instructor/organizers/add-edit/new"),
  icon: "ph-plus",
  variant: "primary" as const,
});
