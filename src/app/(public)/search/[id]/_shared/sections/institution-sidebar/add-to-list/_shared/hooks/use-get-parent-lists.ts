"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, ParentSchoolListResponse } from "@/types";

/**
 * Hook to fetch parent school lists
 */
export const useGetParentLists = () => {
  const {
    data: response,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<ParentSchoolListResponse[]>>(
    API_ENDPOINTS.PARENT_SCHOOL_LISTS.GET_LISTS
  );

  return {
    parentLists: response?.data || [],
    loading,
    error,
    refetch,
  };
};

