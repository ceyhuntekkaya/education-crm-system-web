/**
 * Validation constants for appointment creation
 * Bu dosya doğrulama kuralları için sabitleri içerir
 */

// =============================================================================
// VALIDATION RULES - Doğrulama kuralları için sabitler
// =============================================================================

export const VALIDATION_CONSTANTS = {
  MIN_AGE: 3,
  MAX_AGE: 18,
  PHONE_REGEX: /^(\+90|0)?[5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;

// Export as VALIDATION_RULES for backward compatibility
export const VALIDATION_RULES = VALIDATION_CONSTANTS;

// =============================================================================
// ERROR MESSAGES - Hata mesajları
// =============================================================================

export const ERROR_MESSAGES = {
  INVALID_EMAIL: "Geçerli bir e-posta adresi giriniz",
  INVALID_PHONE: "Geçerli bir telefon numarası giriniz",
  REQUIRED_FIELD: "Bu alan zorunludur",
  INVALID_AGE: `Yaş ${VALIDATION_CONSTANTS.MIN_AGE} ile ${VALIDATION_CONSTANTS.MAX_AGE} arasında olmalıdır`,
  NAME_TOO_SHORT: `İsim en az ${VALIDATION_CONSTANTS.NAME_MIN_LENGTH} karakter olmalıdır`,
  NAME_TOO_LONG: `İsim en fazla ${VALIDATION_CONSTANTS.NAME_MAX_LENGTH} karakter olmalıdır`,
  DATE_SELECTION_ERROR: "Lütfen geçerli bir tarih seçiniz",
  INVALID_BIRTH_DATE: "Geçerli bir doğum tarihi giriniz",
  TERMS_NOT_ACCEPTED: "Kullanım koşullarını kabul etmelisiniz",
  VALIDATION_ERROR: "Lütfen girilen bilgileri kontrol ediniz",
} as const;
