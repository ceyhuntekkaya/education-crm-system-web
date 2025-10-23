"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { SchoolCreateDto, SchoolDto } from "@/types";

/**
 * School ekleme hook'u
 */
export const useAddSchool = () => {
  const {
    mutate: postSchool,
    loading: isLoading,
    error,
  } = usePost<SchoolDto, SchoolCreateDto>(
    API_ENDPOINTS.INSTITUTIONS.SCHOOL_CREATE,
    {
      onSuccess: (data) => {
        console.log("✅ onSuccess alanı -> School başarıyla eklendi:", data);
      },
      onError: (error) => {
        console.log("❌ onError alanı -> School eklenirken hata:", error);
      },
    }
  );

  return {
    postSchool,
    isLoading,
    error,
  };
};
