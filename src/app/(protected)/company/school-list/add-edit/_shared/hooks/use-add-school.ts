"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
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
  } = usePost<SchoolDto, SchoolCreateDto>(
    API_ENDPOINTS.INSTITUTIONS.SCHOOL_CREATE,
    {
      onSuccess: (res) => {
        // executeMutation unwraps { success, data } -> res is SchoolDto directly
        if (res) {
          updateUserSchools(res, "add");
        }
      },
      onError: (error) => {
        // console.log("❌ onError alanı -> School eklenirken hata:", error);
      },
    },
  );

  return {
    postSchool,
    isLoading,
    error,
  };
};
