import { useState, useCallback } from "react";
import { getTotalSteps } from "../constants";

/**
 * Step navigation ve state yönetimi
 * Register form mimarisini takip eder
 */
export const useAppointmentSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = getTotalSteps();

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
    totalSteps,
  };
};

export interface UseAppointmentStepsReturn {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  totalSteps: number;
}
