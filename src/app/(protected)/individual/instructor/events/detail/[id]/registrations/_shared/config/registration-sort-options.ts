import { SortOption } from "@/components/layouts/data-collection-layout";

export const REGISTRATION_SORT_OPTIONS: SortOption[] = [
  { label: "Seçiniz", value: "none", icon: "ph-dots-three-outline" },
  {
    label: "Kayıt Tarihi (Yeni → Eski)",
    value: "createdAt_desc",
    icon: "ph-calendar-plus",
  },
  {
    label: "Kayıt Tarihi (Eski → Yeni)",
    value: "createdAt_asc",
    icon: "ph-calendar-minus",
  },
  {
    label: "Öğretmen Adı (A → Z)",
    value: "teacherName_asc",
    icon: "ph-sort-ascending",
  },
  {
    label: "Öğretmen Adı (Z → A)",
    value: "teacherName_desc",
    icon: "ph-sort-descending",
  },
];
