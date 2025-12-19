"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS, ApiResponse } from "@/lib";
import { SchoolCreateDto, SchoolDto } from "@/types";
import { useAuth } from "@/contexts";

/**
 * School ekleme hook'u
 */
export const useAddSchool = () => {
  const { updateUserSchools } = useAuth();

  const {
    mutate: postSchool,
    loading: isLoading,
    error,
  } = usePost<ApiResponse<SchoolDto>, SchoolCreateDto>(
    API_ENDPOINTS.INSTITUTIONS.SCHOOL_CREATE,
    {
      onSuccess: (res) => {
        // console.log("✅ onSuccess alanı -> School başarıyla eklendi:", res);
        if ("data" in res && res.data) {
          updateUserSchools(res.data, "add");
        }
      },
      onError: (error) => {
        // console.log("❌ onError alanı -> School eklenirken hata:", error);
      },
    }
  );

  return {
    postSchool,
    isLoading,
    error,
  };
};
