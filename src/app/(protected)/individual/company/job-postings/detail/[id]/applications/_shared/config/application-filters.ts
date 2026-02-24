import type { FilterOption } from "@/components/layouts/data-collection-layout";

/**
 * ================================================================================
 * APPLICATION FILTERS
 * ================================================================================
 */

export const APPLICATION_POPOVER_FILTERS: FilterOption[] = [
  {
    id: "status",
    label: "Durum",
    type: "multiSelect",
    options: [
      { value: "RECEIVED", label: "Alındı" },
      { value: "UNDER_REVIEW", label: "İnceleniyor" },
      { value: "INTERVIEW_SCHEDULED", label: "Mülakat Planlandı" },
      { value: "OFFER_MADE", label: "Teklif Yapıldı" },
      { value: "ACCEPTED", label: "Kabul Edildi" },
      { value: "REJECTED", label: "Reddedildi" },
    ],
  },
  {
    id: "hasDocument",
    label: "Belge Durumu",
    type: "multiSelect",
    options: [
      { value: "true", label: "Belge Var" },
      { value: "false", label: "Belge Yok" },
    ],
  },
];
