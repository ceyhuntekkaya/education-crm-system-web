/**
 * Register Context Types
 */

import type { RegisterFormData, RegisterResponse } from "./register.types";

export interface RegisterContextType {
  // Form data
  formData: RegisterFormData;

  // Current step
  currentStep: number;

  // Loading states
  isLoading: boolean;
  isVerifying: boolean;
  isSubmitting: boolean;

  // Error states
  error: string | null;
  verificationError: string | null;

  // Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  updateFormData: (step: number, data: any) => void;
  sendVerificationCode: () => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
  submitRegistration: () => Promise<RegisterResponse | null>;

  // Validation
  canProceedToNextStep: () => boolean;
  isStepCompleted: (step: number) => boolean;
}
