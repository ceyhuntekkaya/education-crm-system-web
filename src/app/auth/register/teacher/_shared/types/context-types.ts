import type { TeacherRegisterFormData, StepConfig } from "./register.types";
import { UserType } from "@/enums/UserType";

export interface TeacherRegisterContextType {
  // Step management
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  totalSteps: number;

  // Validation (Eğitim Kurumu kaydı ile aynı - tamamlanan adımlar)
  isStepCompleted: (step: number) => boolean;
  isStepClickable: (step: number) => boolean;
  canProceedToNextStep: (step?: number) => boolean;
  handleStepClick: (step: number) => void;

  // Submit handler
  handleSubmit: () => Promise<void>;

  // Loading state
  isLoading: boolean;

  // Registration type (TEACHER or INSTRUCTOR)
  registrationType: UserType.TEACHER | UserType.INSTRUCTOR;

  // Error message
  error: string | null;
}

export type { TeacherRegisterFormData, StepConfig };
