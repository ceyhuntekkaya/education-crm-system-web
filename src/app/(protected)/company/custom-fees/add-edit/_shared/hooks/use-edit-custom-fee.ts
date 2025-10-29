"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { CustomFeeCreateDto, CustomFeeDto, ApiResponseDto } from "@/types";

interface UseEditCustomFeeProps {
  customFeeId: number;
  refetch?: () => void;
}

/**
 * Custom fee güncelleme hook'u
 */
export const useEditCustomFee = ({
  customFeeId,
  refetch,
}: UseEditCustomFeeProps) => {
  const {
    mutate: putCustomFee,
    loading: isLoading,
    error,
  } = usePut<ApiResponseDto<CustomFeeDto>, CustomFeeCreateDto>(
    API_ENDPOINTS.PRICING.CUSTOM_FEE_UPDATE(customFeeId),
    {
      onSuccess: (data) => {
        console.log("✅ Ek ücret başarıyla güncellendi:", data);
        refetch?.();
      },
      onError: (error) => {
        console.error("❌ Ek ücret güncellenirken hata:", error);
      },
    }
  );

  return {
    putCustomFee,
    isLoading,
    error,
  };
};
