"use client";

import { useCallback } from "react";
import { useSnackbar } from "@/contexts/snackbar-context";
import { useRegisterStep7 } from "./use-register-step-7";

/**
 * Submit Step 7 Handler Hook
 * Step 7 form submit logic'ini yönetir (Final Verification)
 */
export const useSubmitStep7 = (userId: number | null) => {
  const { showSnackbar } = useSnackbar();
  const { submitVerification } = useRegisterStep7();

  // Internal submit function with return value
  const handleSubmitWithResponse = useCallback(async () => {
    if (!userId) return null;

    // Backend: RegisterVerificationDto (userId)
    const payload = {
      userId,
    };

    const response = await submitVerification(payload);
    if (response?.success) {
      showSnackbar("Kayıt işlemi başarıyla tamamlandı!", "success");
      // Step 7 son adım, success page gösterilecek (nextStep çağrılmaz)
    }
    return response || null;
  }, [userId, submitVerification, showSnackbar]);

  // Void wrapper for submitStep7
  const handleSubmit = useCallback(async () => {
    await handleSubmitWithResponse();
  }, [handleSubmitWithResponse]);

  return {
    handleSubmitStep7: handleSubmit,
    handleSubmitStep7WithResponse: handleSubmitWithResponse,
  };
};
