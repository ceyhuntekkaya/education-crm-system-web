export enum ResponseStatus {
  INVITED = "INVITED", // Davet gönderildi
  STARTED = "STARTED", // Başladı
  IN_PROGRESS = "IN_PROGRESS", // Devam ediyor
  COMPLETED = "COMPLETED", // Tamamlandı
  SUBMITTED = "SUBMITTED", // Gönderildi
  EXPIRED = "EXPIRED", // Süresi doldu
  ABANDONED = "ABANDONED", // Terk edildi
  DELETED = "DELETED", // Silindi
}
