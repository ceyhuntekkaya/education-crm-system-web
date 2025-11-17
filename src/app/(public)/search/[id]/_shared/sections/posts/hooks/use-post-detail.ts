"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, PostDto } from "@/types";

interface UsePostDetailProps {
  postId: number | null;
  enabled?: boolean;
}

interface UsePostDetailReturn {
  postDetail: PostDto | null;
  postDetailLoading: boolean;
  postDetailError: string | null;
  refetchPostDetail: () => void;
}

/**
 * Seçili post için detay verilerini yöneten hook
 * @param postId - Post ID'si
 * @param enabled - Hook'un otomatik çalışıp çalışmayacağı (default: true)
 * @returns Post detay verileri ve yönetim fonksiyonları
 */
export const usePostDetail = ({
  postId,
  enabled = true,
}: UsePostDetailProps): UsePostDetailReturn => {
  const {
    data: postDetailResponse,
    loading: postDetailLoading,
    error: postDetailError,
    refetch: refetchPostDetail,
  } = useGet<ApiResponseDto<PostDto>>(
    postId ? API_ENDPOINTS.CONTENT.POST_BY_ID(postId) : null,
    {
      enabled: enabled && postId !== null,
    }
  );

  return {
    postDetail: postDetailResponse?.data || null,
    postDetailLoading,
    postDetailError,
    refetchPostDetail,
  };
};
