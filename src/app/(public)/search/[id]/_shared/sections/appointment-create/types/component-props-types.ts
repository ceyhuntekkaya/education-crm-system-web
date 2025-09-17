/**
 * Component prop interfaces for appointment creation
 * Bu dosya component'ların prop interface'lerini içerir
 */

import { FormStep } from "./form-data-types";
import { FormStepConfig } from "./step-config-types";

// =============================================================================
// COMPONENT PROP INTERFACES - Her component için props
// =============================================================================

/**
 * Progress Bar component props
 */
export interface ProgressBarProps {
  steps: readonly FormStepConfig[];
  currentStep: FormStep;
  onStepClick?: (step: FormStep) => void;
  className?: string;
}

/**
 * Main appointment create component props
 */
export interface AppointmentCreateProps {
  schoolId: number;
  isOnline?: boolean;
  className?: string;
}

/**
 * Step component base props - Tüm step component'lar için ortak
 */
export interface BaseStepProps {
  className?: string;
}

/**
 * Appointment Type Step props
 */
export interface AppointmentTypeStepProps extends BaseStepProps {}

/**
 * Personal Info Step props
 */
export interface PersonalInfoStepProps extends BaseStepProps {}

/**
 * Student Info Step props
 */
export interface StudentInfoStepProps extends BaseStepProps {}

/**
 * Date Time Step props
 */
export interface DateTimeStepProps extends BaseStepProps {}

/**
 * Confirmation Step props
 */
export interface ConfirmationStepProps extends BaseStepProps {}

/**
 * Step Renderer props
 */
export interface StepRendererProps {
  currentStep: FormStep;
  className?: string;
}
