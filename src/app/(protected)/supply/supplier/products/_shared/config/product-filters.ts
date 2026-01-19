import type { PopoverFilterConfig } from "@/components/layouts/data-collection-layout";

/**
 * 🔍 PRODUCT POPOVER FILTERS
 * Popover filter konfigürasyonları
 */
export const PRODUCT_POPOVER_FILTERS: PopoverFilterConfig[] = [
  {
    id: "status",
    fieldName: "status", // ProductDto.status field'ı
    label: "Durum",
    activeColor: "#3b82f6",
    activeBackground: "rgba(59, 130, 246, 0.1)",
    options: [
      { value: "ALL", label: "Tüm Durumlar", icon: "ph-stack" },
      { value: "ACTIVE", label: "Aktif", icon: "ph-check-circle" },
      { value: "PASSIVE", label: "Pasif", icon: "ph-pause-circle" },
      { value: "OUT_OF_STOCK", label: "Stokta Yok", icon: "ph-x-circle" },
      {
        value: "DISCONTINUED",
        label: "Üretim Durduruldu",
        icon: "ph-stop-circle",
      },
    ],
    defaultValue: "ALL",
  },
  {
    id: "stockTrackingType",
    fieldName: "stockTrackingType", // ProductDto.stockTrackingType field'ı
    label: "Stok Takibi",
    activeColor: "#8b5cf6",
    activeBackground: "rgba(139, 92, 246, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "UNLIMITED", label: "Sınırsız", icon: "ph-infinity" },
      { value: "LIMITED", label: "Sınırlı", icon: "ph-package" },
    ],
    defaultValue: "ALL",
  },
];

// Backward compatibility için function export et
export const createProductPopoverFilters = (): PopoverFilterConfig[] =>
  PRODUCT_POPOVER_FILTERS;
