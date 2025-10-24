"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { InstitutionTypeSummaryDto, ApiResponseDto } from "@/types";
import { useMemo } from "react";

interface UseInstitutionTypesReturn {
  institutionTypes: InstitutionTypeSummaryDto[];
  institutionTypeOptions: { value: string; label: string }[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Institution types listesi getiren hook
 * @returns Institution types verileri ve yönetim fonksiyonları
 */
export const useInstitutionTypes = (): UseInstitutionTypesReturn => {
  const {
    data: response,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<InstitutionTypeSummaryDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.INSTITUTION_TYPE_SUMMARIES
  );

  const institutionTypes = useMemo(
    () => response?.data || [],
    [response?.data]
  );

  // Institution type dropdown için options hazırla
  const institutionTypeOptions = useMemo(
    () => [
      { value: "", label: "Kurum tipi seçiniz..." }, // Boş ilk seçenek
      ...institutionTypes.map((type) => ({
        value: type.id?.toString() || "",
        label: type.displayName || type.name || "",
      })),
    ],
    [institutionTypes]
  );

  return {
    institutionTypes,
    institutionTypeOptions,
    isLoading,
    error,
    refetch,
  };
};
