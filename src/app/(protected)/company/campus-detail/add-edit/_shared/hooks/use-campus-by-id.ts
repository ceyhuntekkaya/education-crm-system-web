"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, CampusDto } from "@/types";
import { campusDtoToFormData } from "../utils";

interface UseCampusByIdReturn {
  campus: any | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre campus verilerini çeken ve form data'ya dönüştüren hook
 */
export const useCampusById = (campusId: number | null): UseCampusByIdReturn => {
  const {
    data: campusResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<CampusDto>>(
    campusId ? API_ENDPOINTS.INSTITUTIONS.CAMPUS_BY_ID(campusId) : null
  );

  const campus = campusResponse?.data
    ? campusDtoToFormData(campusResponse.data)
    : null;

  return {
    campus,
    isLoading: loading,
    error,
    refetch,
  };
};
