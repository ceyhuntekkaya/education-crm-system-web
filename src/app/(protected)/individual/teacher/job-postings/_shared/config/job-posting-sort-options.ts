import { SortOption } from "@/components/layouts/data-collection-layout";

export const JOB_POSTING_SORT_OPTIONS: SortOption[] = [
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
    label: "Son Başvuru Tarihi (Yakın → Uzak)",
    value: "applicationDeadline_asc",
    icon: "ph-calendar",
  },
  {
    label: "Son Başvuru Tarihi (Uzak → Yakın)",
    value: "applicationDeadline_desc",
    icon: "ph-calendar",
  },
];
