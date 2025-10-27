"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, CustomFeeDto } from "@/types";

interface UseCustomFeeByIdProps {
  customFeeId: number | null;
}

interface UseCustomFeeByIdReturn {
  customFee: CustomFeeDto | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre custom fee detayını getiren hook
 * @param props - Custom fee ID içeren props
 * @returns Custom fee detayı ve yönetim fonksiyonları
 */
export const useCustomFeeById = ({
  customFeeId,
}: UseCustomFeeByIdProps): UseCustomFeeByIdReturn => {
  const {
    data: customFeeResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<CustomFeeDto>>(
    customFeeId ? API_ENDPOINTS.PRICING.CUSTOM_FEE_BY_ID(customFeeId) : null
  );

  return {
    customFee: customFeeResponse?.data || null,
    loading,
    error,
    refetch,
  };
};
