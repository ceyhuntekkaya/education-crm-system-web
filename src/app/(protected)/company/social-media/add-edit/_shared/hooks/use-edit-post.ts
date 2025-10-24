"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { PostUpdateDto, PostDto } from "@/types";

interface UseEditPostProps {
  postId: number;
  refetch?: () => void;
}

/**
 * Post güncelleme hook'u
 */
export const useEditPost = ({ postId, refetch }: UseEditPostProps) => {
  const {
    mutate: putPost,
    loading: isLoading,
    error,
  } = usePut<PostDto, PostUpdateDto>(
    () => API_ENDPOINTS.CONTENT.POST_UPDATE(postId),
    {
      onSuccess: (data) => {
        console.log("✅ Post başarıyla güncellendi:", data);
        // Refetch varsa çalıştır
        if (refetch) {
          refetch();
        }
      },
      onError: (error) => {
        console.error("❌ Post güncellenirken hata:", error);
      },
    }
  );

  return {
    putPost,
    isLoading,
    error,
  };
};
