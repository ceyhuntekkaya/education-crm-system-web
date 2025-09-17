/**
 * Step configuration types for appointment creation form
 * Bu dosya form adımları için configuration types'larını içerir
 */

import { FormStep } from "./form-data-types";

// =============================================================================
// STEP CONFIGURATION TYPES - Form adımları için types
// =============================================================================

/**
 * Form step configuration interface
 * Progress bar ve step navigation için kullanılır
 */
export interface FormStepConfig {
  key: FormStep;
  title: string;
  icon: string;
}
