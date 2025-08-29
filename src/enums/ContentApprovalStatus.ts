export enum ContentApprovalStatus {
  PENDING = "PENDING", // Beklemede
  APPROVED = "APPROVED", // Onaylandı
  REJECTED = "REJECTED", // Reddedildi
  NEEDS_REVISION = "NEEDS_REVISION", // Revizyon gerekli
  IN_REVIEW = "IN_REVIEW", // İncelemede
  EXPIRED = "EXPIRED", // Süresi doldu
  ARCHIVED = "ARCHIVED", // Arşivlendi
}
