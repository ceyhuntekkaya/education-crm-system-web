import type { PopoverFilterConfig } from "@/components/layouts/data-collection-layout";

/**
 * 🔍 QUOTATION POPOVER FILTERS
 * Popover filter konfigürasyonları
 */
export const QUOTATION_POPOVER_FILTERS: PopoverFilterConfig[] = [
  {
    id: "status",
    fieldName: "status", // QuotationDto.status field'ı
    label: "Durum",
    activeColor: "#3b82f6",
    activeBackground: "rgba(59, 130, 246, 0.1)",
    options: [
      { value: "ALL", label: "Tüm Durumlar", icon: "ph-stack" },
      { value: "DRAFT", label: "Taslak", icon: "ph-file-dashed" },
      { value: "SUBMITTED", label: "Gönderildi", icon: "ph-paper-plane-tilt" },
      { value: "UNDER_REVIEW", label: "İnceleniyor", icon: "ph-eye" },
      { value: "ACCEPTED", label: "Kabul Edildi", icon: "ph-check-circle" },
      { value: "REJECTED", label: "Reddedildi", icon: "ph-x-circle" },
      { value: "EXPIRED", label: "Süresi Doldu", icon: "ph-clock" },
    ],
    defaultValue: "ALL",
  },
  {
    id: "currency",
    fieldName: "currency", // QuotationDto.currency field'ı
    label: "Para Birimi",
    activeColor: "#10b981",
    activeBackground: "rgba(16, 185, 129, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "TRY", label: "TRY (₺)", icon: "ph-currency-circle-dollar" },
      { value: "USD", label: "USD ($)", icon: "ph-currency-dollar" },
      { value: "EUR", label: "EUR (€)", icon: "ph-currency-eur" },
      { value: "GBP", label: "GBP (£)", icon: "ph-currency-gbp" },
    ],
    defaultValue: "ALL",
  },
];

// Backward compatibility için function export et
export const createQuotationPopoverFilters = (): PopoverFilterConfig[] =>
  QUOTATION_POPOVER_FILTERS;
