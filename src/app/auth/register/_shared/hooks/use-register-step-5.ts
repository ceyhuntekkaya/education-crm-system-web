"use client";

import { usePost } from "@/hooks/api";
import { RegisterSubscriptionDto, UserDto, ApiResponseDto } from "@/types";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

/**
 * Register Step 5: Subscription Hook
 * Subscription plan seçimini gönderir
 */
export const useRegisterStep5 = () => {
  const {
    mutate: submitSubscription,
    loading,
    error,
  } = usePost<ApiResponseDto<UserDto>, RegisterSubscriptionDto>(
    API_ENDPOINTS.REGISTER.STEP_5_SUBSCRIPTION,
    {
      onSuccess: (data) => {
        console.log("[Register Step 5] Subscription selected:", data);
      },
      onError: (errorMsg) => {
        console.error("[Register Step 5] Error:", errorMsg);
      },
    }
  );

  return {
    submitSubscription,
    isLoading: loading,
    error,
  };
};

