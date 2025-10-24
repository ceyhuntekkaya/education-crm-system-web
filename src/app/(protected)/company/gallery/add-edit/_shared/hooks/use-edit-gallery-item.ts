"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { GalleryItemUpdateDto, GalleryItemDto, ApiResponseDto } from "@/types";

interface UseEditGalleryItemProps {
  galleryItemId: number;
  refetch?: () => void;
}

/**
 * Gallery item güncelleme hook'u
 */
export const useEditGalleryItem = ({
  galleryItemId,
  refetch,
}: UseEditGalleryItemProps) => {
  const {
    mutate: putGalleryItem,
    loading: isLoading,
    error,
  } = usePut<ApiResponseDto<GalleryItemDto>, GalleryItemUpdateDto>(
    () => API_ENDPOINTS.CONTENT.GALLERY_ITEM_UPDATE(galleryItemId),
    {
      onSuccess: (data) => {
        console.log("✅ Gallery item başarıyla güncellendi:", data);
        // Refetch varsa çalıştır
        if (refetch) {
          refetch();
        }
      },
      onError: (error) => {
        console.error("❌ Gallery item güncellenirken hata:", error);
      },
    }
  );

  // ApiResponseDto'yu unwrap et
  const wrappedPutGalleryItem = async (
    data: GalleryItemUpdateDto
  ): Promise<GalleryItemDto | null> => {
    const response = await putGalleryItem(data);
    return response?.data || null;
  };

  return {
    putGalleryItem: wrappedPutGalleryItem,
    isLoading,
    error,
  };
};
