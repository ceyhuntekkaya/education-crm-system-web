"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, PostDto } from "@/types";

interface UseInstitutionPostsProps {
  schoolId: string | number | null;
}

interface UseInstitutionPostsReturn {
  posts: PostDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Seçili Kurum için post verilerini yöneten hook
 * @param schoolId - Kurum ID'si
 * @returns Post verileri ve yönetim fonksiyonları
 */
export const useInstitutionPosts = ({
  schoolId,
}: UseInstitutionPostsProps): UseInstitutionPostsReturn => {
  const {
    data: postsResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<PostDto[]>>(
    schoolId ? API_ENDPOINTS.CONTENT.POSTS_BY_SCHOOL(schoolId) : null
  );

  return {
    posts: postsResponse?.data || [],
    loading,
    error,
    refetch,
  };
};
