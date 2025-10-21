import { AppointmentOutcome } from "@/enums/AppointmentOutcome";
import { OutcomeOption } from "../types";

// Outcome options with Turkish labels
export const outcomeOptions: OutcomeOption[] = [
  { value: AppointmentOutcome.ENROLLED, label: "Kayıt Oldu" },
  { value: AppointmentOutcome.INTERESTED, label: "İlgili" },
  { value: AppointmentOutcome.NOT_INTERESTED, label: "İlgili Değil" },
  {
    value: AppointmentOutcome.NEEDS_MORE_INFO,
    label: "Daha Fazla Bilgi Gerekiyor",
  },
  { value: AppointmentOutcome.PRICE_CONCERN, label: "Fiyat Endişesi" },
  { value: AppointmentOutcome.TIMING_ISSUE, label: "Zamanlama Sorunu" },
  {
    value: AppointmentOutcome.CONSIDERING_OPTIONS,
    label: "Seçenekleri Değerlendiriyor",
  },
  { value: AppointmentOutcome.WILL_CALL_BACK, label: "Geri Arayacak" },
  { value: AppointmentOutcome.OTHER, label: "Diğer" },
];

// Helper function for outcome label
export const getOutcomeLabel = (outcome: AppointmentOutcome): string => {
  const outcomeLabels: Record<AppointmentOutcome, string> = {
    [AppointmentOutcome.ENROLLED]: "Kayıt Oldu",
    [AppointmentOutcome.INTERESTED]: "İlgili",
    [AppointmentOutcome.NOT_INTERESTED]: "İlgili Değil",
    [AppointmentOutcome.NEEDS_MORE_INFO]: "Daha Fazla Bilgi Gerekiyor",
    [AppointmentOutcome.PRICE_CONCERN]: "Fiyat Endişesi",
    [AppointmentOutcome.TIMING_ISSUE]: "Zamanlama Sorunu",
    [AppointmentOutcome.CONSIDERING_OPTIONS]: "Seçenekleri Değerlendiriyor",
    [AppointmentOutcome.WILL_CALL_BACK]: "Geri Arayacak",
    [AppointmentOutcome.OTHER]: "Diğer",
  };
  return outcomeLabels[outcome] || outcome;
};
