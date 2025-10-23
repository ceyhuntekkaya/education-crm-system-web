"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { SchoolCreateDto, SchoolDto } from "@/types";

/**
 * School güncelleme hook'u
 */
export const useEditSchool = (schoolId: number) => {
  const {
    mutate: putSchool,
    loading: isLoading,
    error,
  } = usePut<SchoolDto, SchoolCreateDto>(
    () => API_ENDPOINTS.INSTITUTIONS.SCHOOL_BY_ID(schoolId),
    {
      onSuccess: (data) => {
        console.log("✅ School başarıyla güncellendi:", data);
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
