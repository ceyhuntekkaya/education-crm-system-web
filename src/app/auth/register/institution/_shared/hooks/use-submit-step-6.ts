"use client";

import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";
import { useSnackbar } from "@/contexts/snackbar-context";
import { useAuth } from "@/contexts/auth-context";
import { useRegisterStep6 } from "./use-register-step-6";

/**
 * Submit Step 6 Handler Hook
 * Step 6 form submit logic'ini yönetir (Payment)
 */
export const useSubmitStep6 = (
  userId: number | null,
  setUserId: (id: number) => void,
  nextStep: () => void,
) => {
  const { values } = useForm();
  const { showSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { submitPayment } = useRegisterStep6();

  const handleSubmit = useCallback(async () => {
    // console.log("🚀 handleSubmitStep6 çağrıldı:", {
    //   userId,
    //   packageSelection: values?.packageSelection,
    // });

    // userId yoksa auth context'ten user'ın id'sini kullan
    const authUserId = user?.id;
    const effectiveUserId = userId || authUserId;

    if (!effectiveUserId || !values?.packageSelection?.selectedPlanId) {
      console.error("❌ Step 6 submit edilemedi:", {
        userId,
        authUserId,
        effectiveUserId,
        hasPackageSelection: !!values?.packageSelection?.selectedPlanId,
      });
      showSnackbar("Ödeme bilgileri eksik", "error");
      return;
    }

    // console.log("📤 Step 6 API isteği gönderiliyor:", {
    //   userId: effectiveUserId,
    //   subscriptionId: values.packageSelection.selectedPlanId,
    // });

    // Backend: RegisterPaymentDto (userId, subscriptionId)
    const payload = {
      userId: effectiveUserId,
      subscriptionId: parseInt(values.packageSelection.selectedPlanId),
    };

    const response = await submitPayment(payload);
    // console.log("📥 Step 6 API response:", response);

    if (response !== null) {
      // userId'yi set et (eğer yoksa)
      if (!userId && effectiveUserId) {
        setUserId(effectiveUserId);
      }
      showSnackbar("Ödeme bilgileri kaydedildi", "success");
      nextStep();
    } else {
      console.error("❌ Step 6 başarısız:", response);
      showSnackbar("Ödeme bilgileri kaydedilemedi", "error");
    }
  }, [userId, values, submitPayment, showSnackbar, nextStep, setUserId, user]);

  return { handleSubmitStep6: handleSubmit };
};
