import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * İlanlarım sayfası için aksiyon butonları oluşturur
 */
export const createJobPostingActionButtons = (router: AppRouterInstance) => [
  {
    label: "Yeni İlan Oluştur",
    onClick: () => router.push("/individual/company/job-postings/add-edit/new"),
    icon: "ph-plus",
    variant: "primary" as const,
  },
];

/**
 * Empty state için aksiyon butonu oluşturur
 */
export const createJobPostingEmptyStateAction = (
  router: AppRouterInstance,
) => ({
  label: "İlk İlanı Oluştur",
  onClick: () => router.push("/individual/company/job-postings/add-edit/new"),
  icon: "ph-plus",
  variant: "primary" as const,
});
