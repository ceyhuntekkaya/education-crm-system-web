"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { GalleryCreateDto, GalleryDto, ApiResponseDto } from "@/types";
import { useRouter } from "next/navigation";

/**
 * Gallery ekleme hook'u
 */
export const useAddGallery = () => {
  const router = useRouter();

  const {
    mutate: postGallery,
    loading: isLoading,
    error,
  } = usePost<ApiResponseDto<GalleryDto>, GalleryCreateDto>(
    API_ENDPOINTS.CONTENT.GALLERY_CREATE,
    {
      onSuccess: (data) => {
        console.log("✅ onSuccess alanı -> Gallery başarıyla eklendi:", data);
        // Gallery sayfasına yönlendir
        router.push("/company/gallery");
      },
      onError: (error) => {
        console.log("❌ onError alanı -> Gallery eklenirken hata:", error);
      },
    }
  );

  // ApiResponseDto'yu unwrap et
  const wrappedPostGallery = async (
    data: GalleryCreateDto
  ): Promise<GalleryDto | null> => {
    const response = await postGallery(data);
    return response?.data || null;
  };

  return {
    postGallery: wrappedPostGallery,
    isLoading,
    error,
  };
};
