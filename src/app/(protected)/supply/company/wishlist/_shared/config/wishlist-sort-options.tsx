import type { SortOption } from "@/components/layouts/data-collection-layout";

/**
 * 🔽 WISHLIST SORT OPTIONS
 * Wishlist için sıralama seçenekleri
 */
export const WISHLIST_SORT_OPTIONS: SortOption[] = [
  { value: "none", label: "Seçiniz", icon: "ph-dots-three-outline" },
  {
    value: "createdAt",
    label: "Favoriye Eklenme Tarihi",
    icon: "ph-calendar-blank",
  },
  {
    value: "name",
    label: "Ürün Adı",
    icon: "ph-text-aa",
  },
  {
    value: "supplierName",
    label: "Tedarikçi Adı",
    icon: "ph-buildings",
  },
  {
    value: "sku",
    label: "SKU",
    icon: "ph-barcode",
  },
];

// Backward compatibility için function export et
export const createWishlistSortOptions = (): SortOption[] =>
  WISHLIST_SORT_OPTIONS;
