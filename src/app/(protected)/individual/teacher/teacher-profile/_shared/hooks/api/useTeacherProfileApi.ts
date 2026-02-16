"use client";

import { useGet, usePost, usePut, useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponsePageTeacherProfileDto,
  ApiResponseTeacherProfileDto,
  GetTeacherProfilesParams,
  TeacherProfileCreateDto,
  TeacherProfileUpdateDto,
} from "@/types";

// ================== API HOOKS ==================

/**
 * Öğretmen profillerini listeler
 *
 * @param params - Sayfalama ve filtreleme parametreleri
 * @returns Profil listesi
 *
 * API Endpoint: GET /hr/teacher-profiles
 */
export const useGetTeacherProfiles = (
  params?: GetTeacherProfilesParams,
  options?: { enabled?: boolean },
) => {
  // Default parametreleri set et (Spring Boot için gerekli)
  const queryParams: GetTeacherProfilesParams = {
    page: params?.page ?? 0,
    size: params?.size ?? 20,
    sortBy: params?.sortBy ?? "createdAt",
    sortDir: params?.sortDir ?? "DESC",
    ...params, // Diğer filtreleri ekle
  };

  return useGet<ApiResponsePageTeacherProfileDto>(
    API_ENDPOINTS.HR.TEACHER_PROFILES.LIST,
    {
      params: queryParams as Record<string, unknown>,
      enabled: options?.enabled ?? true,
    },
  );
};

/**
 * Belirli bir öğretmen profilinin detayını getirir
 *
 * @param teacherProfileId - Profil ID'si
 * @returns Profil detayı
 *
 * API Endpoint: GET /hr/teacher-profiles/{id}
 */
export const useGetTeacherProfileById = (
  teacherProfileId: number,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseTeacherProfileDto>(
    teacherProfileId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.BY_ID(teacherProfileId)
      : null,
    {
      enabled: options?.enabled ?? !!teacherProfileId,
    },
  );
};

/**
 * Kullanıcı ID'sine göre öğretmen profilini getirir
 *
 * @param userId - Kullanıcı ID'si
 * @returns Profil detayı
 *
 * API Endpoint: GET /hr/teacher-profiles/by-user/{userId}
 */
export const useGetTeacherProfileByUserId = (
  userId: number,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseTeacherProfileDto>(
    userId ? API_ENDPOINTS.HR.TEACHER_PROFILES.BY_USER(userId) : null,
    {
      enabled: options?.enabled ?? !!userId,
    },
  );
};

/**
 * Yeni öğretmen profili oluşturur
 *
 * API Endpoint: POST /hr/teacher-profiles
 */
export const useCreateTeacherProfile = () => {
  return usePost<ApiResponseTeacherProfileDto, TeacherProfileCreateDto>(
    API_ENDPOINTS.HR.TEACHER_PROFILES.CREATE,
  );
};

/**
 * Öğretmen profilini günceller
 *
 * @param teacherProfileId - Güncellenecek profil ID'si
 *
 * API Endpoint: PUT /hr/teacher-profiles/{id}
 */
export const useUpdateTeacherProfile = (teacherProfileId: number) => {
  return usePut<ApiResponseTeacherProfileDto, TeacherProfileUpdateDto>(
    teacherProfileId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.UPDATE(teacherProfileId)
      : "",
  );
};

/**
 * Öğretmen profilini siler
 *
 * @param teacherProfileId - Silinecek profil ID'si
 *
 * API Endpoint: DELETE /hr/teacher-profiles/{id}
 */
export const useDeleteTeacherProfile = (teacherProfileId: number) => {
  return useDelete(
    teacherProfileId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.DELETE(teacherProfileId)
      : "",
  );
};
