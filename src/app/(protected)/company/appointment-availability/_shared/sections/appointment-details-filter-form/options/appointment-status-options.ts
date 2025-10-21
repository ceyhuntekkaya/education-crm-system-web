import { AppointmentStatus } from "@/enums/AppointmentStatus";
import { StatusOption } from "../types";

// Status options with Turkish labels
export const statusOptions: StatusOption[] = [
  { value: AppointmentStatus.PENDING, label: "Beklemede" },
  { value: AppointmentStatus.CONFIRMED, label: "Onaylandı" },
  { value: AppointmentStatus.APPROVED, label: "Onaylandı" },
  { value: AppointmentStatus.REJECTED, label: "Reddedildi" },
  { value: AppointmentStatus.CANCELLED, label: "İptal Edildi" },
  { value: AppointmentStatus.COMPLETED, label: "Tamamlandı" },
  { value: AppointmentStatus.NO_SHOW, label: "Gelmedi" },
  { value: AppointmentStatus.RESCHEDULED, label: "Ertelendi" },
  { value: AppointmentStatus.IN_PROGRESS, label: "Devam Ediyor" },
];

// Helper function for status label
export const getStatusLabel = (status: AppointmentStatus): string => {
  const statusLabels: Record<AppointmentStatus, string> = {
    [AppointmentStatus.PENDING]: "Beklemede",
    [AppointmentStatus.CONFIRMED]: "Onaylandı",
    [AppointmentStatus.APPROVED]: "Onaylandı",
    [AppointmentStatus.REJECTED]: "Reddedildi",
    [AppointmentStatus.CANCELLED]: "İptal Edildi",
    [AppointmentStatus.COMPLETED]: "Tamamlandı",
    [AppointmentStatus.NO_SHOW]: "Gelmedi",
    [AppointmentStatus.RESCHEDULED]: "Ertelendi",
    [AppointmentStatus.IN_PROGRESS]: "Devam Ediyor",
  };
  return statusLabels[status] || status;
};
