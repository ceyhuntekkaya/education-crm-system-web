/**
 * Navigation type definitions for appointment creation
 * Bu dosya navigation control için types içerir
 */

import { FormStep } from "./form-data-types";

// =============================================================================
// NAVIGATION TYPES - Navigation control için
// =============================================================================

/**
 * Navigation Controls props
 */
export interface NavigationControlsProps {
  currentStep: FormStep;
  isFirstStep: boolean;
  isLastStep: boolean;
  canProceed: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  className?: string;
}
