"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, BrandSummaryDto } from "@/types";

interface UseBrandsReturn {
  brands: BrandSummaryDto[];
  brandLoading: boolean;
  brandError: string | null;
  refetchBrands: () => void;
}

/**
 * Tüm markaları getiren hook
 * @returns Marka verileri ve yönetim fonksiyonları
 */
export const useBrands = (): UseBrandsReturn => {
  const {
    data: brandsResponse,
    loading: brandLoading,
    error: brandError,
    refetch: refetchBrands,
  } = useGet<ApiResponseDto<BrandSummaryDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.BRAND_SUMMARIES
  );

  return {
    brands: brandsResponse?.data || [],
    brandLoading,
    brandError,
    refetchBrands,
  };
};
