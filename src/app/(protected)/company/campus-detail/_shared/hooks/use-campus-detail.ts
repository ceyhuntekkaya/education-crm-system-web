"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, CampusDto } from "@/types";

interface UseCampusDetailProps {
  campusId: number | null;
}

interface UseCampusDetailReturn {
  campus: CampusDto | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Seçili kampüs için detay verilerini yöneten hook
 * @param campusId - Kampüs ID'si
 * @returns Kampüs detay verileri ve yönetim fonksiyonları
 */
export const useCampusDetail = ({
  campusId,
}: UseCampusDetailProps): UseCampusDetailReturn => {
  const {
    data: campusResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<CampusDto>>(
    campusId ? API_ENDPOINTS.INSTITUTIONS.CAMPUS_DETAIL(campusId) : null
  );

  return {
    campus: campusResponse?.data || null,
    loading,
    error,
    refetch,
  };
};
