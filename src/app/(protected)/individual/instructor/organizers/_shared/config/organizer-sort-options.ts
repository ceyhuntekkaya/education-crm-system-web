import { SortOption } from "@/components/layouts/data-collection-layout";

export const ORGANIZER_SORT_OPTIONS: SortOption[] = [
  {
    label: "Seçiniz",
    value: "none",
    icon: "ph-dots-three-outline",
  },
  {
    label: "En Yeni",
    value: "createdAt_desc",
    icon: "ph-clock",
  },
  {
    label: "En Eski",
    value: "createdAt_asc",
    icon: "ph-clock",
  },
  {
    label: "İsim (A → Z)",
    value: "name_asc",
    icon: "ph-sort-ascending",
  },
  {
    label: "İsim (Z → A)",
    value: "name_desc",
    icon: "ph-sort-descending",
  },
  {
    label: "Etkinlik Sayısı (Çok → Az)",
    value: "eventCount_desc",
    icon: "ph-calendar",
  },
  {
    label: "Etkinlik Sayısı (Az → Çok)",
    value: "eventCount_asc",
    icon: "ph-calendar",
  },
];
