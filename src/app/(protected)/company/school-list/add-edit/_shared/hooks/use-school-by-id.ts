"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { SchoolDto, ApiResponseDto } from "@/types";

interface UseSchoolByIdReturn {
  school: SchoolDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir school verisi getiren hook
 * @param id - School ID'si
 * @returns School verileri ve yönetim fonksiyonları
 */
export const useSchoolById = (id: number | null): UseSchoolByIdReturn => {
  const {
    data: schoolResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<SchoolDto>>(
    id ? API_ENDPOINTS.INSTITUTIONS.SCHOOL_BY_ID(id) : null
  );

  return {
    school: schoolResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
