import type { PopoverFilterConfig } from "@/components/layouts/data-collection-layout";

/**
 * 🔍 ORGANIZER POPOVER FILTERS
 * Etkinlik düzenleyeni popover filter konfigürasyonları
 */
export const ORGANIZER_POPOVER_FILTERS: PopoverFilterConfig[] = [
  {
    id: "type",
    fieldName: "type",
    label: "Tür",
    activeColor: "#3b82f6",
    activeBackground: "rgba(59, 130, 246, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "UNIVERSITY", label: "Üniversite", icon: "ph-graduation-cap" },
      {
        value: "EDUCATION_COMPANY",
        label: "Eğitim Şirketi",
        icon: "ph-buildings",
      },
      { value: "ASSOCIATION", label: "Dernek", icon: "ph-users-three" },
      { value: "GOVERNMENT", label: "Devlet Kurumu", icon: "ph-bank" },
      {
        value: "INDIVIDUAL_TRAINER",
        label: "Bireysel Eğitmen",
        icon: "ph-person",
      },
      { value: "PLATFORM", label: "Platform", icon: "ph-monitor" },
      { value: "OTHER", label: "Diğer", icon: "ph-dots-three" },
    ],
    defaultValue: "ALL",
  },
  {
    id: "isActive",
    fieldName: "isActive",
    label: "Durum",
    activeColor: "#10b981",
    activeBackground: "rgba(16, 185, 129, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "true", label: "Aktif", icon: "ph-check-circle" },
      { value: "false", label: "Pasif", icon: "ph-x-circle" },
    ],
    defaultValue: "ALL",
  },
  {
    id: "isVerified",
    fieldName: "isVerified",
    label: "Doğrulama",
    activeColor: "#8b5cf6",
    activeBackground: "rgba(139, 92, 246, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "true", label: "Doğrulanmış", icon: "ph-seal-check" },
      { value: "false", label: "Doğrulanmamış", icon: "ph-seal" },
    ],
    defaultValue: "ALL",
  },
];

// Backward compatibility için function export et
export const createOrganizerPopoverFilters = (): PopoverFilterConfig[] =>
  ORGANIZER_POPOVER_FILTERS;
