/**
 * AppointmentType enum değerlerini Türkçe'ye çeviren utility
 */
export const getAppointmentTypeLabel = (type: string): string => {
  const typeMap: Record<string, string> = {
    INFORMATION_MEETING: "Bilgi Toplantısı",
    SCHOOL_TOUR: "Okul Gezisi",
    ENROLLMENT_INTERVIEW: "Kayıt Görüşmesi",
    PARENT_MEETING: "Veli Görüşmesi",
    CONSULTATION: "Danışmanlık",
    ASSESSMENT: "Değerlendirme",
    ORIENTATION: "Oryantasyon",
    ONLINE_MEETING: "Online Görüşme",
    PHONE_CALL: "Telefon Görüşmesi",
    GROUP_MEETING: "Grup Toplantısı",
    OTHER: "Diğer",
  };
  return typeMap[type] || type;
};

/**
 * AppointmentStatus enum değerlerini Türkçe'ye çeviren utility
 */
export const getAppointmentStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    PENDING: "Beklemede",
    CONFIRMED: "Onaylandı",
    APPROVED: "Onaylandı",
    REJECTED: "Reddedildi",
    CANCELLED: "İptal Edildi",
    COMPLETED: "Tamamlandı",
    NO_SHOW: "Gelmedi",
    RESCHEDULED: "Ertelendi",
    IN_PROGRESS: "Devam Ediyor",
  };
  return statusMap[status] || status;
};

/**
 * AppointmentOutcome enum değerlerini Türkçe'ye çeviren utility
 */
export const getAppointmentOutcomeLabel = (outcome: string): string => {
  const outcomeMap: Record<string, string> = {
    ENROLLED: "Kayıt Oldu",
    INTERESTED: "İlgili",
    NOT_INTERESTED: "İlgili Değil",
    NEEDS_MORE_INFO: "Daha Fazla Bilgi Gerekiyor",
    PRICE_CONCERN: "Fiyat Endişesi",
    TIMING_ISSUE: "Zamanlama Sorunu",
    CONSIDERING_OPTIONS: "Seçenekleri Değerlendiriyor",
    WILL_CALL_BACK: "Geri Arayacak",
    OTHER: "Diğer",
  };
  return outcomeMap[outcome] || outcome;
};

/**
 * Enum değerlerini field'a göre uygun Türkçe karşılığına çeviren genel utility
 */
export const getEnumLabel = (fieldKey: string, value: string): string => {
  switch (fieldKey) {
    case "appointmentType":
      return getAppointmentTypeLabel(value);
    case "appointmentStatus":
      return getAppointmentStatusLabel(value);
    case "appointmentOutcome":
      return getAppointmentOutcomeLabel(value);
    default:
      return value;
  }
};

/**
 * Field labellarını Türkçe'ye çeviren utility
 * Yeni AppointmentSlotDto yapısına göre güncellenmiş
 */
export const getFieldLabel = (fieldKey: string): string => {
  const labelMap: Record<string, string> = {
    schoolName: "Okul",
    staffUserName: "Personel",
    dayOfWeekName: "Gün",
    slotDate: "Slot Tarihi",
    slotDateStart: "Slot Başlangıç",
    slotDateEnd: "Slot Bitiş",
    appointmentType: "Tür",
    durationMinutes: "Süre",
    onlineMeetingAvailable: "Online",
    isAvailable: "Müsaitlik",
    isActive: "Aktif",
    requiresApproval: "Onay Gerekli",
    appointmentNumber: "Randevu No",
    appointmentStatus: "Randevu Durumu",
    appointmentOutcome: "Sonuç",
    parentName: "Veli",
    studentName: "Öğrenci",
    appointmentDate: "Randevu Tarihi",
  };
  return labelMap[fieldKey] || fieldKey;
};

/**
 * Aktif filtre sayısına göre dinamik subtitle oluşturan utility
 */
export const getFilterSubtitle = (
  filters: Record<string, any> | null | undefined,
  totalCount: number,
  loadingText = "Yükleniyor..."
): string => {
  const filterCount = filters ? Object.keys(filters).length : 0;

  if (filterCount > 0) {
    return `${totalCount} slot • ${filterCount} aktif filtre`;
  }
  return totalCount > 0
    ? `${totalCount} slot içerisinde filtreleme yapabilirsiniz`
    : loadingText;
};
