"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
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
  } = usePut<SchoolDto, SchoolCreateDto>(
    () => API_ENDPOINTS.INSTITUTIONS.SCHOOL_BY_ID(schoolId),
    {
      onSuccess: (res) => {
        // executeMutation unwraps { success, data } -> res is SchoolDto directly
        if (res) {
          updateUserSchools(res, "edit");
          refetchSchool?.();
        }
      },
      onError: (error) => {
        console.error("❌ School güncellenirken hata:", error);
      },
    },
  );

  return {
    putSchool,
    isLoading,
    error,
  };
};
