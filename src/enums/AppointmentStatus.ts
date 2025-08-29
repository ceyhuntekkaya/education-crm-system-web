export enum AppointmentStatus {
  PENDING = "PENDING", // Beklemede
  CONFIRMED = "CONFIRMED", // Onaylandı
  APPROVED = "APPROVED", // Onaylandı (manuel onay gerektiren durumlarda)
  REJECTED = "REJECTED", // Reddedildi
  CANCELLED = "CANCELLED", // İptal edildi
  COMPLETED = "COMPLETED", // Tamamlandı
  NO_SHOW = "NO_SHOW", // Gelmedi
  RESCHEDULED = "RESCHEDULED", // Ertelendi
  IN_PROGRESS = "IN_PROGRESS", // Devam ediyor
}
