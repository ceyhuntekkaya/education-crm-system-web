"use client";

import { usePost } from "@/hooks/api";
import { RegisterPaymentDto, UserDto, ApiResponseDto } from "@/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

/**
 * Register Step 6: Payment Hook
 * Ödeme bilgilerini gönderir
 */
export const useRegisterStep6 = () => {
  const {
    mutate: submitPayment,
    loading,
    error,
  } = usePost<ApiResponseDto<UserDto>, RegisterPaymentDto>(
    API_ENDPOINTS.REGISTER.STEP_6_PAYMENT,
    {
      onSuccess: (data) => {
        // console.log("[Register Step 6] Payment completed:", data);
      },
      onError: (errorMsg) => {
        console.error("[Register Step 6] Error:", errorMsg);
      },
    }
  );

  return {
    submitPayment,
    isLoading: loading,
    error,
  };
};

