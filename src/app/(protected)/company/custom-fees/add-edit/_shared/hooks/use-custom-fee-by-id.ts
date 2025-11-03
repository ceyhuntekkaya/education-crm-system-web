"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, CustomFeeDto } from "@/types";

interface UseCustomFeeByIdReturn {
  customFee: CustomFeeDto | null;
  customFeeLoading: boolean; // Detay çekme loading'i (dataLoading olarak kullanılır)
  customFeeError: string | null;
  refetchCustomFee: () => void;
}

/**
 * ID'ye göre custom fee detayını getiren hook
 * 
 * @param {number | string | null} id - Custom fee ID
 * 
 * @returns {Object}
 * - customFee: Custom fee verisi
 * - customFeeLoading: Detay çekme loading durumu (dataLoading olarak kullanılır)
 * - customFeeError: Hata durumu
 * - refetchCustomFee: Veriyi yeniden çekme fonksiyonu
 */
export const useCustomFeeById = (
  id: number | string | null
): UseCustomFeeByIdReturn => {
  const {
    data: customFeeResponse,
    loading: customFeeLoading,
    error: customFeeError,
    refetch: refetchCustomFee,
  } = useGet<ApiResponseDto<CustomFeeDto>>(
    id && id !== "new" ? API_ENDPOINTS.PRICING.CUSTOM_FEE_BY_ID(id) : null
  );

  return {
    customFee: customFeeResponse?.data || null,
    customFeeLoading, // Bu detay çekme loading'i olarak kullanılır (dataLoading)
    customFeeError,
    refetchCustomFee,
  };
};
