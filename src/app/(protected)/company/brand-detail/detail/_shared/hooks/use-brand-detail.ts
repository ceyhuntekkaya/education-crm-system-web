"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, BrandDto } from "@/types";

interface UseBrandDetailProps {
  brandId: number | null;
}

interface UseBrandDetailReturn {
  brand: BrandDto | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Seçili marka için detay verilerini yöneten hook
 * @param brandId - Marka ID'si
 * @returns Marka detay verileri ve yönetim fonksiyonları
 */
export const useBrandDetail = ({
  brandId,
}: UseBrandDetailProps): UseBrandDetailReturn => {
  const {
    data: brandResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<BrandDto>>(
    brandId ? API_ENDPOINTS.INSTITUTIONS.BRAND_DETAIL(brandId) : null
  );

  return {
    brand: brandResponse?.data || null,
    loading,
    error,
    refetch,
  };
};
