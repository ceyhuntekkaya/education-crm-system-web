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
