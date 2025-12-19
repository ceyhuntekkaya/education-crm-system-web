"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { PostUpdateDto, PostDto } from "@/types";
import { useSocialMedia } from "../../../_shared/context";

interface UseEditPostProps {
  postId: number;
  refetch?: () => void;
}

/**
 * Post güncelleme hook'u
 */
export const useEditPost = ({ postId, refetch }: UseEditPostProps) => {
  const { refetchPosts } = useSocialMedia();

  const {
    mutate: putPost,
    loading: isLoading,
    error,
  } = usePut<PostDto, PostUpdateDto>(
    () => API_ENDPOINTS.CONTENT.POST_UPDATE(postId),
    {
      onSuccess: (data) => {
        // console.log("✅ Post başarıyla güncellendi:", data);
        // Liste API'sine tekrar istek at
        refetchPosts();
        // Refetch varsa çalıştır (post detail için)
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
