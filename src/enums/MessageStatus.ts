export enum MessageStatus {
  NEW = "NEW", // Yeni
  READ = "READ", // Okundu
  IN_PROGRESS = "IN_PROGRESS", // İşlemde
  WAITING_RESPONSE = "WAITING_RESPONSE", // Yanıt bekleniyor
  RESPONDED = "RESPONDED", // Yanıtlandı
  RESOLVED = "RESOLVED", // Çözüldü
  CLOSED = "CLOSED", // Kapatıldı
  ESCALATED = "ESCALATED", // Üst makama iletildi
  SPAM = "SPAM", // Spam
  ARCHIVED = "ARCHIVED", // Arşivlendi
}
