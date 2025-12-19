"use client";

import { usePost } from "@/hooks/api";
import { RegisterVerificationDto, UserDto, ApiResponseDto } from "@/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

/**
 * Register Step 7: Final Verification Hook
 * Final doğrulama işlemini yapar
 */
export const useRegisterStep7 = () => {
  const {
    mutate: submitVerification,
    loading,
    error,
  } = usePost<ApiResponseDto<UserDto>, RegisterVerificationDto>(
    API_ENDPOINTS.REGISTER.STEP_7_VERIFICATION,
    {
      onSuccess: (data) => {
        // console.log("[Register Step 7] Final verification completed:", data);
      },
      onError: (errorMsg) => {
        console.error("[Register Step 7] Error:", errorMsg);
      },
    }
  );

  return {
    submitVerification,
    isLoading: loading,
    error,
  };
};

