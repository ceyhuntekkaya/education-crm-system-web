/**
 * Communication preference constants for appointment creation
 * Bu dosya iletişim tercihleri seçenekleri ve etiketlerini içerir
 */

// =============================================================================
// COMMUNICATION PREFERENCES - İletişim tercihleri
// =============================================================================

export const COMMUNICATION_PREFERENCE_OPTIONS = {
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  SMS: "SMS",
} as const;

export const COMMUNICATION_PREFERENCE_LABELS = {
  EMAIL: "E-posta",
  PHONE: "Telefon",
  SMS: "SMS",
} as const;

export type CommunicationPreference =
  keyof typeof COMMUNICATION_PREFERENCE_OPTIONS;
