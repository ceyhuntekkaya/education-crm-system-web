"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, BrandSummaryDto } from "@/types";

/**
 * API'den gelen brand verilerini select için uygun formata dönüştürür
 */
const transformBrandData = (data: BrandSummaryDto[] | undefined) =>
  data?.map((item) => ({
    value: item.id?.toString() || "",
    label: item.name || "",
    raw: item,
  })) || [];

/**
 * Register formu için brand verilerini yönetir
 */
export function useBrandData() {
  const {
    data: brandsResponse,
    loading: brandsLoading,
    error: brandsError,
  } = useGet<ApiResponseDto<BrandSummaryDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.BRAND_SUMMARIES
  );

  return {
    brands: {
      data: transformBrandData(brandsResponse?.data),
      raw: brandsResponse?.data || [],
      loading: brandsLoading,
      error: brandsError,
    },
  };
}
