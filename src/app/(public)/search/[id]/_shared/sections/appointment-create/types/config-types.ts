/**
 * Configuration type definitions for appointment creation
 * Bu dosya tüm konfigürasyon interface'lerini içerir
 */

// =============================================================================
// UI AND TIMING CONFIGURATION TYPES
// =============================================================================

/**
 * UI görünümü ve zamanlama ayarları için interface
 */
export interface UITimingConfig {
  // UI preferences
  showProgressBar: boolean;
  showStepNumbers: boolean;
  compactMode: boolean;

  // Timing settings
  sessionTimeoutMinutes: number;
  autosaveIntervalSeconds: number;
}

// =============================================================================
// FORM BEHAVIOR CONFIGURATION TYPES
// =============================================================================

/**
 * Form davranışları ve navigasyon ayarları için interface
 */
export interface FormBehaviorConfig {
  // Form behavior
  autoAdvanceOnValid: boolean;
  enableValidation: boolean;

  // Navigation
  allowSkipSteps: boolean;
  allowBackNavigation: boolean;

  // Submission
  autoSubmitOnLastStep: boolean;
  showConfirmationDialog: boolean;

  // Communication defaults
  defaultCommunicationPreference: "EMAIL" | "PHONE" | "SMS";
  requireTermsAgreement: boolean;
}

// =============================================================================
// COMBINED CONFIGURATION TYPES
// =============================================================================

/**
 * Tüm appointment form konfigürasyonları için birleşik interface
 */
export interface AppointmentFormConfig
  extends FormBehaviorConfig,
    UITimingConfig {}

/**
 * Konfigürasyon seçenekleri için utility types
 */
export type CommunicationPreferenceType = "EMAIL" | "PHONE" | "SMS";
export type ConfigurationKeys = keyof AppointmentFormConfig;
