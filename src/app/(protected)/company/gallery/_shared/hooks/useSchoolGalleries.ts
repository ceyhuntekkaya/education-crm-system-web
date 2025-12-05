"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, GalleryDto } from "@/types";

interface UseSchoolGalleriesReturn {
  schoolGalleries: GalleryDto[];
  galleriesLoading: boolean;
  galleriesError: string | null;
  refetchGalleries: () => void;
}

/**
 * Seçili Kurum için gallery verilerini yöneten hook
 * @param schoolId - Kurum ID'si
 * @returns Gallery verileri ve yönetim fonksiyonları
 */
export const useSchoolGalleries = (
  schoolId: number | null
): UseSchoolGalleriesReturn => {
  const {
    data: schoolGalleryResponse,
    loading: galleriesLoading,
    error: galleriesError,
    refetch: refetchGalleries,
  } = useGet<ApiResponseDto<GalleryDto[]>>(
    schoolId ? API_ENDPOINTS.CONTENT.GALLERIES_BY_SCHOOL(schoolId) : null
  );

  return {
    schoolGalleries: schoolGalleryResponse?.data
      ? schoolGalleryResponse.data
      : [],
    galleriesLoading,
    galleriesError,
    refetchGalleries,
  };
};
