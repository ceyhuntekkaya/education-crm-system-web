"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, ParentSchoolListResponse } from "@/types";
import { useMemo, useRef } from "react";

// Module-level cache (shared across all hook instances)
let cachedData: ParentSchoolListResponse[] | null = null;
let isCached = false;

/**
 * Hook to fetch parent school lists
 * Caches result globally to prevent refetching on route changes
 */
export const useParentLists = () => {
  const initializedRef = useRef(false);

  const {
    data: response,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<ParentSchoolListResponse[]>>(
    API_ENDPOINTS.PARENT_SCHOOL_LISTS.GET_LISTS,
    {
      enabled: !isCached, // Don't fetch if already cached
    }
  );

  // Cache the data on first successful fetch
  if (response?.data && !isCached) {
    cachedData = response.data;
    isCached = true;
    initializedRef.current = true;
  }

  // Sort lists: default lists first, then by creation date
  const sortedLists = useMemo(() => {
    // Use cached data if available, otherwise use response data
    const dataToUse = cachedData || response?.data || [];
    
    if (!dataToUse.length) return [];

    return [...dataToUse].sort((a, b) => {
      if (a.isDefault && !b.isDefault) return -1;
      if (!a.isDefault && b.isDefault) return 1;
      
      // Sort by creation date (newest first)
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });
  }, [response?.data]);

  // Filter only active lists
  const activeLists = useMemo(() => {
    return sortedLists.filter((list) => list.status === "ACTIVE");
  }, [sortedLists]);

  return {
    parentLists: activeLists,
    allLists: sortedLists,
    loading: !isCached && loading,
    error,
    refetch: () => {
      // Clear cache and refetch
      cachedData = null;
      isCached = false;
      refetch();
    },
  };
};

