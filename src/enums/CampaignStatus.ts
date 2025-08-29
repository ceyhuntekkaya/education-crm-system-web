export enum CampaignStatus {
  DRAFT = "DRAFT", // Taslak
  PENDING_APPROVAL = "PENDING_APPROVAL", // Onay bekliyor
  APPROVED = "APPROVED", // Onaylandı
  ACTIVE = "ACTIVE", // Aktif
  PAUSED = "PAUSED", // Duraklatıldı
  EXPIRED = "EXPIRED", // Süresi doldu
  CANCELLED = "CANCELLED", // İptal edildi
  COMPLETED = "COMPLETED", // Tamamlandı
  ARCHIVED = "ARCHIVED", // Arşivlendi
}
