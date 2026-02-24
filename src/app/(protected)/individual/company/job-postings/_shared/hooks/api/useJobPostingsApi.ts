"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponsePageJobPostingDto,
  GetJobPostingsParams,
} from "@/types";

// ================== API HOOKS ==================

/**
 * Okula ait iş ilanlarını getirir
 *
 * @param schoolId - Okul ID'si
 * @param params - Sayfalama ve filtreleme parametreleri
 * @returns İlan listesi
 *
 * API Endpoint: GET /hr/job-postings/by-school/{schoolId}
 */
export const useGetJobPostingsBySchool = (
  schoolId: number,
  params?: GetJobPostingsParams,
  options?: { enabled?: boolean },
) => {
  // Default parametreleri set et (Spring Boot için gerekli)
  const queryParams: GetJobPostingsParams = {
    page: params?.page ?? 0,
    size: params?.size ?? 20,
    sortBy: params?.sortBy ?? "createdAt",
    sortDir: params?.sortDir ?? "DESC",
    ...params, // Diğer filtreleri ekle
  };

  return useGet<ApiResponsePageJobPostingDto>(
    schoolId ? API_ENDPOINTS.HR.JOB_POSTINGS.BY_SCHOOL(schoolId) : null,
    {
      params: queryParams as Record<string, unknown>,
      enabled: options?.enabled ?? !!schoolId,
    },
  );
};
