import { useState, useCallback } from "react";
import { getTotalSteps } from "../constants";
import type { RegistrationType } from "../register-form";

/**
 * Step navigation ve state yönetimi
 */
export const useRegisterSteps = (registrationType: RegistrationType) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = getTotalSteps(registrationType);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step);
      }
    },
    [totalSteps]
  );

  return {
    currentStep,
    setCurrentStep,
    nextStep,
    previousStep,
    goToStep,
  };
};
