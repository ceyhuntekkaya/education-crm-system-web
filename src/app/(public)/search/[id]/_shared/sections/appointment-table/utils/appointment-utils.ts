import { AppointmentStatus } from "@/enums/AppointmentStatus";
import { AppointmentType } from "@/enums/AppointmentType";

// Status badge renkleri
export const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case AppointmentStatus.CONFIRMED:
      return "badge bg-success";
    case AppointmentStatus.PENDING:
      return "badge bg-warning";
    case AppointmentStatus.CANCELLED:
      return "badge bg-danger";
    case AppointmentStatus.COMPLETED:
      return "badge bg-primary";
    case AppointmentStatus.NO_SHOW:
      return "badge bg-secondary";
    case AppointmentStatus.IN_PROGRESS:
      return "badge bg-info";
    case AppointmentStatus.RESCHEDULED:
      return "badge bg-warning";
    default:
      return "badge bg-light text-dark";
  }
};

// Status Türkçe çevirileri
export const getStatusText = (status: string): string => {
  switch (status) {
    case AppointmentStatus.CONFIRMED:
      return "Onaylandı";
    case AppointmentStatus.PENDING:
      return "Beklemede";
    case AppointmentStatus.CANCELLED:
      return "İptal Edildi";
    case AppointmentStatus.COMPLETED:
      return "Tamamlandı";
    case AppointmentStatus.NO_SHOW:
      return "Gelmedi";
    case AppointmentStatus.IN_PROGRESS:
      return "Devam Ediyor";
    case AppointmentStatus.RESCHEDULED:
      return "Ertelendi";
    default:
      return status;
  }
};

// Appointment Type Türkçe çevirileri
export const getAppointmentTypeText = (type: string): string => {
  switch (type) {
    case AppointmentType.INFORMATION_MEETING:
      return "Bilgi Toplantısı";
    case AppointmentType.SCHOOL_TOUR:
      return "Okul Gezisi";
    case AppointmentType.ENROLLMENT_INTERVIEW:
      return "Kayıt Görüşmesi";
    case AppointmentType.PARENT_MEETING:
      return "Veli Görüşmesi";
    case AppointmentType.CONSULTATION:
      return "Danışmanlık";
    case AppointmentType.ASSESSMENT:
      return "Değerlendirme";
    case AppointmentType.ORIENTATION:
      return "Oryantasyon";
    case AppointmentType.ONLINE_MEETING:
      return "Online Görüşme";
    case AppointmentType.PHONE_CALL:
      return "Telefon Görüşmesi";
    case AppointmentType.GROUP_MEETING:
      return "Grup Toplantısı";
    default:
      return type || "Genel";
  }
};

// Tarih formatlama
export const formatDate = (dateString?: string): string => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Saat formatlama
export const formatTime = (timeString?: string): string => {
  if (!timeString) return "-";
  return timeString.substring(0, 5); // HH:MM formatında
};
