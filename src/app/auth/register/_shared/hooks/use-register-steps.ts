import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getTotalSteps } from "../constants";
import type { RegistrationType } from "../register-form";

/**
 * Step navigation ve state yönetimi
 */
export const useRegisterSteps = (registrationType: RegistrationType) => {
  const searchParams = useSearchParams();
  const stepIdParam = searchParams.get("stepId");

  // URL'den gelen stepId parametresini parse et ve geçerli bir sayı olup olmadığını kontrol et
  const initialStep = (() => {
    if (stepIdParam) {
      const parsedStep = parseInt(stepIdParam, 10);
      const totalSteps = getTotalSteps(registrationType);

      // Geçerli bir step numarası mı kontrol et (1 ile totalSteps arasında)
      if (!isNaN(parsedStep) && parsedStep >= 1 && parsedStep <= totalSteps) {
        return parsedStep;
      }
    }
    return 1; // Default olarak 1. step
  })();

  const [currentStep, setCurrentStep] = useState(initialStep);
  const totalSteps = getTotalSteps(registrationType);

  // URL parametresi değiştiğinde currentStep'i güncelle
  useEffect(() => {
    if (stepIdParam) {
      const parsedStep = parseInt(stepIdParam, 10);

      if (!isNaN(parsedStep) && parsedStep >= 1 && parsedStep <= totalSteps) {
        setCurrentStep(parsedStep);
      }
    }
  }, [stepIdParam, totalSteps]);

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
