/**
 * Context type definitions for appointment creation
 * Bu dosya context değerleri için interfaces içerir
 */

import { FormStep, AppointmentCreateFormData } from "./form-data-types";
import { AppointmentCreationResult } from "./form-result-types";
import { FormStepConfig } from "./step-config-types";

// =============================================================================
// CONTEXT TYPES - Context değerleri için interfaces
// =============================================================================

/**
 * Appointment context value interface
 */
export interface AppointmentContextValue {
  // Appointment info
  schoolId: number;
  isOnline: boolean;

  // Steps
  currentStep: FormStep;
  steps: readonly FormStepConfig[];
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;

  // Submission
  isSubmitting: boolean;
  submissionResult: AppointmentCreationResult | null;

  // Actions - Context'te kullanılan gerçek method isimleri
  goToStep: (step: FormStep) => void;
  goToNextStep: () => Promise<boolean>;
  goToPreviousStep: () => void;
  submitForm: () => Promise<void>;
  resetAppointment: () => void;
}

/**
 * Appointment Provider props
 */
export interface AppointmentProviderProps {
  children: React.ReactNode;
  schoolId: number;
  isOnline?: boolean;
}
