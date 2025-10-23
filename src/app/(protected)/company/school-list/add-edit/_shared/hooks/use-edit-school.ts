"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS, ApiResponse } from "@/lib";
import { SchoolCreateDto, SchoolDto } from "@/types";
import { useAuth } from "@/contexts";

/**
 * School güncelleme hook'u
 */
export const useEditSchool = (schoolId: number, refetchSchool?: () => void) => {
  const { updateUserSchools } = useAuth();

  const {
    mutate: putSchool,
    loading: isLoading,
    error,
  } = usePut<ApiResponse<SchoolDto>, SchoolCreateDto>(
    () => API_ENDPOINTS.INSTITUTIONS.SCHOOL_BY_ID(schoolId),
    {
      onSuccess: (res) => {
        console.log("✅ School başarıyla güncellendi:", res);
        if ("data" in res && res.data) {
          updateUserSchools(res.data, "edit");
          refetchSchool?.();
        }
      },
      onError: (error) => {
        console.error("❌ School güncellenirken hata:", error);
      },
    }
  );

  return {
    putSchool,
    isLoading,
    error,
  };
};
