"use client";

import { usePost } from "@/hooks/api";
import { RegisterIdentityDto, ApiResponseDto } from "@/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

/**
 * User Register Step 2: Identity Hook
 * Kişisel bilgileri gönderir
 */
export const useUserRegisterStep2 = () => {
  const {
    mutate: submitIdentity,
    loading,
    error,
  } = usePost<ApiResponseDto<void>, RegisterIdentityDto>(
    API_ENDPOINTS.REGISTER.STEP_2_IDENTITY,
    {
      onSuccess: (data) => {
        console.log("[User Register Step 2] Identity saved:", data);
      },
      onError: (errorMsg) => {
        console.error("[User Register Step 2] Error:", errorMsg);
      },
    }
  );

  return {
    submitIdentity,
    isLoading: loading,
    error,
  };
};
