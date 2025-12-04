/**
 * Get the Turkish display name for appointment type
 * @param type - Appointment type enum value
 * @returns Turkish display name for the appointment type
 */
export const getAppointmentTypeDisplay = (type?: string): string => {
  switch (type) {
    case "INFORMATION_MEETING":
      return "Bilgi Toplantısı";
    case "SCHOOL_TOUR":
      return "Kurum Gezisi";
    case "ENROLLMENT_INTERVIEW":
      return "Kayıt Görüşmesi";
    case "PARENT_MEETING":
      return "Veli Görüşmesi";
    case "CONSULTATION":
      return "Danışmanlık";
    case "ASSESSMENT":
      return "Değerlendirme";
    case "ORIENTATION":
      return "Oryantasyon";
    case "ONLINE_MEETING":
      return "Online Görüşme";
    case "PHONE_CALL":
      return "Telefon Görüşmesi";
    case "GROUP_MEETING":
      return "Grup Toplantısı";
    case "OTHER":
      return "Diğer";
    default:
      return type || "-";
  }
};
