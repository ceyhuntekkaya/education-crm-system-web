"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, PostDto } from "@/types";

interface UseSchoolPostsReturn {
  schoolPosts: PostDto[];
  postsLoading: boolean;
  postsError: string | null;
  refetchPosts: () => void;
}

/**
 * Seçili okul için post verilerini yöneten hook
 * @param schoolId - Okul ID'si
 * @returns Post verileri ve yönetim fonksiyonları
 */
export const useSchoolPosts = (
  schoolId: number | null
): UseSchoolPostsReturn => {
  const {
    data: schoolPostResponse,
    loading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useGet<ApiResponseDto<PostDto[]>>(
    schoolId ? API_ENDPOINTS.CONTENT.POSTS_BY_SCHOOL(schoolId) : null
  );

  return {
    schoolPosts: schoolPostResponse?.data ? schoolPostResponse.data : [],
    postsLoading,
    postsError,
    refetchPosts,
  };
};
