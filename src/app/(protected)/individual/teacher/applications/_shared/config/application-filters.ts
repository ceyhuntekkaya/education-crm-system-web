import type { PopoverFilterConfig } from "@/components/layouts/data-collection-layout";

/**
 * ================================================================================
 * APPLICATION FILTERS
 * ================================================================================
 * Başvuru listesi için popover filtreleri
 */

export const APPLICATION_POPOVER_FILTERS: PopoverFilterConfig[] = [
  {
    id: "status",
    fieldName: "status",
    label: "Durum",
    activeColor: "#3b82f6",
    activeBackground: "rgba(59, 130, 246, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "RECEIVED", label: "Alındı", icon: "ph-check-circle" },
      { value: "UNDER_REVIEW", label: "İnceleniyor", icon: "ph-eye" },
      {
        value: "INTERVIEW_SCHEDULED",
        label: "Mülakat Planlandı",
        icon: "ph-calendar-check",
      },
      { value: "OFFER_MADE", label: "Teklif Yapıldı", icon: "ph-handshake" },
      { value: "ACCEPTED", label: "Kabul Edildi", icon: "ph-check-square" },
      { value: "REJECTED", label: "Reddedildi", icon: "ph-x-circle" },
    ],
    defaultValue: "ALL",
  },
  {
    id: "isWithdrawn",
    fieldName: "isWithdrawn",
    label: "Geri Çekme Durumu",
    activeColor: "#6b7280",
    activeBackground: "rgba(107, 114, 128, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "false", label: "Aktif Başvurular", icon: "ph-check" },
      { value: "true", label: "Geri Çekilenler", icon: "ph-arrow-u-up-left" },
    ],
    defaultValue: "ALL",
  },
];
