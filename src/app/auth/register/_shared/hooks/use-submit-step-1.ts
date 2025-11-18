"use client";

import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";
import { useSnackbar } from "@/contexts/snackbar-context";
import { useRegisterStep1 } from "./use-register-step-1";

/**
 * Submit Step 1 Handler Hook
 * Step 1 form submit logic'ini yönetir
 */
export const useSubmitStep1 = (
  setUserId: (id: number) => void,
  nextStep: () => void
) => {
  const { values } = useForm();
  const { showSnackbar } = useSnackbar();
  const { submitCredential } = useRegisterStep1();

  const handleSubmit = useCallback(async () => {
    if (!values?.loginCredentials) return;

    // Backend: RegisterCredentialDto (email, password, passwordControl)
    const payload = {
      email: values.loginCredentials.email || "",
      password: values.loginCredentials.password || "",
      passwordControl: values.loginCredentials.confirmPassword || "",
    };

    const response = await submitCredential(payload);
    if (response?.data?.id) {
      setUserId(response.data.id);
      // Email'i personalInfo'ya da kaydet (Step 2'de email backend'e gönderiliyor)
      if (values.loginCredentials.email && values.personalInfo) {
        values.personalInfo.email = values.loginCredentials.email;
      }
      showSnackbar("Giriş bilgileri kaydedildi", "success");
      nextStep();
    }
  }, [values, submitCredential, showSnackbar, nextStep, setUserId]);

  return { handleSubmitStep1: handleSubmit };
};
