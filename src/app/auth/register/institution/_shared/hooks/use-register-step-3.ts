"use client";

import { usePost } from "@/hooks/api";
import { RegisterConfirmDto, UserDto, ApiResponseDto } from "@/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

/**
 * Register Step 3: Confirm Hook
 * Doğrulama kodunu kontrol eder
 */
export const useRegisterStep3 = () => {
  const {
    mutate: submitConfirm,
    loading,
    error,
  } = usePost<ApiResponseDto<UserDto>, RegisterConfirmDto>(
    API_ENDPOINTS.REGISTER.STEP_3_CONFIRM,
    {
      onSuccess: (data) => {
        // console.log("[Register Step 3] Verification confirmed:", data);
      },
      onError: (errorMsg) => {
        console.error("[Register Step 3] Error:", errorMsg);
      },
    }
  );

  return {
    submitConfirm,
    isLoading: loading,
    error,
  };
};

