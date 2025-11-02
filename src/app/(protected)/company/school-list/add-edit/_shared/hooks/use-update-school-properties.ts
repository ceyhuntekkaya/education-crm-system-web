"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS, ApiResponse } from "@/lib";

/**
 * School property güncelleme hook'u
 * @param schoolId - Okul ID'si
 * @param refetchProperties - Property'leri yeniden yüklemek için callback
 */
export const useUpdateSchoolProperties = (
  schoolId: number,
  refetchProperties?: () => void
) => {
  const {
    mutate: updateProperties,
    loading: isLoading,
    error,
  } = usePost<ApiResponse<any>, number[]>(
    API_ENDPOINTS.INSTITUTIONS.SCHOOL_PROPERTY_UPDATE(schoolId),
    {
      onSuccess: (res) => {
        console.log("✅ School properties başarıyla güncellendi:", res);
        refetchProperties?.();
      },
      onError: (error) => {
        console.error("❌ School properties güncellenirken hata:", error);
      },
    }
  );

  return {
    updateProperties,
    isLoading,
    error,
  };
};
