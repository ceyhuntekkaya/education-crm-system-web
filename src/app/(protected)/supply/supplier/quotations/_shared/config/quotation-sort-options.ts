import type { SortOption } from "@/components/layouts/data-collection-layout";

/**
 * 📊 QUOTATION SORT OPTIONS
 * Teklif sıralama seçenekleri
 */
export const QUOTATION_SORT_OPTIONS: SortOption[] = [
  {
    label: "Seçiniz",
    value: "none",
    icon: "ph-dots-three-outline",
  },
  {
    label: "Oluşturulma Tarihi",
    value: "createdAt",
    icon: "ph-clock",
  },
  {
    label: "Toplam Tutar",
    value: "totalAmount",
    icon: "ph-currency-dollar",
  },
  {
    label: "Geçerlilik Tarihi",
    value: "validUntil",
    icon: "ph-calendar",
  },
  {
    label: "Değerlendirme",
    value: "averageRating",
    icon: "ph-star",
  },
  {
    label: "Teslimat Süresi",
    value: "deliveryDays",
    icon: "ph-truck",
  },
];
