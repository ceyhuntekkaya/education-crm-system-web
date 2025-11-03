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
 *
 * @param {number} customFeeId - Güncellenecek custom fee ID'si
 * @param {Function} refetch - Güncelleme sonrası veriyi yeniden çekme fonksiyonu
 *
 * @returns {Object}
 * - putCustomFee: Custom fee güncelleme fonksiyonu
 * - isLoading: Form submit loading durumu (formLoading olarak kullanılır)
 * - error: Hata durumu
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
    isLoading, // Bu form submit loading'i olarak kullanılır
    error,
  };
};
