"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { CustomFeeCreateDto, CustomFeeDto, ApiResponseDto } from "@/types";

/**
 * Custom fee ekleme hook'u
 *
 * @returns {Object}
 * - postCustomFee: Yeni custom fee ekleme fonksiyonu
 * - isLoading: Form submit loading durumu (formLoading olarak kullanılır)
 * - error: Hata durumu
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
    isLoading, // Bu form submit loading'i olarak kullanılır
    error,
  };
};
