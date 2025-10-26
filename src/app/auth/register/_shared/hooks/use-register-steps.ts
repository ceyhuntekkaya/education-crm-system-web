import { useState, useCallback } from "react";
import { TOTAL_STEPS } from "../constants";

/**
 * Step navigation ve state yönetimi
 */
export const useRegisterSteps = () => {
  const [currentStep, setCurrentStep] = useState(5);

  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
    }
  }, []);

  return {
    currentStep,
    setCurrentStep,
    nextStep,
    previousStep,
    goToStep,
  };
};
