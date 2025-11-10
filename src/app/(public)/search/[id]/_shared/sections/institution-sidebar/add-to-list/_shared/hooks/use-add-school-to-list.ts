"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  AddSchoolToListRequest,
  ParentSchoolListItemResponse,
  ApiResponseDto,
} from "@/types";

interface UseAddSchoolToListOptions {
  onSuccess?: (data: ParentSchoolListItemResponse) => void;
  onError?: (error: string) => void;
}

/**
 * Hook to add a school to a parent list
 */
export const useAddSchoolToList = (options?: UseAddSchoolToListOptions) => {
  const {
    mutate: addSchoolToList,
    loading,
    error,
  } = usePost<ApiResponseDto<ParentSchoolListItemResponse>, AddSchoolToListRequest>(
    API_ENDPOINTS.PARENT_SCHOOL_LISTS.ADD_SCHOOL,
    {
      onSuccess: (response) => {
        console.log("✅ Okul listeye başarıyla eklendi:", response.data);
        if (options?.onSuccess && response.data) {
          options.onSuccess(response.data);
        }
      },
      onError: (err) => {
        console.error("❌ Okul listeye eklenirken hata:", err);
        if (options?.onError) {
          options.onError(err);
        }
      },
    }
  );

  return {
    addSchoolToList,
    loading,
    error,
  };
};

