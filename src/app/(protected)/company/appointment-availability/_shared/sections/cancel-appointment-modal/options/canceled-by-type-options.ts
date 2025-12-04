import { CancelledByType } from "@/enums";

export interface CanceledByTypeOption {
  value: CancelledByType;
  label: string;
  description?: string;
}

export const canceledByTypeOptions: CanceledByTypeOption[] = [
  {
    value: CancelledByType.SCHOOL,
    label: "Kurum",
    description: "Randevu Kurum tarafından iptal edildi",
  },
  {
    value: CancelledByType.PARENT,
    label: "Veli",
    description: "Randevu veli tarafından iptal edildi",
  },
  {
    value: CancelledByType.SYSTEM,
    label: "Sistem",
    description: "Randevu sistem tarafından otomatik iptal edildi",
  },
];

// Helper function to get label by value
export const getCanceledByTypeLabel = (
  value: CancelledByType | undefined
): string => {
  if (!value) return "-";
  const option = canceledByTypeOptions.find((opt) => opt.value === value);
  return option?.label || "-";
};
