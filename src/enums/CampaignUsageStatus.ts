export enum CampaignUsageStatus {
  PENDING = "PENDING", // Beklemede
  VALIDATED = "VALIDATED", // Doğrulandı
  APPROVED = "APPROVED", // Onaylandı
  PROCESSED = "PROCESSED", // İşlendi
  COMPLETED = "COMPLETED", // Tamamlandı
  REJECTED = "REJECTED", // Reddedildi
  EXPIRED = "EXPIRED", // Süresi doldu
  CANCELLED = "CANCELLED", // İptal edildi
  DUPLICATE = "DUPLICATE", // Tekrar
  FRAUD_SUSPECTED = "FRAUD_SUSPECTED", // Dolandırıcılık şüphesi
}
