"use client";

import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";
import { useSnackbar } from "@/contexts/snackbar-context";
import { useAuth } from "@/contexts/auth-context";
import { useRegisterStep5 } from "./use-register-step-5";

/**
 * Submit Step 5 Handler Hook
 * Step 5 form submit logic'ini yönetir (Package Selection)
 */
export const useSubmitStep5 = (
  userId: number | null,
  setUserId: (id: number) => void,
  nextStep: () => void
) => {
  const { values } = useForm();
  const { showSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { submitSubscription } = useRegisterStep5();

  const handleSubmit = useCallback(async () => {
    // console.log("🚀 handleSubmitStep5 çağrıldı:", {
    //   userId,
    //   packageSelection: values?.packageSelection,
    // });

    // userId yoksa auth context'ten user'ın id'sini kullan
    const authUserId = user?.id;
    const effectiveUserId = userId || authUserId;

    if (!effectiveUserId || !values?.packageSelection?.selectedPlanId) {
      console.error("❌ Step 5 submit edilemedi:", {
        userId,
        authUserId,
        effectiveUserId,
        hasPackageSelection: !!values?.packageSelection?.selectedPlanId,
      });
      showSnackbar("Paket seçimi eksik", "error");
      return;
    }

    // console.log("📤 Step 5 API isteği gönderiliyor:", {
    //   userId: effectiveUserId,
    //   subscriptionId: values.packageSelection.selectedPlanId,
    // });

    // Backend: RegisterSubscriptionDto (userId, subscriptionId)
    const payload = {
      userId: effectiveUserId,
      subscriptionId: parseInt(values.packageSelection.selectedPlanId),
    };

    const response = await submitSubscription(payload);
    // console.log("📥 Step 5 API response:", response);

    if (response?.success) {
      // userId'yi set et (eğer yoksa)
      if (!userId && effectiveUserId) {
        setUserId(effectiveUserId);
      }
      showSnackbar("Paket seçimi kaydedildi", "success");
      nextStep();
    } else {
      console.error("❌ Step 5 başarısız:", response);
      showSnackbar("Paket seçimi kaydedilemedi", "error");
    }
  }, [
    userId,
    values,
    submitSubscription,
    showSnackbar,
    nextStep,
    setUserId,
    user,
  ]);

  return { handleSubmitStep5: handleSubmit };
};
