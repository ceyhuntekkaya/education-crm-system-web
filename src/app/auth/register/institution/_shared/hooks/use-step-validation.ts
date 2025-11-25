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
            // Login credentials check (Backend: RegisterCredentialDto)
            return !!(
              values.loginCredentials?.email &&
              values.loginCredentials?.password &&
              values.loginCredentials?.confirmPassword &&
              values.loginCredentials?.password ===
                values.loginCredentials?.confirmPassword
            );
          case 2:
            // Personal info check
            const isStep2Valid = !!(
              values.personalInfo?.firstName &&
              values.personalInfo?.lastName &&
              values.personalInfo?.email &&
              values.personalInfo?.phone
            );
            return isStep2Valid;
          case 3:
            // Verification code check - digit1-4 veya code1-4 alanlarını kontrol et
            const verificationObj = values.verificationCode || {};

            // Önce digit1-4 kontrol et
            const digitCode = [
              verificationObj.digit1,
              verificationObj.digit2,
              verificationObj.digit3,
              verificationObj.digit4,
            ]
              .filter(Boolean)
              .join("");

            // Sonra code1-4 kontrol et
            const codeCode = [
              verificationObj.code1,
              verificationObj.code2,
              verificationObj.code3,
              verificationObj.code4,
            ]
              .filter(Boolean)
              .join("");

            // Hangisi 4 haneli ise onu kullan
            const finalCode = digitCode.length === 4 ? digitCode : codeCode;
            const isStep3Valid =
              finalCode.length === 4 && /^\d{4}$/.test(finalCode);

            return isStep3Valid;
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
          case 7:
            // Step 7 (Tamamlandı) - Her zaman true (final verification için)
            return true;
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
