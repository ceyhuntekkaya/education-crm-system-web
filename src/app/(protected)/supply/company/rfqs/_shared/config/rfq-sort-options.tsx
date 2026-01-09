import type { SortOption } from "@/components/layouts/list-view";

/**
 * 🔽 RFQ SORT OPTIONS
 * Sıralama seçenekleri
 */
export const RFQ_SORT_OPTIONS: SortOption[] = [
  { value: "none", label: "Seçiniz", icon: "ph-dots-three-outline" },
  {
    value: "createdAt",
    label: "Oluşturma Tarihi",
    icon: "ph-calendar-blank",
  },
  {
    value: "submissionDeadline",
    label: "Son Başvuru Tarihi",
    icon: "ph-clock",
  },
  {
    value: "expectedDeliveryDate",
    label: "Beklenen Teslimat Tarihi",
    icon: "ph-truck",
  },
  { value: "itemCount", label: "Kalem Sayısı", icon: "ph-package" },
  { value: "quotationCount", label: "Teklif Sayısı", icon: "ph-file-text" },
];

// Backward compatibility için function export et
export const createRFQSortOptions = (): SortOption[] => RFQ_SORT_OPTIONS;
