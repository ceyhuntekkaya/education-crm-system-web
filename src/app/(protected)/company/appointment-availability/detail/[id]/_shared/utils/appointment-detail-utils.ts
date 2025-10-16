import { StatusTranslation } from "../types/config-types";

/**
 * Appointment status çevirisi
 */
export const translateAppointmentStatus = (
  status?: string
): StatusTranslation => {
  switch (status) {
    case "PENDING":
      return { text: "Beklemede", badgeClass: "badge-warning" };
    case "CONFIRMED":
      return { text: "Onaylandı", badgeClass: "badge-success" };
    case "APPROVED":
      return { text: "Onaylandı", badgeClass: "badge-success" };
    case "REJECTED":
      return { text: "Reddedildi", badgeClass: "badge-danger" };
    case "CANCELLED":
      return { text: "İptal Edildi", badgeClass: "badge-danger" };
    case "COMPLETED":
      return { text: "Tamamlandı", badgeClass: "badge-success" };
    case "NO_SHOW":
      return { text: "Gelmedi", badgeClass: "badge-warning" };
    case "RESCHEDULED":
      return { text: "Ertelendi", badgeClass: "badge-info" };
    case "IN_PROGRESS":
      return { text: "Devam Ediyor", badgeClass: "badge-primary" };
    default:
      return { text: "Belirtilmemiş", badgeClass: "badge-secondary" };
  }
};

/**
 * Appointment type çevirisi
 */
export const translateAppointmentType = (type?: string): string => {
  switch (type) {
    case "INFORMATION_MEETING":
      return "Bilgi Toplantısı";
    case "SCHOOL_TOUR":
      return "Okul Turu";
    case "ENROLLMENT_INTERVIEW":
      return "Kayıt Görüşmesi";
    case "PARENT_MEETING":
      return "Veli Toplantısı";
    case "CONSULTATION":
      return "Danışmanlık";
    case "ASSESSMENT":
      return "Değerlendirme";
    case "ORIENTATION":
      return "Oryantasyon";
    case "ONLINE_MEETING":
      return "Online Toplantı";
    case "PHONE_CALL":
      return "Telefon Görüşmesi";
    case "GROUP_MEETING":
      return "Grup Toplantısı";
    case "OTHER":
      return "Diğer";
    default:
      return "Belirtilmemiş";
  }
};

/**
 * Appointment outcome çevirisi
 */
export const translateAppointmentOutcome = (outcome?: string): string => {
  switch (outcome) {
    case "ENROLLED":
      return "Kayıt Yaptı";
    case "INTERESTED":
      return "İlgileniyor";
    case "NOT_INTERESTED":
      return "İlgilenmiyor";
    case "NEEDS_MORE_INFO":
      return "Daha Fazla Bilgi Gerekli";
    case "PRICE_CONCERN":
      return "Fiyat Sorunu";
    case "TIMING_ISSUE":
      return "Zamanlama Sorunu";
    case "CONSIDERING_OPTIONS":
      return "Seçenekleri Değerlendiriyor";
    case "WILL_CALL_BACK":
      return "Geri Arayacak";
    case "OTHER":
      return "Diğer";
    default:
      return "Belirtilmemiş";
  }
};

/**
 * CancelledByType çevirisi
 */
export const translateCancelledByType = (type?: string): string => {
  switch (type) {
    case "PARENT":
      return "Veli Tarafından";
    case "SCHOOL":
      return "Okul Tarafından";
    case "SYSTEM":
      return "Sistem Tarafından";
    default:
      return "Belirtilmemiş";
  }
};

/**
 * Tarih ve saat formatı
 */
export const formatDateTime = (dateString?: string): string => {
  if (!dateString) return "Belirtilmemiş";

  try {
    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Geçersiz tarih";
  }
};

/**
 * Boolean değer formatı
 */
export const formatBoolean = (value?: boolean): string => {
  if (value === undefined || value === null) return "Belirtilmemiş";
  return value ? "Evet" : "Hayır";
};

/**
 * Katılımcı türü çevirisi
 */
export const translateParticipantType = (type?: string): string => {
  switch (type) {
    case "STUDENT":
      return "Öğrenci";
    case "PARENT":
      return "Veli";
    case "STAFF":
      return "Personel";
    case "TEACHER":
      return "Öğretmen";
    case "ADMIN":
      return "Yönetici";
    case "COUNSELOR":
      return "Danışman";
    case "COORDINATOR":
      return "Koordinatör";
    case "OTHER":
      return "Diğer";
    default:
      return "Belirtilmemiş";
  }
};

/**
 * Katılım durumu çevirisi
 */
export const translateAttendanceStatus = (status?: string): string => {
  switch (status) {
    case "ATTENDED":
      return "Katıldı";
    case "NOT_ATTENDED":
      return "Katılmadı";
    case "PARTIALLY_ATTENDED":
      return "Kısmen Katıldı";
    case "LATE":
      return "Geç Geldi";
    case "LEFT_EARLY":
      return "Erken Ayrıldı";
    case "PENDING":
      return "Beklemede";
    case "CANCELLED":
      return "İptal Edildi";
    default:
      return "Belirtilmemiş";
  }
};
