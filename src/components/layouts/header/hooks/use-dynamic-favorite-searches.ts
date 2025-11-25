"use client";

import { useData } from "@/contexts";

/**
 * Hook to get favorite search lists from global data context
 * Data is fetched and managed by DataProvider
 */
export const useDynamicFavoriteSearches = () => {
  const {
    favoriteSearchMenuLinks,
    favoriteSearchesLoading: loading,
    favoriteSearchesError: error,
    refetchFavoriteSearches: refetch,
  } = useData();

  return {
    favoriteSearchMenuLinks,
    loading,
    error,
    refetch,
  };
};
