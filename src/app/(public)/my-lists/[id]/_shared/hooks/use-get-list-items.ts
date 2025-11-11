"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponseDto,
  SchoolSearchResultDto,
} from "@/types";

/**
 * Hook to fetch parent school list items
 * Fetches all schools for a given list ID
 * API returns school data directly in the format needed for cards
 */
export const useGetListItems = (listId: number | null) => {
  // Build endpoint URL: /parent/school-lists/{listId}/schools
  const url = listId ? API_ENDPOINTS.PARENT_SCHOOL_LISTS.GET_LIST_ITEMS(listId) : null;

  const {
    data: response,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<SchoolSearchResultDto[]>>(url, {
    enabled: !!listId,
  });

  return {
    listItems: response?.data || [],
    loading,
    error,
    refetch,
  };
};

