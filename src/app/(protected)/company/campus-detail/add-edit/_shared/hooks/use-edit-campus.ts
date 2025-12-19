"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { CampusCreateDto, CampusDto } from "@/types";

interface UseEditCampusProps {
  campusId: number;
  refetch?: () => void;
}

/**
 * Campus güncelleme hook'u
 */
export const useEditCampus = ({ campusId, refetch }: UseEditCampusProps) => {
  const {
    mutate: putCampus,
    loading: isLoading,
    error,
  } = usePut<CampusDto, CampusCreateDto>(
    () => API_ENDPOINTS.INSTITUTIONS.CAMPUS_BY_ID(campusId),
    {
      onSuccess: (data) => {
        // console.log("✅ Campus başarıyla güncellendi:", data);
        // Refetch varsa çalıştır
        if (refetch) {
          refetch();
        }
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
