"use client";

import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";
import { useSnackbar } from "@/contexts/snackbar-context";
import { useUserRegisterStep1 } from "./use-user-register-step-1";

/**
 * User Submit Step 1 Handler Hook
 */
export const useSubmitStep1 = (
  setUserId: (id: number) => void,
  nextStep: () => void
) => {
  const { values } = useForm();
  const { showSnackbar } = useSnackbar();
  const { submitCredential } = useUserRegisterStep1();

  const handleSubmit = useCallback(async () => {
    if (!values?.loginCredentials) return;

    const payload = {
      email: values.loginCredentials.email || "",
      password: values.loginCredentials.password || "",
      passwordControl: values.loginCredentials.confirmPassword || "",
    };

    const response = await submitCredential(payload);
    if (response?.data?.id) {
      setUserId(response.data.id);
      if (values.loginCredentials.email && values.personalInfo) {
        values.personalInfo.email = values.loginCredentials.email;
      }
      showSnackbar("Giriş bilgileri kaydedildi", "success");
      nextStep();
    }
  }, [values, submitCredential, showSnackbar, nextStep, setUserId]);

  return { handleSubmitStep1: handleSubmit };
};
