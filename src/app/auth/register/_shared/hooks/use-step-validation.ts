import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";

/**
 * Step validasyonu - Her step'in tamamlanma durumunu kontrol eder
 */
export const useStepValidation = () => {
  const { values } = useForm();

  const isStepCompleted = useCallback(
    (step: number): boolean => {
      if (!values) return false;

      try {
        switch (step) {
          case 1:
            // Login credentials check
            return !!(
              values.loginCredentials?.username &&
              values.loginCredentials?.password &&
              values.loginCredentials?.confirmPassword &&
              values.loginCredentials?.password ===
                values.loginCredentials?.confirmPassword
            );
          case 2:
            // Personal info check
            return !!(
              values.personalInfo?.firstName &&
              values.personalInfo?.lastName &&
              values.personalInfo?.email &&
              values.personalInfo?.phone
            );
          case 3:
            // Verification code check
            const code = Object.values(values.verificationCode || {}).join("");
            return code.length === 4 && /^\d{4}$/.test(code);
          case 4:
            // Campus info check - Sadece required alanlar kontrol ediliyor
            return !!(
              values.campusInfo?.brandId &&
              values.campusInfo?.campusName &&
              values.campusInfo?.countryId &&
              values.campusInfo?.provinceId &&
              values.campusInfo?.districtId &&
              values.campusInfo?.neighborhoodId &&
              values.campusInfo?.addressLine1 &&
              values.campusInfo?.postalCode
            );
          case 5:
            // Package selection check
            return !!values.packageSelection?.selectedPlanId;
          case 6:
            // Payment info check
            return !!(
              values.paymentInfo?.cardHolderName &&
              values.paymentInfo?.cardNumber &&
              values.paymentInfo?.expiryMonth &&
              values.paymentInfo?.expiryYear &&
              values.paymentInfo?.cvv &&
              values.paymentInfo?.acceptTerms &&
              values.paymentInfo?.acceptPrivacy
            );
          default:
            return false;
        }
      } catch {
        return false;
      }
    },
    [values]
  );

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
