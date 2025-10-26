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

  // Verification UI State
  codeSent: boolean;
  resendTimer: number;
  inputRefs: React.RefObject<HTMLInputElement>[];
  fullCode: string;

  // Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  updateFormData: (step: number, data: any) => void;
  sendVerificationCode: () => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
  submitRegistration: () => Promise<RegisterResponse | null>;

  // Verification UI Handlers
  handleInputChange: (index: number, value: string) => void;
  handleKeyDown: (index: number, e: React.KeyboardEvent) => void;
  handlePaste: (e: React.ClipboardEvent) => void;
  getCodeValue: (index: number) => string;

  // Validation
  canProceedToNextStep: () => boolean;
  isStepCompleted: (step: number) => boolean;
}
