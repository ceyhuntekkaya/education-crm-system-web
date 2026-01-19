import type { SortOption } from "@/components/layouts/data-collection-layout";

/**
 * 🔽 RFQ ITEM SORT OPTIONS
 * Sıralama seçenekleri
 */
export const ITEM_SORT_OPTIONS: SortOption[] = [
  { value: "none", label: "Seçiniz", icon: "ph-dots-three-outline" },
  { value: "itemName", label: "Kalem Adı", icon: "ph-package" },
  { value: "quantity", label: "Miktar", icon: "ph-number-square-one" },
  { value: "categoryName", label: "Kategori", icon: "ph-tag" },
];

// Backward compatibility için function export et
export const createItemSortOptions = (): SortOption[] => ITEM_SORT_OPTIONS;
