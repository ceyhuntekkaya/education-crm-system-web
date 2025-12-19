"use client";

import { usePost } from "@/hooks/api";
import { RegisterConfirmDto, ApiResponseDto } from "@/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

/**
 * User Register Step 3: Confirm Hook
 * Doğrulama kodunu kontrol eder
 */
export const useUserRegisterStep3 = () => {
  const {
    mutate: submitConfirm,
    loading,
    error,
  } = usePost<ApiResponseDto<void>, RegisterConfirmDto>(
    API_ENDPOINTS.REGISTER.STEP_3_CONFIRM,
    {
      onSuccess: (data) => {
        // console.log("[User Register Step 3] Verification confirmed:", data);
      },
      onError: (errorMsg) => {
        console.error("[User Register Step 3] Error:", errorMsg);
      },
    }
  );

  return {
    submitConfirm,
    isLoading: loading,
    error,
  };
};
