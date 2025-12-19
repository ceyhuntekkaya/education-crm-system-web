"use client";

import { usePost } from "@/hooks/api";
import { RegisterIdentityDto, UserDto, ApiResponseDto } from "@/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

/**
 * Register Step 2: Identity Hook
 * Kişisel bilgileri gönderir (userId ile birlikte)
 */
export const useRegisterStep2 = () => {
  const {
    mutate: submitIdentity,
    loading,
    error,
  } = usePost<ApiResponseDto<UserDto>, RegisterIdentityDto>(
    API_ENDPOINTS.REGISTER.STEP_2_IDENTITY,
    {
      onSuccess: (data) => {
        // console.log("[Register Step 2] Identity saved:", data);
      },
      onError: (errorMsg) => {
        console.error("[Register Step 2] Error:", errorMsg);
      },
    }
  );

  return {
    submitIdentity,
    isLoading: loading,
    error,
  };
};

