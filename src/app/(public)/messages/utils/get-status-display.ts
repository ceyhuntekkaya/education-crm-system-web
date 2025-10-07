/**
 * Get display text for message status
 */
export const getStatusDisplay = (status?: string): string => {
  if (!status) return "Bilinmiyor";

  switch (status.toUpperCase()) {
    case "NEW":
      return "Yeni";
    case "READ":
      return "Okundu";
    case "IN_PROGRESS":
      return "İşlemde";
    case "WAITING_RESPONSE":
      return "Yanıt Bekleniyor";
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
