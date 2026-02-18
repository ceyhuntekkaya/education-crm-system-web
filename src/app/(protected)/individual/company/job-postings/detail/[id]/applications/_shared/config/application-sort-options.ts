import type { SortOption } from "@/components/layouts/data-collection-layout";

/**
 * ================================================================================
 * APPLICATION SORT OPTIONS
 * ================================================================================
 */

export const APPLICATION_SORT_OPTIONS: SortOption[] = [
  {
    label: "En Yeni Başvuru",
    value: "createdAt_desc",
  },
  {
    label: "En Eski Başvuru",
    value: "createdAt_asc",
  },
  {
    label: "Aday Adı (A-Z)",
    value: "teacherName_asc",
  },
  {
    label: "Aday Adı (Z-A)",
    value: "teacherName_desc",
  },
];
