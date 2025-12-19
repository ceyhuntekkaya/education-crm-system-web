"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { GalleryUpdateDto, GalleryDto, ApiResponseDto } from "@/types";
import { useGallery } from "../../../_shared/context";

interface UseEditGalleryProps {
  galleryId: number;
  refetch?: () => void;
}

/**
 * Gallery güncelleme hook'u
 */
export const useEditGallery = ({ galleryId, refetch }: UseEditGalleryProps) => {
  const { refetchGalleries } = useGallery();

  const {
    mutate: putGallery,
    loading: isLoading,
    error,
  } = usePut<ApiResponseDto<GalleryDto>, GalleryUpdateDto>(
    () => API_ENDPOINTS.CONTENT.GALLERY_UPDATE(galleryId),
    {
      onSuccess: (data) => {
        // console.log("✅ Gallery başarıyla güncellendi:", data);
        // Liste API'sine tekrar istek at
        refetchGalleries();
        // Refetch varsa çalıştır (gallery detail için)
        if (refetch) {
          refetch();
        }
      },
      onError: (error) => {
        console.error("❌ Gallery güncellenirken hata:", error);
      },
    }
  );

  // ApiResponseDto'yu unwrap et
  const wrappedPutGallery = async (
    data: GalleryUpdateDto
  ): Promise<GalleryDto | null> => {
    const response = await putGallery(data);
    return response?.data || null;
  };

  return {
    putGallery: wrappedPutGallery,
    isLoading,
    error,
  };
};
