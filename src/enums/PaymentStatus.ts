export enum PaymentStatus {
  PENDING = "PENDING", // Beklemede
  PROCESSING = "PROCESSING", // İşleniyor
  COMPLETED = "COMPLETED", // Tamamlandı
  FAILED = "FAILED", // Başarısız
  CANCELED = "CANCELED", // İptal edildi
  REFUNDED = "REFUNDED", // İade edildi
}
