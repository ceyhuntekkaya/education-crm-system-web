"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { useData } from "@/contexts";
import { AddSchoolToListRequest, ParentSchoolListItemResponse } from "@/types";

interface UseAddSchoolToListOptions {
  onSuccess?: (data: ParentSchoolListItemResponse) => void;
  onError?: (error: string) => void;
}

/**
 * Hook to add a school to a parent list
 */
export const useAddSchoolToList = (options?: UseAddSchoolToListOptions) => {
  const { refetchLists } = useData();

  const {
    mutate: addSchoolToList,
    loading,
    error,
  } = usePost<ParentSchoolListItemResponse, AddSchoolToListRequest>(
    API_ENDPOINTS.PARENT_SCHOOL_LISTS.ADD_SCHOOL,
    {
      onSuccess: (response) => {
        // Listeleri yeniden yükle
        refetchLists();

        if (options?.onSuccess && response) {
          options.onSuccess(response);
        }
      },
      onError: (err) => {
        console.error("❌ Kurum listeye eklenirken hata:", err);
        if (options?.onError) {
          options.onError(err);
        }
      },
    },
  );

  return {
    addSchoolToList,
    loading,
    error,
  };
};
