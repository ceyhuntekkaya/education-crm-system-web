"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponsePageApplicationDto,
  GetApplicationsParams,
} from "../../types";

/**
 * İş ilanına ait başvuruları getirir
 *
 * @param jobPostingId - İş ilanı ID'si
 * @param params - Sayfalama ve filtreleme parametreleri
 * @returns Başvuru listesi
 *
 * API Endpoint: GET /hr/applications/by-job-posting/{jobPostingId}
 */
export const useGetApplicationsByJobPosting = (
  jobPostingId: number,
  params?: GetApplicationsParams,
  options?: { enabled?: boolean },
) => {
  // Default parametreleri set et
  const queryParams: GetApplicationsParams = {
    page: params?.page ?? 0,
    size: params?.size ?? 20,
    sortBy: params?.sortBy ?? "createdAt",
    sortDir: params?.sortDir ?? "DESC",
    ...params,
  };

  return useGet<ApiResponsePageApplicationDto>(
    jobPostingId
      ? API_ENDPOINTS.HR.APPLICATIONS.BY_JOB_POSTING(jobPostingId)
      : null,
    {
      params: queryParams as Record<string, unknown>,
      enabled: options?.enabled ?? !!jobPostingId,
    },
  );
};
