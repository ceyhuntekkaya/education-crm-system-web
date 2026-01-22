import type { SortOption } from "@/components/layouts/data-collection-layout";

/**
 * 🔽 QUOTATION ITEM SORT OPTIONS
 * Sıralama seçenekleri
 */
export const ITEM_SORT_OPTIONS: SortOption[] = [
  { value: "none", label: "Seçiniz", icon: "ph-dots-three-outline" },
  { value: "itemName", label: "Kalem Adı", icon: "ph-package" },
  { value: "unitPrice", label: "Birim Fiyat", icon: "ph-currency-dollar" },
  { value: "totalPrice", label: "Toplam Fiyat", icon: "ph-money" },
  { value: "quantity", label: "Miktar", icon: "ph-number-square-one" },
];

// Backward compatibility için function export et
export const createItemSortOptions = (): SortOption[] => ITEM_SORT_OPTIONS;
