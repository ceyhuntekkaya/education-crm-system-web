import type {
  UserRegisterFormData,
  StepConfig,
  StepNavigation,
} from "./register.types";

export interface UserRegisterContextType {
  // Step management
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;

  // Step validation
  isStepCompleted: (step: number) => boolean;
  canProceedToNextStep: (currentStep: number) => boolean;

  // Step navigation
  handleStepClick: (step: number) => void;
  isStepClickable: (step: number) => boolean;

  // Verification flow
  sendVerificationCode: () => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
  isVerifying: boolean;
  verificationError: string | null;
  codeSent: boolean;
  resendTimer: number;

  // Verification input management
  inputRefs: React.RefObject<HTMLInputElement>[];
  fullCode: string;
  handleInputChange: (index: number, value: string) => void;
  handleKeyDown: (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  getCodeValue: (index: number) => string;

  // API loading states
  isLoading: boolean;

  // Submit handler - sadece step 3 için
  handleSubmitStep3: () => Promise<void>;

  // User ID
  userId: number | null;
  setUserId: (id: number) => void;
}

export type { UserRegisterFormData, StepConfig, StepNavigation };
