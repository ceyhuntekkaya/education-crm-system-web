"use client";

import { usePost, useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApplicationCreateDto,
  ApiResponseApplicationDto,
  ApiResponsePageApplicationDto,
  GetApplicationsParams,
} from "@/types";

// ================== API HOOKS ==================

/**
 * Yeni başvuru oluşturur
 *
 * @returns Create hook
 *
 * API Endpoint: POST /hr/applications
 */
export const useCreateApplication = () => {
  return usePost<ApiResponseApplicationDto, ApplicationCreateDto>(
    API_ENDPOINTS.HR.APPLICATIONS.CREATE,
  );
};

/**
 * Öğretmenin tüm başvurularını getirir
 *
 * @param teacherId - Öğretmen profil ID
 * @param params - Sayfalama parametreleri
 * @returns Başvuru listesi
 *
 * API Endpoint: GET /hr/applications/by-teacher/{teacherId}
 */
export const useGetMyApplications = (
  teacherId: number,
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
    API_ENDPOINTS.HR.APPLICATIONS.BY_TEACHER(teacherId),
    {
      params: queryParams as Record<string, unknown>,
      enabled: options?.enabled ?? true,
    },
  );
};

/**
 * Belirli bir iş ilanına yapılan başvuruyu kontrol eder
 *
 * @param jobPostingId - İş ilanı ID
 * @param teacherId - Öğretmen profil ID
 * @returns Başvuru varsa ApplicationDto
 *
 * API Endpoint: GET /hr/applications/by-teacher/{teacherId}
 * - jobPostingId ile filtrelenir
 */
export const useCheckApplicationForJob = (
  jobPostingId: number,
  teacherId: number,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponsePageApplicationDto>(
    API_ENDPOINTS.HR.APPLICATIONS.BY_TEACHER(teacherId),
    {
      params: {
        jobPostingId,
        page: 0,
        size: 1, // Sadece 1 kayıt yeterli
      },
      enabled: options?.enabled ?? true,
    },
  );
};
