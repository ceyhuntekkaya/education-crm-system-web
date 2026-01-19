import { SearchProductsStatus } from "@/types/dto/supply/product.dto";

/**
 * Ürün filtreleri - Örnek data'ya göre sadece gerekli filtreler
 */
export const PRODUCT_POPOVER_FILTERS = [
  {
    id: "status",
    label: "Durum",
    options: [
      { value: "ALL", label: "Tüm Durumlar" },
      { value: "ACTIVE", label: "Aktif" },
      { value: "INACTIVE", label: "Pasif" },
      { value: "OUT_OF_STOCK", label: "Stokta Yok" },
      { value: "DISCONTINUED", label: "Üretimi Durdu" },
    ],
    defaultValue: "ALL",
  },
  {
    id: "stockTrackingType",
    label: "Stok Takip Tipi",
    options: [
      { value: "ALL", label: "Tüm Takip Tipleri" },
      { value: "LIMITED", label: "Sınırlı" },
      { value: "UNLIMITED", label: "Sınırsız" },
    ],
    defaultValue: "ALL",
  },
];

/**
 * Ürün sıralama seçenekleri
 */
export const PRODUCT_SORT_OPTIONS = [
  { value: "none", label: "Sıralama Yok" },
  { value: "name", label: "İsim" },
  { value: "basePrice", label: "Fiyat" },
  { value: "createdAt", label: "Tarih" },
];
