"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, GalleryDto } from "@/types";

interface UseGalleryByIdReturn {
  gallery: GalleryDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir gallery verisi getiren hook
 * @param id - Gallery ID'si
 * @returns Gallery verisi ve yönetim fonksiyonları
 */
export const useGalleryById = (id: number): UseGalleryByIdReturn => {
  const {
    data: galleryResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<GalleryDto>>(
    id ? API_ENDPOINTS.CONTENT.GALLERY_BY_ID(id) : null
  );

  console.log(galleryResponse?.data);

  return {
    gallery: galleryResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
