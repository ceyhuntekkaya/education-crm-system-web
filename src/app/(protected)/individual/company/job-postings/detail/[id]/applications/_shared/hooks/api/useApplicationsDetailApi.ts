"use client";

import { useGet, usePost, usePatch, useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponseApplicationDto,
  ApiResponseApplicationNotesArray,
  ApiResponseApplicationDocumentsArray,
  ApiResponseApplicationNoteDto,
  ApiResponseApplicationDocumentDto,
  ApplicationDocumentCreateDto,
} from "../../types";

/**
 * ================================================================================
 * APPLICATION DETAIL API HOOKS (Company)
 * ================================================================================
 * Company başvuru detay modülü için API hooks
 */

// ============ GET HOOKS ============

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

// ============ MUTATIONS ============

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
 * Başvuru durumunu günceller
 *
 * API Endpoint: PATCH /hr/applications/{id}/status
 */
export const useUpdateApplicationStatus = (applicationId: number) => {
  return usePatch<ApiResponseApplicationDto, { status: string }>(
    API_ENDPOINTS.HR.APPLICATIONS.UPDATE_STATUS(applicationId),
  );
};

/**
 * Başvuru belgesini siler
 *
 * @param applicationId - Başvuru ID'si
 * @returns Delete hook - mutate fonksiyonuna documentId gönderilir
 *
 * API Endpoint: DELETE /hr/applications/{id}/documents/{documentId}
 */
export const useDeleteApplicationDocument = (applicationId: number) => {
  return useDelete<ApiResponseApplicationDto, number>((documentId: number) =>
    API_ENDPOINTS.HR.APPLICATIONS.DELETE_DOCUMENT(applicationId, documentId),
  );
};
