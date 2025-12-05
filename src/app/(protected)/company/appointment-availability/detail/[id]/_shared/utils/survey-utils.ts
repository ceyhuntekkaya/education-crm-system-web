/**
 * Anket tipi için icon class'ını döndürür
 */
export const getSurveyTypeIcon = (type: string): string => {
  switch (type) {
    case "APPOINTMENT_FEEDBACK":
      return "ph ph-calendar-check";
    case "SCHOOL_RATING":
      return "ph ph-star";
    case "SERVICE_QUALITY":
      return "ph ph-chart-line";
    case "ENROLLMENT_FEEDBACK":
      return "ph ph-user-plus";
    case "GENERAL_FEEDBACK":
      return "ph ph-chat-circle-text";
    case "CUSTOM":
      return "ph ph-clipboard-text";
    default:
      return "ph ph-clipboard-text";
  }
};

/**
 * Anket tipi için badge variant'ını döndürür
 */
export const getSurveyTypeVariant = (type: string): string => {
  switch (type) {
    case "APPOINTMENT_FEEDBACK":
      return "success";
    case "SCHOOL_RATING":
      return "info";
    case "SERVICE_QUALITY":
      return "warning";
    case "ENROLLMENT_FEEDBACK":
      return "primary";
    case "GENERAL_FEEDBACK":
      return "secondary";
    case "CUSTOM":
      return "danger";
    default:
      return "secondary";
  }
};

/**
 * Anket tipi için Türkçe label döndürür
 */
export const getSurveyTypeLabel = (type: string): string => {
  switch (type) {
    case "APPOINTMENT_FEEDBACK":
      return "Randevu Geri Bildirim";
    case "SCHOOL_RATING":
      return "Kurum Değerlendirme";
    case "SERVICE_QUALITY":
      return "Hizmet Kalitesi";
    case "ENROLLMENT_FEEDBACK":
      return "Kayıt Geri Bildirimi";
    case "GENERAL_FEEDBACK":
      return "Genel Geri Bildirim";
    case "CUSTOM":
      return "Özel Anket";
    default:
      return type;
  }
};
