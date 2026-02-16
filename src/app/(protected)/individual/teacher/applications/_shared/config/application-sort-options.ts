import type { SortOption } from "@/components/layouts/data-collection-layout";

/**
 * ================================================================================
 * APPLICATION SORT OPTIONS
 * ================================================================================
 * Başvuru listesi için sıralama seçenekleri
 */

export const APPLICATION_SORT_OPTIONS: SortOption[] = [
  {
    label: "Seçiniz",
    value: "none",
    icon: "ph-dots-three-outline",
  },
  {
    label: "En Yeni",
    value: "createdAt_desc",
    icon: "ph-calendar-plus",
  },
  {
    label: "En Eski",
    value: "createdAt_asc",
    icon: "ph-calendar-minus",
  },
  {
    label: "Son Güncelleme (Yeni)",
    value: "updatedAt_desc",
    icon: "ph-clock-clockwise",
  },
  {
    label: "Son Güncelleme (Eski)",
    value: "updatedAt_asc",
    icon: "ph-clock-counter-clockwise",
  },
  {
    label: "Pozisyon A-Z",
    value: "positionTitle_asc",
    icon: "ph-sort-ascending",
  },
  {
    label: "Pozisyon Z-A",
    value: "positionTitle_desc",
    icon: "ph-sort-descending",
  },
];
