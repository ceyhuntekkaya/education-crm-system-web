"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { SchoolPricingDto, ApiResponseDto } from "@/types";

interface UsePricingByIdReturn {
  pricing: SchoolPricingDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir okul fiyatlandırma verisi getiren hook
 * @param id - Pricing ID'si
 * @returns Pricing verileri ve yönetim fonksiyonları
 */
export const usePricingById = (id: number | null): UsePricingByIdReturn => {
  const {
    data: pricingResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<SchoolPricingDto>>(
    id ? API_ENDPOINTS.PRICING.SCHOOL_PRICING_BY_ID(id) : null
  );

  return {
    pricing: pricingResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
