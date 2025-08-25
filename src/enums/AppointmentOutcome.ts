export enum AppointmentOutcome {
  ENROLLED = "ENROLLED", // Kayıt oldu
  INTERESTED = "INTERESTED", // İlgili
  NOT_INTERESTED = "NOT_INTERESTED", // İlgili değil
  NEEDS_MORE_INFO = "NEEDS_MORE_INFO", // Daha fazla bilgi gerekiyor
  PRICE_CONCERN = "PRICE_CONCERN", // Fiyat endişesi
  TIMING_ISSUE = "TIMING_ISSUE", // Zamanlama sorunu
  CONSIDERING_OPTIONS = "CONSIDERING_OPTIONS", // Seçenekleri değerlendiriyor
  WILL_CALL_BACK = "WILL_CALL_BACK", // Geri arayacak
  OTHER = "OTHER", // Diğer
}
