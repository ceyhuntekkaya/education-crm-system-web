"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, SchoolDto } from "@/types";

interface UseSchoolDetailProps {
  schoolId: number | null;
}

interface UseSchoolDetailReturn {
  school: SchoolDto | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Seçili okul için detay verilerini yöneten hook
 * @param schoolId - Okul ID'si
 * @returns Okul detay verileri ve yönetim fonksiyonları
 */
export const useSchoolDetail = ({
  schoolId,
}: UseSchoolDetailProps): UseSchoolDetailReturn => {
  const {
    data: schoolResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<SchoolDto>>(
    schoolId ? API_ENDPOINTS.INSTITUTIONS.SCHOOL_DETAIL(schoolId) : null
  );

  return {
    school: schoolResponse?.data || null,
    loading,
    error,
    refetch,
  };
};
