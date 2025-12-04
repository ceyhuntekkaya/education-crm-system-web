"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, GalleryDto } from "@/types";

interface UseInstitutionGalleriesProps {
  schoolId: string | number | null;
}

interface UseInstitutionGalleriesReturn {
  galleries: GalleryDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Seçili Kurum için gallery verilerini yöneten hook
 * @param schoolId - Kurum ID'si
 * @returns Gallery verileri ve yönetim fonksiyonları
 */
export const useInstitutionGalleries = ({
  schoolId,
}: UseInstitutionGalleriesProps): UseInstitutionGalleriesReturn => {
  const {
    data: galleriesResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<GalleryDto[]>>(
    schoolId ? API_ENDPOINTS.CONTENT.GALLERIES_BY_SCHOOL(schoolId) : null
  );

  return {
    galleries: galleriesResponse?.data || [],
    loading,
    error,
    refetch,
  };
};
