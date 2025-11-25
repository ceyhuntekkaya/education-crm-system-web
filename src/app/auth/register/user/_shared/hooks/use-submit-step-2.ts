"use client";

import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";
import { useSnackbar } from "@/contexts/snackbar-context";
import { useAuth } from "@/contexts/auth-context";
import { useUserRegisterStep2 } from "./use-user-register-step-2";

/**
 * User Submit Step 2 Handler Hook
 */
export const useSubmitStep2 = (
  userId: number | null,
  setUserId: (id: number) => void,
  nextStep: () => void
) => {
  const { values } = useForm();
  const { showSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { submitIdentity } = useUserRegisterStep2();

  const handleSubmit = useCallback(async () => {
    const authUserId = user?.id;
    const effectiveUserId = userId || authUserId;

    if (!effectiveUserId || !values?.personalInfo) {
      showSnackbar("Kullanıcı bilgisi bulunamadı", "error");
      return;
    }

    const payload = {
      userId: effectiveUserId,
      firstName: values.personalInfo.firstName || "",
      lastName: values.personalInfo.lastName || "",
      phone: values.personalInfo.phone || "",
    };

    const response = await submitIdentity(payload);

    if (response?.success) {
      if (!userId && effectiveUserId) {
        setUserId(effectiveUserId);
      }
      showSnackbar("Kişisel bilgiler kaydedildi", "success");
      nextStep();
    } else {
      showSnackbar("Kişisel bilgiler kaydedilemedi", "error");
    }
  }, [userId, values, submitIdentity, showSnackbar, nextStep, setUserId, user]);

  return { handleSubmitStep2: handleSubmit };
};
