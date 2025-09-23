import { useState, useCallback, useMemo } from "react";
import { FormStep } from "../types";
import { CONTEXT_STEP_CONFIG } from "../constants/step-config-constants";

export interface UseAppointmentStepsReturn {
  // State
  currentStep: FormStep;
  steps: typeof CONTEXT_STEP_CONFIG;
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;

  // Actions
  goToStep: (step: FormStep) => void;
  goToNextStep: () => Promise<boolean>;
  goToPreviousStep: () => void;
  resetToFirstStep: () => void;
}

export const useAppointmentSteps = (
  initialStep: FormStep = FormStep.APPOINTMENT_TYPE
): UseAppointmentStepsReturn => {
  const [currentStep, setCurrentStep] = useState<FormStep>(initialStep);

  // Computed values
  const currentStepIndex = useMemo(() => {
    return CONTEXT_STEP_CONFIG.findIndex((step) => step.key === currentStep);
  }, [currentStep]);

  const isFirstStep = useMemo(() => {
    return currentStepIndex === 0;
  }, [currentStepIndex]);

  const isLastStep = useMemo(() => {
    return currentStepIndex === CONTEXT_STEP_CONFIG.length - 1;
  }, [currentStepIndex]);

  // Step navigation
  const goToStep = useCallback((step: FormStep) => {
    setCurrentStep(step);
  }, []);

  const goToNextStep = useCallback(async (): Promise<boolean> => {
    if (!isLastStep) {
      const nextStep = CONTEXT_STEP_CONFIG[currentStepIndex + 1].key;
      goToStep(nextStep);
      return true;
    }
    return true;
  }, [currentStepIndex, isLastStep, goToStep]);

  const goToPreviousStep = useCallback(() => {
    if (!isFirstStep) {
      const previousStep = CONTEXT_STEP_CONFIG[currentStepIndex - 1].key;
      goToStep(previousStep);
    }
  }, [currentStepIndex, isFirstStep, goToStep]);

  const resetToFirstStep = useCallback(() => {
    setCurrentStep(FormStep.APPOINTMENT_TYPE);
  }, []);

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      // State
      currentStep,
      steps: CONTEXT_STEP_CONFIG,
      currentStepIndex,
      isFirstStep,
      isLastStep,

      // Actions
      goToStep,
      goToNextStep,
      goToPreviousStep,
      resetToFirstStep,
    }),
    [
      currentStep,
      currentStepIndex,
      isFirstStep,
      isLastStep,
      goToStep,
      goToNextStep,
      goToPreviousStep,
      resetToFirstStep,
    ]
  );
};
