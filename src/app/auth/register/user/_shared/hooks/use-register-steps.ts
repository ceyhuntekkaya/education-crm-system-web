import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getTotalSteps } from "../constants";
import { UserType } from "@/enums/UserType";

type RegistrationType = UserType;

/**
 * User register için step navigation
 * 4 adımlı kayıt: Giriş, Kişisel Bilgiler, Doğrulama, Success
 */
export const useRegisterSteps = (registrationType: RegistrationType) => {
  const searchParams = useSearchParams();
  const stepIdParam = searchParams.get("stepId");

  // URL'den gelen stepId parametresini parse et
  const initialStep = (() => {
    if (stepIdParam) {
      const parsedStep = parseInt(stepIdParam, 10);
      const totalSteps = getTotalSteps(registrationType);

      // Success step'e direkt geçiş yasak
      if (parsedStep === 4) {
        return 1;
      }

      if (!isNaN(parsedStep) && parsedStep >= 1 && parsedStep <= totalSteps) {
        return parsedStep;
      }
    }
    return 1;
  })();

  const [currentStep, setCurrentStep] = useState(initialStep);
  const totalSteps = getTotalSteps(registrationType);

  useEffect(() => {
    if (stepIdParam) {
      const parsedStep = parseInt(stepIdParam, 10);

      if (parsedStep === 4) {
        setCurrentStep(1);
        return;
      }

      if (!isNaN(parsedStep) && parsedStep >= 1 && parsedStep <= totalSteps) {
        setCurrentStep(parsedStep);
      }
    }
  }, [stepIdParam, totalSteps]);

  // Scroll helper function
  const scrollToStepper = useCallback(() => {
    setTimeout(() => {
      const stepperElement = document.getElementById("register-stepper");
      if (stepperElement) {
        const offsetTop = stepperElement.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    }, 100);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      scrollToStepper();
    }
  }, [currentStep, totalSteps, scrollToStepper]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      scrollToStepper();
    }
  }, [currentStep, scrollToStepper]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps && step !== 4) {
        setCurrentStep(step);
      }
    },
    [totalSteps]
  );

  // Scroll to top when success page (step 4) is reached
  useEffect(() => {
    if (currentStep === 4) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  return {
    currentStep,
    setCurrentStep,
    nextStep,
    previousStep,
    goToStep,
    totalSteps,
  };
};
