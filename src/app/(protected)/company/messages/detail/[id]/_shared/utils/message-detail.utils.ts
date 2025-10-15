/**
 * Message ID'sini valide eder ve number'a çevirir
 * @param id - String ID
 * @returns Valide edilmiş number ID veya null
 */
export const validateMessageId = (id: string): number | null => {
  if (!id || id === "new") {
    return null;
  }

  const numericId = parseInt(id, 10);

  if (isNaN(numericId) || numericId <= 0) {
    return null;
  }

  return numericId;
};

/**
 * Message durumu için badge rengini döndürür
 */
export const getMessageStatusColor = (status: string): string => {
  switch (status?.toLowerCase()) {
    case "read":
      return "success";
    case "unread":
      return "warning";
    case "replied":
      return "info";
    case "resolved":
      return "primary";
    case "deleted":
      return "danger";
    default:
      return "secondary";
  }
};

/**
 * Message önceliği için badge rengini döndürür
 */
export const getMessagePriorityColor = (priority: string): string => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "danger";
    case "medium":
      return "warning";
    case "low":
      return "success";
    default:
      return "secondary";
  }
};

/**
 * Message türünü Türkçeye çevirir
 */
export const translateMessageType = (messageType?: string): string => {
  if (!messageType) return "Genel";

  switch (messageType) {
    case "GENERAL_INQUIRY":
      return "Genel Sorgu";
    case "ENROLLMENT_INQUIRY":
      return "Kayıt Sorgusu";
    case "APPOINTMENT_REQUEST":
      return "Randevu Talebi";
    case "COMPLAINT":
      return "Şikayet";
    case "SUGGESTION":
      return "Öneri";
    case "TECHNICAL_SUPPORT":
      return "Teknik Destek";
    case "FINANCIAL_INQUIRY":
      return "Mali İşler";
    case "TRANSPORTATION":
      return "Ulaşım";
    case "CAFETERIA":
      return "Kafeterya";
    case "EXTRACURRICULAR":
      return "Ders Dışı Etkinlikler";
    case "ACADEMIC_INQUIRY":
      return "Akademik Sorgu";
    case "FACILITIES_INQUIRY":
      return "Tesisler";
    case "CALLBACK_REQUEST":
      return "Aranma Talebi";
    case "BROCHURE_REQUEST":
      return "Broşür Talebi";
    case "PARTNERSHIP":
      return "İş Ortaklığı";
    case "MEDIA_INQUIRY":
      return "Medya Sorgusu";
    case "OTHER":
      return "Diğer";
    default:
      return messageType;
  }
};

/**
 * Message önceliğini Türkçeye çevirir
 */
export const translateMessagePriority = (priority?: string): string => {
  if (!priority) return "Normal";

  switch (priority) {
    case "LOW":
      return "Düşük";
    case "NORMAL":
      return "Normal";
    case "HIGH":
      return "Yüksek";
    case "URGENT":
      return "Acil";
    case "CRITICAL":
      return "Kritik";
    default:
      return priority;
  }
};

/**
 * Message durumunu Türkçeye çevirir
 */
export const translateMessageStatus = (status?: string): string => {
  if (!status) return "Yeni";

  switch (status) {
    case "NEW":
      return "Yeni";
    case "READ":
      return "Okundu";
    case "IN_PROGRESS":
      return "İşlemde";
    case "WAITING_RESPONSE":
      return "Yanıt Bekliyor";
    case "RESPONDED":
      return "Yanıtlandı";
    case "RESOLVED":
      return "Çözüldü";
    case "CLOSED":
      return "Kapatıldı";
    case "ESCALATED":
      return "Yükseltildi";
    case "SPAM":
      return "Spam";
    case "ARCHIVED":
      return "Arşivlendi";
    default:
      return status;
  }
};

/**
 * İletişim yöntemini Türkçeye çevirir
 */
export const translateContactMethod = (method?: string): string => {
  if (!method) return "Belirtilmemiş";

  switch (method.toLowerCase()) {
    case "email":
      return "E-posta";
    case "phone":
      return "Telefon";
    case "sms":
      return "SMS";
    case "whatsapp":
      return "WhatsApp";
    case "in_person":
      return "Yüz Yüze";
    default:
      return method;
  }
};
