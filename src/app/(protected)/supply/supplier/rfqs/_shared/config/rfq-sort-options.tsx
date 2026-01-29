import type { SortOption } from "@/components/layouts/data-collection-layout";

/**
 * 🔽 SUPPLIER RFQ SORT OPTIONS
 * Tedarikçi için sıralama seçenekleri
 */
export const SUPPLIER_RFQ_SORT_OPTIONS: SortOption[] = [
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
];

export const createSupplierRFQSortOptions = (): SortOption[] =>
  SUPPLIER_RFQ_SORT_OPTIONS;
