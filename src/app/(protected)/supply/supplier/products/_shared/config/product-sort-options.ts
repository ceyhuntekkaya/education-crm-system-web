import type { SortOption } from "@/components/layouts/data-collection-layout";

/**
 * 📊 PRODUCT SORT OPTIONS
 * Ürün sıralama seçenekleri
 */
export const PRODUCT_SORT_OPTIONS: SortOption[] = [
  {
    label: "Seçiniz",
    value: "none",
    icon: "ph-dots-three-outline",
  },
  {
    label: "En Yeni",
    value: "createdAt-desc",
    icon: "ph-clock-clockwise",
  },
  {
    label: "En Eski",
    value: "createdAt-asc",
    icon: "ph-clock-countdown",
  },
  {
    label: "Ürün Adı (A-Z)",
    value: "name-asc",
    icon: "ph-sort-ascending",
  },
  {
    label: "Ürün Adı (Z-A)",
    value: "name-desc",
    icon: "ph-sort-descending",
  },
  {
    label: "Fiyat (Düşükten Yükseğe)",
    value: "basePrice-asc",
    icon: "ph-arrow-up",
  },
  {
    label: "Fiyat (Yüksekten Düşüğe)",
    value: "basePrice-desc",
    icon: "ph-arrow-down",
  },
  {
    label: "Stok (Azdan Çoğa)",
    value: "stockQuantity-asc",
    icon: "ph-arrow-up",
  },
  {
    label: "Stok (Çoktan Aza)",
    value: "stockQuantity-desc",
    icon: "ph-arrow-down",
  },
];

// Backward compatibility için function export et
export const createProductSortOptions = (): SortOption[] => PRODUCT_SORT_OPTIONS;
