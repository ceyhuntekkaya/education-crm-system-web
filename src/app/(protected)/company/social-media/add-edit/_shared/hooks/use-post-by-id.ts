"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { PostDto, ApiResponseDto } from "@/types";

interface UsePostByIdReturn {
  post: PostDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir post verisi getiren hook
 * @param id - Post ID'si
 * @returns Post verileri ve yönetim fonksiyonları
 */
export const usePostById = (id: number | null): UsePostByIdReturn => {
  const {
    data: postResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<PostDto>>(
    id ? API_ENDPOINTS.CONTENT.POST_BY_ID(id) : null
  );

  return {
    post: postResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
