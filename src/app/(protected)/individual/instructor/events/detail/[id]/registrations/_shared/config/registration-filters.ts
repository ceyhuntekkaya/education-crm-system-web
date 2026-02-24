import type { PopoverFilterConfig } from "@/components/layouts/data-collection-layout";

export const REGISTRATION_POPOVER_FILTERS: PopoverFilterConfig[] = [
  {
    id: "status",
    fieldName: "status",
    label: "Kayıt Durumu",
    activeColor: "#10b981",
    activeBackground: "rgba(16, 185, 129, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "PENDING", label: "Onay Bekliyor", icon: "ph-clock" },
      { value: "APPROVED", label: "Onaylandı", icon: "ph-check-circle" },
      { value: "REJECTED", label: "Reddedildi", icon: "ph-x-circle" },
      { value: "CANCELLED", label: "İptal Edildi", icon: "ph-prohibit" },
    ],
    defaultValue: "ALL",
  },
  {
    id: "attended",
    fieldName: "attended",
    label: "Katılım",
    activeColor: "#6366f1",
    activeBackground: "rgba(99, 102, 241, 0.1)",
    options: [
      { value: "ALL", label: "Tümü", icon: "ph-stack" },
      { value: "true", label: "Katıldı", icon: "ph-check-circle" },
      { value: "false", label: "Katılmadı", icon: "ph-x-circle" },
    ],
    defaultValue: "ALL",
  },
];
