"use client";

import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";
import { useSnackbar } from "@/contexts/snackbar-context";
import { useUserRegisterFinal } from "./use-user-register-final";

/**
 * User Submit Step 3 Handler Hook
 * Doğrulama kodunu kontrol eder ve tüm kayıt verilerini tek seferde gönderir
 * https://api.egitimiste.com/api/register/user
 */
export const useSubmitStep3 = (
  userId: number | null,
  setUserId: (id: number) => void,
  nextStep: () => void,
  fullCode: string
) => {
  const { values } = useForm();
  const { showSnackbar } = useSnackbar();
  const { submitFinal } = useUserRegisterFinal();

  const handleSubmit = useCallback(async () => {
    // Verification code'u al
    let code = fullCode;

    if (!code || code.length !== 4) {
      const verificationObj = values?.verificationCode || {};
      code = [
        verificationObj.code1,
        verificationObj.code2,
        verificationObj.code3,
        verificationObj.code4,
      ]
        .filter(Boolean)
        .join("");
    }

    if (!code || code.length !== 4) {
      showSnackbar("Doğrulama kodu eksik veya hatalı", "error");
      return;
    }

    // Tüm form verilerini birleştir
    const payload = {
      // Login credentials
      email: values?.loginCredentials?.email || "",
      password: values?.loginCredentials?.password || "",
      passwordControl: values?.loginCredentials?.confirmPassword || "",

      // Personal info
      firstName: values?.personalInfo?.firstName || "",
      lastName: values?.personalInfo?.lastName || "",
      phone: values?.personalInfo?.phone || "",

      // Verification code
      code,
    };

    // Final API call: /api/register/user
    const finalResponse = await submitFinal(payload);

    // Backend'den success gelmese bile success sayfasına yönlendir (şimdilik)
    if (finalResponse?.data?.id) {
      setUserId(finalResponse.data.id);
    }

    if (finalResponse?.success) {
      showSnackbar("Kayıt işlemi tamamlandı", "success");
    } else {
      showSnackbar(
        finalResponse?.message || "Kayıt işlemi devam ediyor",
        "info"
      );
    }

    // Her durumda success step'e geç
    nextStep();
  }, [values, fullCode, submitFinal, showSnackbar, nextStep, setUserId]);

  return { handleSubmitStep3: handleSubmit };
};
