"use client";

import { useData } from "@/contexts";

/**
 * Hook to get parent school lists from global data context
 * Data is fetched and managed by DataProvider
 */
export const useDynamicLists = () => {
  const {
    listMenuLinks,
    listsLoading: loading,
    listsError: error,
    refetchLists: refetch,
  } = useData();

  return {
    listMenuLinks,
    loading,
    error,
    refetch,
  };
};
