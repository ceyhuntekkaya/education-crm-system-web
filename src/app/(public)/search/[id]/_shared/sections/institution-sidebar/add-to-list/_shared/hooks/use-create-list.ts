"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  CreateParentSchoolListRequest,
  ParentSchoolListResponse,
  ApiResponseDto,
} from "@/types";

interface UseCreateListOptions {
  onSuccess?: (data: ParentSchoolListResponse) => void;
  onError?: (error: string) => void;
}

/**
 * Hook to create a new parent school list
 */
export const useCreateList = (options?: UseCreateListOptions) => {
  const {
    mutate: createList,
    loading,
    error,
  } = usePost<
    ApiResponseDto<ParentSchoolListResponse>,
    CreateParentSchoolListRequest
  >(API_ENDPOINTS.PARENT_SCHOOL_LISTS.CREATE_LIST, {
    onSuccess: (response) => {
      console.log("✅ Liste başarıyla oluşturuldu:", response.data);
      if (options?.onSuccess && response.data) {
        options.onSuccess(response.data);
      }
    },
    onError: (err) => {
      console.error("❌ Liste oluşturulurken hata:", err);
      if (options?.onError) {
        options.onError(err);
      }
    },
  });

  return {
    createList,
    loading,
    error,
  };
};

