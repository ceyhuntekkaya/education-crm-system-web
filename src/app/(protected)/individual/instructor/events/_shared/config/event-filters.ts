import type { PopoverFilterConfig } from "@/components/layouts/data-collection-layout";

/**
 * 🔍 EVENT POPOVER FILTERS
 * Etkinlik popover filter konfigürasyonları
 */
export const EVENT_POPOVER_FILTERS: PopoverFilterConfig[] = [
  {
    id: "eventType",
    fieldName: "eventType",
    label: "Etkinlik Türü",
    activeColor: "#3b82f6",
    activeBackground: "rgba(59, 130, 246, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "WEBINAR", label: "Webinar", icon: "ph-video-camera" },
      { value: "SEMINAR", label: "Seminer", icon: "ph-presentation-chart" },
      { value: "TRAINING", label: "Eğitim", icon: "ph-books" },
      { value: "WORKSHOP", label: "Atölye", icon: "ph-wrench" },
    ],
    defaultValue: "ALL",
  },
  {
    id: "status",
    fieldName: "status",
    label: "Durum",
    activeColor: "#10b981",
    activeBackground: "rgba(16, 185, 129, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "DRAFT", label: "Taslak", icon: "ph-pencil" },
      { value: "PUBLISHED", label: "Yayında", icon: "ph-check-circle" },
      { value: "COMPLETED", label: "Tamamlandı", icon: "ph-flag" },
      { value: "CANCELLED", label: "İptal", icon: "ph-x-circle" },
    ],
    defaultValue: "ALL",
  },
  {
    id: "deliveryFormat",
    fieldName: "deliveryFormat",
    label: "Format",
    activeColor: "#8b5cf6",
    activeBackground: "rgba(139, 92, 246, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "ONLINE", label: "Online", icon: "ph-monitor" },
      { value: "IN_PERSON", label: "Yüz Yüze", icon: "ph-map-pin" },
      { value: "HYBRID", label: "Hibrit", icon: "ph-intersect" },
    ],
    defaultValue: "ALL",
  },
];

export const createEventPopoverFilters = (): PopoverFilterConfig[] =>
  EVENT_POPOVER_FILTERS;
