/**
 * Appointment type constants for appointment creation
 * Bu dosya randevu tipleri seçenekleri ve etiketlerini içerir
 */

// =============================================================================
// APPOINTMENT TYPES - Randevu tipleri
// =============================================================================

export const APPOINTMENT_TYPE_OPTIONS = {
  ORIENTATION: "ORIENTATION",
  EXAM: "EXAM",
  CONSULTATION: "CONSULTATION",
  ENROLLMENT: "ENROLLMENT",
} as const;

export const APPOINTMENT_TYPE_LABELS = {
  ORIENTATION: "Tanıtım Toplantısı",
  EXAM: "Seviye Tespit Sınavı",
  CONSULTATION: "Danışmanlık Görüşmesi",
  ENROLLMENT: "Kayıt İşlemleri",
} as const;

export type AppointmentType = keyof typeof APPOINTMENT_TYPE_OPTIONS;
