"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponsePageJobPostingDto,
  GetJobPostingsParams,
} from "@/types";

// ================== API HOOKS ==================

/**
 * Tüm iş ilanlarını getirir (Teacher için)
 *
 * @param params - Sayfalama ve filtreleme parametreleri
 * @returns İlan listesi
 *
 * API Endpoint: GET /hr/job-postings
 */
export const useGetAllJobPostings = (
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
    API_ENDPOINTS.HR.JOB_POSTINGS.LIST,
    {
      params: queryParams as Record<string, unknown>,
      enabled: options?.enabled ?? true,
    },
  );
};
