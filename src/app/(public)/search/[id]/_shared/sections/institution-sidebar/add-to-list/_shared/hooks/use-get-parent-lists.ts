"use client";

import { useData } from "@/contexts";

/**
 * Hook to get parent school lists from global data context
 * Data is fetched and managed by DataProvider
 */
export const useGetParentLists = () => {
  const {
    parentLists,
    listsLoading: loading,
    listsError: error,
    refetchLists: refetch,
  } = useData();

  return {
    parentLists,
    loading,
    error,
    refetch,
  };
};
