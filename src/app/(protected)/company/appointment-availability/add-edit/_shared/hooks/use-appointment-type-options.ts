import { useMemo } from "react";
import { AppointmentType } from "@/enums";

interface AppointmentTypeOption {
  label: string;
  value: string;
}

/**
 * Randevu tipi seçeneklerini döndüren hook
 */
export const useAppointmentTypeOptions = (): AppointmentTypeOption[] => {
  return useMemo(
    () =>
      Object.entries(AppointmentType).map(([key, value]) => ({
        label: getAppointmentTypeLabel(value),
        value: value,
      })),
    []
  );
};

/**
 * Appointment type için label döndürür
 */
function getAppointmentTypeLabel(type: AppointmentType): string {
  const labels: Record<AppointmentType, string> = {
    [AppointmentType.INFORMATION_MEETING]: "Bilgi Toplantısı",
    [AppointmentType.SCHOOL_TOUR]: "Kurum Gezisi",
    [AppointmentType.ENROLLMENT_INTERVIEW]: "Kayıt Görüşmesi",
    [AppointmentType.PARENT_MEETING]: "Veli Görüşmesi",
    [AppointmentType.CONSULTATION]: "Danışmanlık",
    [AppointmentType.ASSESSMENT]: "Değerlendirme",
    [AppointmentType.ORIENTATION]: "Oryantasyon",
    [AppointmentType.ONLINE_MEETING]: "Online Görüşme",
    [AppointmentType.PHONE_CALL]: "Telefon Görüşmesi",
    [AppointmentType.GROUP_MEETING]: "Grup Toplantısı",
    [AppointmentType.OTHER]: "Diğer",
  };

  return labels[type] || type;
}
