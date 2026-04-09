"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { useData } from "@/contexts";
import {
  CreateParentSchoolListRequest,
  ParentSchoolListResponse,
} from "@/types";

interface UseCreateListOptions {
  onSuccess?: (data: ParentSchoolListResponse) => void;
  onError?: (error: string) => void;
}

/**
 * Hook to create a new parent school list
 */
export const useCreateList = (options?: UseCreateListOptions) => {
  const { refetchLists } = useData();

  const {
    mutate: createList,
    loading,
    error,
  } = usePost<ParentSchoolListResponse, CreateParentSchoolListRequest>(
    API_ENDPOINTS.PARENT_SCHOOL_LISTS.CREATE_LIST,
    {
      onSuccess: (response) => {
        // Listeleri yeniden yükle
        refetchLists();

        if (options?.onSuccess && response) {
          options.onSuccess(response);
        }
      },
      onError: (err) => {
        console.error("❌ Liste oluşturulurken hata:", err);
        if (options?.onError) {
          options.onError(err);
        }
      },
    },
  );

  return {
    createList,
    loading,
    error,
  };
};
