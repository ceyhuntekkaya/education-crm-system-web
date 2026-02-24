import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ActionButton } from "@/components/layouts/data-collection-layout";

/**
 * ================================================================================
 * APPLICATION ACTIONS
 * ================================================================================
 * Başvuru sayfası için aksiyon butonları
 */

/**
 * Header action buttons
 */
export const createApplicationActionButtons = (
  router: AppRouterInstance,
): ActionButton[] => [
  {
    label: "İş İlanlarını Gör",
    icon: "ph-briefcase",
    variant: "primary",
    onClick: () => router.push("/individual/teacher/job-postings"),
  },
];

/**
 * Empty state action button
 */
export const createApplicationEmptyStateAction = (
  router: AppRouterInstance,
): ActionButton => ({
  label: "İş İlanlarını İncele",
  icon: "ph-briefcase",
  variant: "primary",
  onClick: () => router.push("/individual/teacher/job-postings"),
});

/**
 * Row action buttons (DataGrid row actions)
 */
export const createApplicationRowActions = (
  router: AppRouterInstance,
  onWithdraw?: (id: number) => void,
) => [
  {
    label: "Detay",
    icon: "ph-eye",
    onClick: (row: any) =>
      router.push(`/individual/teacher/applications/detail/${row.id}`),
  },
  {
    label: "Geri Çek",
    icon: "ph-arrow-u-up-left",
    onClick: (row: any) => onWithdraw?.(row.id),
    variant: "danger" as const,
    // Sadece geri çekilebilir başvurularda göster
    show: (row: any) =>
      !row.isWithdrawn &&
      ["RECEIVED", "UNDER_REVIEW", "INTERVIEW_SCHEDULED"].includes(row.status),
  },
];
