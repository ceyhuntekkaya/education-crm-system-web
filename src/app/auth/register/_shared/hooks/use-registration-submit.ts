import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";
import { useRegister as useRegisterApi } from "./use-register";
import { UserRegistrationDto } from "@/types";
import type { RegisterResponse } from "../types";
import type { RegistrationType } from "../register-form";

/**
 * Kayıt işlemini tamamlama
 */
export const useRegistrationSubmit = (registrationType?: RegistrationType) => {
  const { values } = useForm();
  const { registerUser, isLoading, error } = useRegisterApi();

  const submitRegistration =
    useCallback(async (): Promise<RegisterResponse | null> => {
      if (!values) return null;

      // registrationType direkt UserType enum, backend'e gönder
      const userType = registrationType;

      // Tüm form verilerini UserRegistrationDto formatına dönüştür
      const registrationData: UserRegistrationDto = {
        // Login
        email: values.personalInfo?.email || "",
        password: values.loginCredentials?.password || "",
        confirmPassword: values.loginCredentials?.confirmPassword || "",

        // Personal
        firstName: values.personalInfo?.firstName || "",
        lastName: values.personalInfo?.lastName || "",
        phone: values.personalInfo?.phone || "",

        // Campus/Location
        countryId: values.campusInfo?.countryId || 0,
        provinceId: values.campusInfo?.provinceId || 0,
        districtId: values.campusInfo?.districtId || 0,
        neighborhoodId: values.campusInfo?.neighborhoodId || 0,
        addressLine1: values.campusInfo?.addressLine1 || "",
        addressLine2: values.campusInfo?.addressLine2 || "",
        postalCode: values.campusInfo?.postalCode || "",

        // User type - direkt UserType enum
        userType: userType!,

        // Agreements
        acceptTerms: values.paymentInfo?.acceptTerms || false,
        acceptPrivacy: values.paymentInfo?.acceptPrivacy || false,
        acceptMarketing: values.paymentInfo?.acceptMarketing || false,
      };

      console.log(`[Register] UserType: ${registrationData.userType}`);

      const result = await registerUser(registrationData);

      // Başarılı kayıt - redirect yapmadan sadece result döndür
      // Step 7'ye geçiş form-content tarafından yönetilecek
      return result;
    }, [values, registerUser, registrationType]);

  return {
    submitRegistration,
    isSubmitting: isLoading,
    submitError: error,
  };
};
