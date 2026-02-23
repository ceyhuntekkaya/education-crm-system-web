import { SortOption } from "@/components/layouts/data-collection-layout";

export const EVENT_SORT_OPTIONS: SortOption[] = [
  {
    label: "Seçiniz",
    value: "none",
    icon: "ph-dots-three-outline",
  },
  {
    label: "Başlangıç Tarihi (Yakın → Uzak)",
    value: "startDateTime_asc",
    icon: "ph-clock",
  },
  {
    label: "Başlangıç Tarihi (Uzak → Yakın)",
    value: "startDateTime_desc",
    icon: "ph-clock",
  },
  {
    label: "En Yeni",
    value: "createdAt_desc",
    icon: "ph-calendar-plus",
  },
  {
    label: "En Eski",
    value: "createdAt_asc",
    icon: "ph-calendar-minus",
  },
  {
    label: "Başlık (A → Z)",
    value: "title_asc",
    icon: "ph-sort-ascending",
  },
  {
    label: "Başlık (Z → A)",
    value: "title_desc",
    icon: "ph-sort-descending",
  },
  {
    label: "Kayıt Sayısı (Çok → Az)",
    value: "registrationCount_desc",
    icon: "ph-users",
  },
];
