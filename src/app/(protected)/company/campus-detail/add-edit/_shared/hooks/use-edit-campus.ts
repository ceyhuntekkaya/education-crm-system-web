"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { CampusCreateDto, CampusDto } from "@/types";

/**
 * Campus güncelleme hook'u
 */
export const useEditCampus = (campusId: number) => {
  const {
    mutate: putCampus,
    loading: isLoading,
    error,
  } = usePut<CampusDto, CampusCreateDto>(
    () => API_ENDPOINTS.INSTITUTIONS.CAMPUS_BY_ID(campusId),
    {
      onSuccess: (data) => {
        console.log("✅ Campus başarıyla güncellendi:", data);
      },
      onError: (error) => {
        console.error("❌ Campus güncellenirken hata:", error);
      },
    }
  );

  return {
    putCampus,
    isLoading,
    error,
  };
};
