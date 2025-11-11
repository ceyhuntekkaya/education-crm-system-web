"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponseDto,
  PageParentSchoolListItemResponse,
} from "@/types";

/**
 * Hook to fetch parent school list items
 * Simply fetches all items for a given list ID
 */
export const useGetListItems = (listId: number | null) => {
  // Build endpoint URL: /parent/school-lists/{listId}/schools
  const url = listId ? API_ENDPOINTS.PARENT_SCHOOL_LISTS.GET_LIST_ITEMS(listId) : null;

  const {
    data: response,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<PageParentSchoolListItemResponse>>(url, {
    enabled: !!listId,
  });

  return {
    listItems: response?.data?.content || [],
    loading,
    error,
    refetch,
  };
};

