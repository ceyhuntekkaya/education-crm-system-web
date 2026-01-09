import type { PopoverFilterConfig } from "@/components/layouts/list-view";

/**
 * 🔍 RFQ POPOVER FILTERS
 * Popover filter konfigürasyonları
 */
export const RFQ_POPOVER_FILTERS: PopoverFilterConfig[] = [
  {
    id: "status",
    fieldName: "status", // RFQDto.status field'ı
    label: "Durum",
    activeColor: "#3b82f6",
    activeBackground: "rgba(59, 130, 246, 0.1)",
    options: [
      { value: "ALL", label: "Tüm Durumlar", icon: "ph-stack" },
      { value: "DRAFT", label: "Taslak", icon: "ph-note-pencil" },
      {
        value: "PUBLISHED",
        label: "Yayınlandı",
        icon: "ph-paper-plane-tilt",
      },
      { value: "CLOSED", label: "Kapandı", icon: "ph-lock" },
    ],
    defaultValue: "ALL",
  },
  {
    id: "rfqType",
    fieldName: "rfqType", // RFQDto.rfqType field'ı
    label: "Tip",
    activeColor: "#8b5cf6",
    activeBackground: "rgba(139, 92, 246, 0.1)",
    options: [
      { value: "ALL", label: "Tüm Tipler", icon: "ph-stack" },
      { value: "OPEN", label: "Açık İhale", icon: "ph-globe" },
      { value: "INVITED", label: "Davetli İhale", icon: "ph-users-three" },
    ],
    defaultValue: "ALL",
  },
];

// Backward compatibility için function export et
export const createRFQPopoverFilters = (): PopoverFilterConfig[] =>
  RFQ_POPOVER_FILTERS;
