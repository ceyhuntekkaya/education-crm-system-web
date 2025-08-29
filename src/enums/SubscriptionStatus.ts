export enum SubscriptionStatus {
  TRIAL = "TRIAL", // Deneme sürümü
  ACTIVE = "ACTIVE", // Aktif
  PAST_DUE = "PAST_DUE", // Gecikmiş ödeme
  CANCELED = "CANCELED", // İptal edilmiş
  EXPIRED = "EXPIRED", // Süresi dolmuş
  SUSPENDED = "SUSPENDED", // Askıya alınmış
  PENDING = "PENDING", // Beklemede
}
