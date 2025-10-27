/**
 * Register Context Types
 */

import type { RegisterFormData, RegisterResponse } from "./register.types";
import type { RegistrationType } from "../register-form";

// Location data interface
export interface LocationOption {
  value: string;
  label: string;
  raw: any;
}

export interface LocationData {
  data: LocationOption[];
  raw: any[];
  loading: boolean;
  error: any;
  disabled?: boolean;
}

export interface LocationState {
  countries: LocationData;
  provinces: LocationData;
  districts: LocationData;
  neighborhoods: LocationData;
}

// Brand data interface
export interface BrandOption {
  value: string;
  label: string;
  raw: any;
}

export interface BrandData {
  data: BrandOption[];
  raw: any[];
  loading: boolean;
  error: any;
}

export interface BrandState {
  brands: BrandData;
}

export interface RegisterContextType {
  // Form data
  formData: RegisterFormData;

  // Registration type
  registrationType: RegistrationType;

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

  // Location data
  locationData: LocationState;

  // Brand data
  brandData: BrandState;

  // Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  handleStepClick: (step: number) => void;
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
  isStepClickable: (step: number) => boolean;
}
