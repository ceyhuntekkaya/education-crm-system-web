export enum SurveyTriggerEvent {
  APPOINTMENT_COMPLETED = "APPOINTMENT_COMPLETED", // Randevu tamamlandıktan sonra
  ENROLLMENT_COMPLETED = "ENROLLMENT_COMPLETED", // Kayıt tamamlandıktan sonra
  MANUAL_SEND = "MANUAL_SEND", // Manuel gönderim
  PERIODIC = "PERIODIC", // Periyodik gönderim
  EVENT_BASED = "EVENT_BASED", // Olay bazlı
}
