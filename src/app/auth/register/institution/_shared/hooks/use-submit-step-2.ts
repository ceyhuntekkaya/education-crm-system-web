"use client";

import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";
import { useSnackbar } from "@/contexts/snackbar-context";
import { useAuth } from "@/contexts/auth-context";
import { useRegisterStep2 } from "./use-register-step-2";

/**
 * Submit Step 2 Handler Hook
 * Step 2 form submit logic'ini yönetir
 */
export const useSubmitStep2 = (
  userId: number | null,
  setUserId: (id: number) => void,
  nextStep: () => void
) => {
  const { values } = useForm();
  const { showSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { submitIdentity } = useRegisterStep2();

  const handleSubmit = useCallback(async () => {
    console.log("🚀 handleSubmitStep2 çağrıldı:", {
      userId,
      personalInfo: values?.personalInfo,
    });

    // userId yoksa auth context'ten user'ın id'sini kullan
    const authUserId = user?.id;
    const effectiveUserId = userId || authUserId;

    if (!effectiveUserId || !values?.personalInfo) {
      console.error("❌ Step 2 submit edilemedi:", {
        userId,
        authUserId,
        effectiveUserId,
        hasPersonalInfo: !!values?.personalInfo,
      });
      showSnackbar("Kullanıcı bilgisi bulunamadı", "error");
      return;
    }

    console.log("📤 Step 2 API isteği gönderiliyor:", {
      userId: effectiveUserId,
      firstName: values.personalInfo.firstName,
      lastName: values.personalInfo.lastName,
      phone: values.personalInfo.phone,
    });

    // Backend: RegisterIdentityDto (userId, firstName, lastName, phone)
    const payload = {
      userId: effectiveUserId,
      firstName: values.personalInfo.firstName || "",
      lastName: values.personalInfo.lastName || "",
      phone: values.personalInfo.phone || "",
    };

    const response = await submitIdentity(payload);
    console.log("📥 Step 2 API response:", response);

    if (response?.success) {
      // userId'yi set et (eğer yoksa)
      if (!userId && effectiveUserId) {
        setUserId(effectiveUserId);
      }
      showSnackbar("Kişisel bilgiler kaydedildi", "success");
      nextStep();
    } else {
      console.error("❌ Step 2 başarısız:", response);
      showSnackbar("Kişisel bilgiler kaydedilemedi", "error");
    }
  }, [userId, values, submitIdentity, showSnackbar, nextStep, setUserId, user]);

  return { handleSubmitStep2: handleSubmit };
};
