"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { BrandDto, ApiResponseDto } from "@/types";

interface UseBrandByIdReturn {
  brand: BrandDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir brand verisi getiren hook
 * @param id - Brand ID'si
 * @returns Brand verileri ve yönetim fonksiyonları
 */
export const useBrandById = (id: number | null): UseBrandByIdReturn => {
  const {
    data: brandResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<BrandDto>>(
    id ? API_ENDPOINTS.INSTITUTIONS.BRAND_BY_ID(id) : null
  );

  return {
    brand: brandResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
