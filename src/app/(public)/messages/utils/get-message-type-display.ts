/**
 * Get display text for message type
 */
export const getMessageTypeDisplay = (type?: string): string => {
  if (!type) return "-";

  switch (type.toUpperCase()) {
    case "GENERAL_INQUIRY":
      return "Genel Bilgi Talebi";
    case "ENROLLMENT_INQUIRY":
      return "Kayıt Bilgi Talebi";
    case "APPOINTMENT_REQUEST":
      return "Randevu Talebi";
    case "COMPLAINT":
      return "Şikayet";
    case "SUGGESTION":
      return "Öneri";
    case "TECHNICAL_SUPPORT":
      return "Teknik Destek";
    case "FINANCIAL_INQUIRY":
      return "Mali İşler Sorgusu";
    case "TRANSPORTATION":
      return "Ulaşım";
    case "CAFETERIA":
      return "Yemekhane";
    case "EXTRACURRICULAR":
      return "Ders Dışı Etkinlikler";
    case "ACADEMIC_INQUIRY":
      return "Akademik Sorgular";
    case "FACILITIES_INQUIRY":
      return "Tesis Bilgileri";
    case "CALLBACK_REQUEST":
      return "Geri Arama Talebi";
    case "BROCHURE_REQUEST":
      return "Broşür Talebi";
    case "PARTNERSHIP":
      return "Ortaklık";
    case "MEDIA_INQUIRY":
      return "Medya Sorgusu";
    case "OTHER":
      return "Diğer";
    default:
      return type;
  }
};
