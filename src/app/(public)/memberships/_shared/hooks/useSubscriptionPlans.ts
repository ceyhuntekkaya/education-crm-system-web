"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, SubscriptionPlanDto } from "@/types";

interface UseSubscriptionPlansReturn {
  subscriptionPlans: SubscriptionPlanDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Subscription planları için API hook'u
 */
export const useSubscriptionPlans = (): UseSubscriptionPlansReturn => {
  const {
    data: subscriptionPlansResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<SubscriptionPlanDto[]>>(
    API_ENDPOINTS.SUBSCRIPTIONS.PLANS
  );

  return {
    subscriptionPlans: Array.isArray(subscriptionPlansResponse?.data)
      ? subscriptionPlansResponse.data
      : [],
    loading,
    error,
    refetch,
  };
};
