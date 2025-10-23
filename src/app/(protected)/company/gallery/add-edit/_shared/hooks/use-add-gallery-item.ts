"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { GalleryItemCreateDto, GalleryItemDto, ApiResponseDto } from "@/types";

/**
 * Gallery item ekleme hook'u
 */
export const useAddGalleryItem = () => {
  const {
    mutate: postGalleryItem,
    loading: isLoading,
    error,
  } = usePost<ApiResponseDto<GalleryItemDto>, GalleryItemCreateDto>(
    API_ENDPOINTS.CONTENT.GALLERY_ITEM_CREATE,
    {
      onSuccess: (data) => {
        console.log(
          "✅ onSuccess alanı -> Gallery item başarıyla eklendi:",
          data
        );
      },
      onError: (error) => {
        console.log("❌ onError alanı -> Gallery item eklenirken hata:", error);
      },
    }
  );

  // ApiResponseDto'yu unwrap et
  const wrappedPostGalleryItem = async (
    data: GalleryItemCreateDto
  ): Promise<GalleryItemDto | null> => {
    const response = await postGalleryItem(data);
    return response?.data || null;
  };

  return {
    postGalleryItem: wrappedPostGalleryItem,
    isLoading,
    error,
  };
};
