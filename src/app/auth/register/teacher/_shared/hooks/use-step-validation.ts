"use client";

import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";

/**
 * Öğretmen / Eğitmen kayıt adım validasyonu
 * Her adımın tamamlanma durumunu kontrol eder (Eğitim Kurumu ile aynı mantık)
 */
export const useStepValidation = () => {
  const { values } = useForm();

  const isStepCompleted = useCallback(
    (step: number): boolean => {
      if (!values) return false;

      try {
        switch (step) {
          case 1:
            return !!(
              values.loginCredentials?.email &&
              values.loginCredentials?.password &&
              values.loginCredentials?.confirmPassword &&
              values.loginCredentials?.password ===
                values.loginCredentials?.confirmPassword
            );
          case 2:
            return !!(
              values.personalInfo?.firstName &&
              values.personalInfo?.lastName &&
              values.personalInfo?.phone
            );
          case 3:
            return true;
          default:
            return false;
        }
      } catch {
        return false;
      }
    },
    [values],
  );

  const canProceedToNextStep = useCallback(
    (currentStep: number): boolean => {
      return isStepCompleted(currentStep);
    },
    [isStepCompleted],
  );

  return {
    isStepCompleted,
    canProceedToNextStep,
  };
};
