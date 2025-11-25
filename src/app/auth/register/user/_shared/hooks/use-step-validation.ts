import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";

/**
 * Step validation logic
 * Kurum kaydı gibi detaylı alan kontrolü yapar
 */
export const useStepValidation = () => {
  const { values } = useForm();

  /**
   * Bir step'in tamamlanıp tamamlanmadığını kontrol eder
   */
  const isStepCompleted = useCallback(
    (step: number): boolean => {
      if (!values) return false;

      try {
        switch (step) {
          case 1:
            // Login credentials - email ve şifre kontrolü
            return !!(
              values.loginCredentials?.email &&
              values.loginCredentials?.password &&
              values.loginCredentials?.confirmPassword &&
              values.loginCredentials?.password ===
                values.loginCredentials?.confirmPassword
            );
          case 2:
            // Personal info - tüm required alanlar
            return !!(
              values.personalInfo?.firstName &&
              values.personalInfo?.lastName &&
              values.personalInfo?.phone
            );
          case 3:
            // Verification code - 4 haneli kod kontrolü
            const verificationObj = values.verificationCode || {};
            const code = [
              verificationObj.code1,
              verificationObj.code2,
              verificationObj.code3,
              verificationObj.code4,
            ]
              .filter(Boolean)
              .join("");
            return code.length === 4 && /^\d{4}$/.test(code);
          case 4:
            return true; // Success step
          default:
            return false;
        }
      } catch {
        return false;
      }
    },
    [values]
  );

  /**
   * Sonraki step'e geçilip geçilemeyeceğini kontrol eder
   */
  const canProceedToNextStep = useCallback(
    (currentStep: number): boolean => {
      return isStepCompleted(currentStep);
    },
    [isStepCompleted]
  );

  return {
    isStepCompleted,
    canProceedToNextStep,
  };
};
