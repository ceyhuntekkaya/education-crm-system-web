/**
 * Form behavior configuration for appointment creation
 * Bu dosya form davranışları ve navigasyon ayarlarını içerir
 */

import { FormBehaviorConfig } from "../types/config-types";

// =============================================================================
// FORM BEHAVIOR CONFIGURATION
// =============================================================================

export const DEFAULT_FORM_BEHAVIOR_CONFIG: FormBehaviorConfig = {
  autoAdvanceOnValid: false,
  enableValidation: true,
  allowSkipSteps: false,
  allowBackNavigation: true,
  autoSubmitOnLastStep: false,
  showConfirmationDialog: true,
  defaultCommunicationPreference: "EMAIL",
  requireTermsAgreement: true,
};
