"use client";

import { usePost } from "@/hooks/api";
import { RegisterCredentialDto, UserDto, ApiResponseDto } from "@/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

/**
 * User Register Step 1: Credential Hook
 * Email ve şifre bilgilerini gönderir
 */
export const useUserRegisterStep1 = () => {
  const {
    mutate: submitCredential,
    loading,
    error,
  } = usePost<ApiResponseDto<UserDto>, RegisterCredentialDto>(
    API_ENDPOINTS.REGISTER.STEP_1_CREDENTIAL,
    {
      onSuccess: (data) => {
        console.log("[User Register Step 1] Credential saved:", data);
      },
      onError: (errorMsg) => {
        console.error("[User Register Step 1] Error:", errorMsg);
      },
    }
  );

  return {
    submitCredential,
    isLoading: loading,
    error,
  };
};
