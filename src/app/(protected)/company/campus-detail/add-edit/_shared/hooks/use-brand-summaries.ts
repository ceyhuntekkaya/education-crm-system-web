"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, BrandSummaryDto } from "@/types";

/**
 * Brand summary listesini autocomplete için uygun formata dönüştürür
 */
const transformBrandData = (data: BrandSummaryDto[] | undefined) =>
  data?.map((brand) => ({
    value: brand.id?.toString() || "",
    label: brand.name || "",
  })) || [];

/**
 * Tüm brand summary'lerini getirir
 */
export function useBrandSummaries() {
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
      loading: brandsLoading,
      error: brandsError,
    },
  };
}
