"use client";

import { useCallback } from "react";
import { useForm } from "@/contexts/form-context";
import { useSnackbar } from "@/contexts/snackbar-context";
import { useAuth } from "@/contexts/auth-context";
import { useRegisterStep4 } from "./use-register-step-4";

/**
 * Submit Step 4 Handler Hook
 * Step 4 form submit logic'ini yönetir (Campus Info)
 */
export const useSubmitStep4 = (
  userId: number | null,
  setUserId: (id: number) => void,
  nextStep: () => void,
) => {
  const { values } = useForm();
  const { showSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { submitCampus } = useRegisterStep4();

  const handleSubmit = useCallback(async () => {
    // console.log("🚀 handleSubmitStep4 çağrıldı:", {
    //   userId,
    //   campusInfo: values?.campusInfo,
    //   personalInfo: values?.personalInfo,
    // });

    // userId yoksa auth context'ten user'ın id'sini kullan
    const authUserId = user?.id;
    const effectiveUserId = userId || authUserId;

    if (!effectiveUserId || !values?.campusInfo) {
      console.error("❌ Step 4 submit edilemedi:", {
        userId,
        authUserId,
        effectiveUserId,
        hasCampusInfo: !!values?.campusInfo,
      });
      showSnackbar("Kampüs bilgileri eksik", "error");
      return;
    }

    // console.log("📤 Step 4 API isteği gönderiliyor:", {
    //   userId: effectiveUserId,
    //   brandId: values.campusInfo.brandId,
    //   campusName: values.campusInfo.campusName,
    //   countryId: values.campusInfo.countryId,
    //   provinceId: values.campusInfo.provinceId,
    //   districtId: values.campusInfo.districtId,
    //   neighborhoodId: values.campusInfo.neighborhoodId,
    // });

    // Backend: RegisterCampusDto - Backend string bekliyor, number göndermiyoruz!
    const payload: any = {
      userId: effectiveUserId,
      brandId: values.campusInfo.brandId || "",
      name: values.campusInfo.campusName || "",
      email: values.personalInfo?.email || "",
      phone: values.personalInfo?.phone || "",
      addressLine1: values.campusInfo.addressLine1 || "",
      addressLine2: values.campusInfo.addressLine2 || "",
      districtId: values.campusInfo.districtId || "",
      postalCode: values.campusInfo.postalCode || "",
      countryId: values.campusInfo.countryId || "",
      provinceId: values.campusInfo.provinceId || "",
      neighborhoodId: values.campusInfo.neighborhoodId || "",
    };

    const response = await submitCampus(payload);
    // console.log("📥 Step 4 API response:", response);

    if (response !== null) {
      // userId'yi set et (eğer yoksa)
      if (!userId && effectiveUserId) {
        setUserId(effectiveUserId);
      }
      showSnackbar("Kampüs bilgileri kaydedildi", "success");
      nextStep();
    } else {
      console.error("❌ Step 4 başarısız:", response);
      showSnackbar("Kampüs bilgileri kaydedilemedi", "error");
    }
  }, [userId, values, submitCampus, showSnackbar, nextStep, setUserId, user]);

  return { handleSubmitStep4: handleSubmit };
};
