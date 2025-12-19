"use client";

import { usePost } from "@/hooks/api";
import { RegisterCampusDto, UserDto, ApiResponseDto } from "@/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

/**
 * Register Step 4: Campus Hook
 * Kampüs bilgilerini gönderir
 */
export const useRegisterStep4 = () => {
  const {
    mutate: submitCampus,
    loading,
    error,
  } = usePost<ApiResponseDto<UserDto>, RegisterCampusDto>(
    API_ENDPOINTS.REGISTER.STEP_4_CAMPUS,
    {
      onSuccess: (data) => {
        // console.log("[Register Step 4] Campus saved:", data);
      },
      onError: (errorMsg) => {
        console.error("[Register Step 4] Error:", errorMsg);
      },
    }
  );

  return {
    submitCampus,
    isLoading: loading,
    error,
  };
};

