"use client";

import { useCallback, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS, ApiResponse } from "@/lib";
import { MutationOptions } from "@/hooks";

/**
 * School property güncelleme hook'u
 * @param defaultSchoolId - Varsayılan Kurum ID'si (edit mode için)
 * @param refetchProperties - Property'leri yeniden yüklemek için callback
 */
export const useUpdateSchoolProperties = (
  defaultSchoolId?: number | null,
  refetchProperties?: () => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * School properties'i günceller
   * @param data - Property ID'lerinin listesi
   * @param mutationOptions - Mutation options (schoolId veya callbacks içerebilir)
   */
  const updateProperties = useCallback(
    async (
      data: number[],
      mutationOptions?: MutationOptions<ApiResponse<any>, number[]> & {
        schoolId?: number;
      }
    ): Promise<ApiResponse<any> | null> => {
      // mutationOptions içinden schoolId çıkar
      const { schoolId, onSuccess, onError, ...restOptions } =
        mutationOptions || {};

      const targetSchoolId = schoolId ?? defaultSchoolId;

      if (!targetSchoolId) {
        const errorMsg =
          "School ID bulunamadı. updateProperties için school ID gerekli.";
        console.error(`❌ ${errorMsg}`);
        onError?.(errorMsg, data);
        return null;
      }

      const endpoint =
        API_ENDPOINTS.INSTITUTIONS.SCHOOL_PROPERTY_UPDATE(targetSchoolId);

      try {
        setIsLoading(true);
        setError(null);

        const response = await apiClient.post<ApiResponse<any>>(endpoint, data);

        // console.log(
        //   "✅ School properties başarıyla güncellendi:",
        //   response.data
        // );

        refetchProperties?.();
        onSuccess?.(response.data, data);

        return response.data;
      } catch (err: any) {
        const errorMessage = err?.message || "Bilinmeyen bir hata oluştu";
        console.error("❌ School properties güncellenirken hata:", err);
        setError(errorMessage);
        onError?.(errorMessage, data);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [defaultSchoolId, refetchProperties]
  );

  return {
    updateProperties,
    isLoading,
    error,
  };
};
