"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { CampusSummaryDto, ApiResponseDto } from "@/types";
import { useMemo } from "react";

interface UseCampusesByBrandReturn {
  campuses: CampusSummaryDto[];
  campusOptions: { value: string; label: string }[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Brand ID'ye göre campus listesi getiren hook
 * @param brandId - Brand ID'si
 * @returns Campus verileri ve yönetim fonksiyonları
 */
export const useCampusesByBrand = (
  brandId: number | null
): UseCampusesByBrandReturn => {
  const {
    data: response,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<CampusSummaryDto[]>>(
    brandId ? API_ENDPOINTS.INSTITUTIONS.BRAND_CAMPUSES(brandId) : null
  );

  const campuses = useMemo(() => response?.data || [], [response?.data]);

  // Campus dropdown için options hazırla
  const campusOptions = useMemo(
    () => [
      { value: "", label: "Kampüs seçiniz..." }, // Boş ilk seçenek
      ...campuses.map((campus) => ({
        value: campus.id?.toString() || "",
        label: campus.name || "",
      })),
    ],
    [campuses]
  );

  return {
    campuses,
    campusOptions,
    isLoading,
    error,
    refetch,
  };
};
