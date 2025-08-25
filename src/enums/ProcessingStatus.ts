export enum ProcessingStatus {
  PENDING = "PENDING", // Beklemede
  PROCESSING = "PROCESSING", // İşleniyor
  COMPLETED = "COMPLETED", // Tamamlandı
  FAILED = "FAILED", // Başarısız
  CANCELLED = "CANCELLED", // İptal edildi
}
