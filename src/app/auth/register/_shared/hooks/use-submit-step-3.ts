"use client";

import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";
import { useSnackbar } from "@/contexts/snackbar-context";
import { useAuth } from "@/contexts/auth-context";
import { useRegisterStep3 } from "./use-register-step-3";

/**
 * Submit Step 3 Handler Hook
 * Step 3 form submit logic'ini yönetir (Verification)
 */
export const useSubmitStep3 = (
  userId: number | null,
  setUserId: (id: number) => void,
  nextStep: () => void,
  fullCode: string
) => {
  const { values } = useForm();
  const { showSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { submitConfirm } = useRegisterStep3();

  const handleSubmit = useCallback(async () => {
    console.log("🚀 handleSubmitStep3 çağrıldı:", {
      userId,
      fullCode,
      verificationCode: values?.verificationCode,
    });

    // userId yoksa auth context'ten user'ın id'sini kullan
    const authUserId = user?.id;
    const effectiveUserId = userId || authUserId;

    // Verification code'u farklı kaynaklardan al
    let code = fullCode;

    // fullCode yoksa verificationCode objesinden digit1-4 değerlerini al
    if (!code || code.length !== 4) {
      const verificationObj = values?.verificationCode || {};
      code = [
        verificationObj.digit1,
        verificationObj.digit2,
        verificationObj.digit3,
        verificationObj.digit4,
      ]
        .filter(Boolean)
        .join("");

      // Hala yoksa code1-4 değerlerini al
      if (!code || code.length !== 4) {
        code = [
          verificationObj.code1,
          verificationObj.code2,
          verificationObj.code3,
          verificationObj.code4,
        ]
          .filter(Boolean)
          .join("");
      }
    }

    if (!effectiveUserId || !code || code.length !== 4) {
      console.error("❌ Step 3 submit edilemedi:", {
        userId,
        authUserId,
        effectiveUserId,
        fullCode,
        code,
        codeLength: code?.length,
      });
      showSnackbar("Doğrulama kodu eksik veya hatalı", "error");
      return;
    }

    console.log("📤 Step 3 API isteği gönderiliyor:", {
      userId: effectiveUserId,
      code,
    });

    // Backend: RegisterConfirmDto (userId, code)
    const payload = {
      userId: effectiveUserId,
      code,
    };

    const response = await submitConfirm(payload);
    console.log("📥 Step 3 API response:", response);

    if (response?.success) {
      // userId'yi set et (eğer yoksa)
      if (!userId && effectiveUserId) {
        setUserId(effectiveUserId);
      }
      showSnackbar("Doğrulama başarılı", "success");
      nextStep();
    } else {
      console.error("❌ Step 3 başarısız:", response);
      showSnackbar("Doğrulama başarısız", "error");
    }
  }, [
    userId,
    fullCode,
    values,
    submitConfirm,
    showSnackbar,
    nextStep,
    setUserId,
    user,
  ]);

  return { handleSubmitStep3: handleSubmit };
};
