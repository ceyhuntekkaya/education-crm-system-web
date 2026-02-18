"use client";

import { useGet, usePost, usePatch, useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponsePageApplicationDto,
  ApiResponseApplicationDto,
  ApiResponseApplicationNotesArray,
  ApiResponseApplicationDocumentsArray,
  ApiResponseApplicationNoteDto,
  ApiResponseApplicationDocumentDto,
  GetApplicationsParams,
  ApplicationCreateDto,
  ApplicationDocumentCreateDto,
} from "../../types";

/**
 * ================================================================================
 * APPLICATIONS API HOOKS
 * ================================================================================
 * Teacher başvuru modülü için API hooks
 * API Dokümantasyonu: HR_API_FRONTEND.md - Section 3
 */

// ============ GET HOOKS ============

/**
 * Öğretmenin başvurularını getirir
 *
 * @param teacherId - Öğretmen ID'si
 * @param params - Sayfalama ve filtreleme parametreleri
 * @returns Başvuru listesi
 *
 * API Endpoint: GET /hr/applications/by-teacher/{teacherId}
 */
export const useGetApplicationsByTeacher = (
  teacherId: number,
  params?: GetApplicationsParams,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponsePageApplicationDto>(
    teacherId ? API_ENDPOINTS.HR.APPLICATIONS.BY_TEACHER(teacherId) : null,
    {
      params: params as Record<string, unknown>,
      enabled: options?.enabled ?? !!teacherId,
    },
  );
};

/**
 * Başvuru detayını getirir
 *
 * @param applicationId - Başvuru ID'si
 * @returns Başvuru detayı
 *
 * API Endpoint: GET /hr/applications/{id}
 */
export const useGetApplicationById = (
  applicationId: number,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseApplicationDto>(
    applicationId ? API_ENDPOINTS.HR.APPLICATIONS.BY_ID(applicationId) : null,
    {
      enabled: options?.enabled ?? !!applicationId,
    },
  );
};

/**
 * Başvuru notlarını getirir
 *
 * @param applicationId - Başvuru ID'si
 * @returns Not listesi
 *
 * API Endpoint: GET /hr/applications/{id}/notes
 */
export const useGetApplicationNotes = (
  applicationId: number,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseApplicationNotesArray>(
    applicationId ? API_ENDPOINTS.HR.APPLICATIONS.NOTES(applicationId) : null,
    {
      enabled: options?.enabled ?? !!applicationId,
    },
  );
};

/**
 * Başvuru belgelerini getirir
 *
 * @param applicationId - Başvuru ID'si
 * @returns Belge listesi
 *
 * API Endpoint: GET /hr/applications/{id}/documents
 */
export const useGetApplicationDocuments = (
  applicationId: number,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseApplicationDocumentsArray>(
    applicationId
      ? API_ENDPOINTS.HR.APPLICATIONS.DOCUMENTS(applicationId)
      : null,
    {
      enabled: options?.enabled ?? !!applicationId,
    },
  );
};

// ============ CREATE/UPDATE HOOKS ============

/**
 * Yeni başvuru oluşturur
 *
 * API Endpoint: POST /hr/applications
 */
export const useCreateApplication = () => {
  return usePost<ApiResponseApplicationDto, ApplicationCreateDto>(
    API_ENDPOINTS.HR.APPLICATIONS.CREATE,
  );
};

/**
 * Başvuruya not ekler
 *
 * API Endpoint: POST /hr/applications/{id}/notes
 */
export const useAddApplicationNote = (applicationId: number) => {
  return usePost<ApiResponseApplicationNoteDto, { noteText: string }>(
    API_ENDPOINTS.HR.APPLICATIONS.ADD_NOTE(applicationId),
  );
};

/**
 * Başvuruya belge ekler
 *
 * API Endpoint: POST /hr/applications/{id}/documents
 */
export const useAddApplicationDocument = (applicationId: number) => {
  return usePost<
    ApiResponseApplicationDocumentDto,
    ApplicationDocumentCreateDto
  >(API_ENDPOINTS.HR.APPLICATIONS.ADD_DOCUMENT(applicationId));
};

/**
 * Başvuruyu geri çeker
 *
 * API Endpoint: POST /hr/applications/{id}/withdraw
 */
export const useWithdrawApplication = (applicationId: number) => {
  return usePost<ApiResponseApplicationDto, void>(
    API_ENDPOINTS.HR.APPLICATIONS.WITHDRAW(applicationId),
  );
};

/**
 * Başvuru durumunu günceller
 *
 * API Endpoint: PATCH /hr/applications/{id}/status
 */
export const useUpdateApplicationStatus = (applicationId: number) => {
  return usePatch<ApiResponseApplicationDto, { status: string }>(
    API_ENDPOINTS.HR.APPLICATIONS.UPDATE_STATUS(applicationId),
  );
};

// ============ DELETE HOOKS ============

/**
 * Başvuru belgesini siler
 *
 * API Endpoint: DELETE /hr/applications/{id}/documents/{documentId}
 */
export const useDeleteApplicationDocument = (
  applicationId: number,
  documentId: number,
) => {
  return useDelete<ApiResponseApplicationDto>(
    API_ENDPOINTS.HR.APPLICATIONS.DELETE_DOCUMENT(applicationId, documentId),
  );
};
