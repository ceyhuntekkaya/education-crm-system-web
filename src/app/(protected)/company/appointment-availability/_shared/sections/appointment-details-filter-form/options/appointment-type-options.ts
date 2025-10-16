import { AppointmentType } from "@/enums/AppointmentType";
import { AppointmentTypeOption } from "../types";

// Appointment type options with Turkish labels
export const appointmentTypeOptions: AppointmentTypeOption[] = [
  { value: AppointmentType.INFORMATION_MEETING, label: "Bilgi Toplantısı" },
  { value: AppointmentType.SCHOOL_TOUR, label: "Okul Gezisi" },
  { value: AppointmentType.ENROLLMENT_INTERVIEW, label: "Kayıt Görüşmesi" },
  { value: AppointmentType.PARENT_MEETING, label: "Veli Görüşmesi" },
  { value: AppointmentType.CONSULTATION, label: "Danışmanlık" },
  { value: AppointmentType.ASSESSMENT, label: "Değerlendirme" },
  { value: AppointmentType.ORIENTATION, label: "Oryantasyon" },
  { value: AppointmentType.ONLINE_MEETING, label: "Online Görüşme" },
  { value: AppointmentType.PHONE_CALL, label: "Telefon Görüşmesi" },
  { value: AppointmentType.GROUP_MEETING, label: "Grup Toplantısı" },
  { value: AppointmentType.OTHER, label: "Diğer" },
];

// Helper function for appointment type label
export const getTypeLabel = (type: AppointmentType): string => {
  const typeLabels: Record<AppointmentType, string> = {
    [AppointmentType.INFORMATION_MEETING]: "Bilgi Toplantısı",
    [AppointmentType.SCHOOL_TOUR]: "Okul Gezisi",
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
  return typeLabels[type] || type;
};
