"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { CustomFeeCreateDto, CustomFeeDto, ApiResponseDto } from "@/types";

/**
 * Custom fee ekleme hook'u
 */
export const useAddCustomFee = () => {
  const {
    mutate: postCustomFee,
    loading: isLoading,
    error,
  } = usePost<ApiResponseDto<CustomFeeDto>, CustomFeeCreateDto>(
    API_ENDPOINTS.PRICING.CUSTOM_FEE_CREATE,
    {
      onSuccess: (data) => {
        console.log("✅ Ek ücret başarıyla eklendi:", data);
      },
      onError: (error) => {
        console.error("❌ Ek ücret eklenirken hata:", error);
      },
    }
  );

  return {
    postCustomFee,
    isLoading,
    error,
  };
};
