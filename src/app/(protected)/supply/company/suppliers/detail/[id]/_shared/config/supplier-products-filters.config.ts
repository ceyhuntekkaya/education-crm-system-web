/**
 * Tedarikçi ürünleri için filtre seçenekleri
 */
export const SUPPLIER_PRODUCTS_POPOVER_FILTERS = [
  {
    id: "status",
    label: "Durum",
    options: [
      { value: "", label: "Tüm Durumlar" },
      { value: "ACTIVE", label: "Aktif" },
      { value: "PASSIVE", label: "Pasif" },
      { value: "OUT_OF_STOCK", label: "Stokta Yok" },
      { value: "DISCONTINUED", label: "Üretimi Durdu" },
    ],
  },
  {
    id: "stockStatus",
    label: "Stok Durumu",
    options: [
      { value: "", label: "Tüm Stoklar" },
      { value: "IN_STOCK", label: "Stokta Var" },
      { value: "LOW_STOCK", label: "Az Stok" },
      { value: "OUT_OF_STOCK", label: "Stokta Yok" },
    ],
  },
  {
    id: "priceRange",
    label: "Fiyat Aralığı",
    options: [
      { value: "", label: "Tüm Fiyatlar" },
      { value: "0-100", label: "0-100 TL" },
      { value: "100-500", label: "100-500 TL" },
      { value: "500-1000", label: "500-1000 TL" },
      { value: "1000+", label: "1000+ TL" },
    ],
  },
];

/**
 * Tedarikçi ürünleri için sıralama seçenekleri
 */
export const SUPPLIER_PRODUCTS_SORT_OPTIONS = [
  { value: "name_asc", label: "Ürün Adı (A-Z)" },
  { value: "name_desc", label: "Ürün Adı (Z-A)" },
  { value: "basePrice_asc", label: "Fiyat (Düşük-Yüksek)" },
  { value: "basePrice_desc", label: "Fiyat (Yüksek-Düşük)" },
  { value: "stockQuantity_asc", label: "Stok (Az-Çok)" },
  { value: "stockQuantity_desc", label: "Stok (Çok-Az)" },
];

/**
 * Tedarikçi ürünleri için aksiyon butonları
 */
export const createSupplierProductsActionButtons = () => [
  {
    label: "Yeni Ürün Ekle",
    icon: "bi-plus-lg",
    variant: "primary" as const,
    action: () => {
      console.log("Navigate to add product");
      // router.push('/supply/products/create');
    },
  },
  {
    label: "Ürünleri İçe Aktar",
    icon: "bi-upload",
    variant: "outline-secondary" as const,
    action: () => {
      console.log("Import products");
    },
  },
];

/**
 * Tedarikçi ürünleri için empty state aksiyon
 */
export const createSupplierProductsEmptyStateAction = () => ({
  label: "İlk Ürünü Ekle",
  icon: "bi-plus-lg",
  action: () => {
    console.log("Navigate to add first product");
    // router.push('/supply/products/create');
  },
});
