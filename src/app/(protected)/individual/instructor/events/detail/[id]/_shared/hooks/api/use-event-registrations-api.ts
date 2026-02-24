"use client";

import { useGet, usePut, useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponseEventRegistrationDto,
  ApiResponsePageEventRegistrationDto,
  GetRegistrationsByEventParams,
} from "../../../../../_shared/types";
import type { EventRegistrationStatusUpdateDto } from "@/types";

/**
 * Etkinliğe ait kayıtları listeler
 *
 * API Endpoint: GET /webinar/registrations/by-event/{eventId}
 */
export const useGetRegistrationsByEvent = (
  eventId: number,
  params?: GetRegistrationsByEventParams,
  options?: { enabled?: boolean },
) => {
  const queryParams: GetRegistrationsByEventParams = {
    page: params?.page ?? 0,
    size: params?.size ?? 20,
    ...params,
  };

  return useGet<ApiResponsePageEventRegistrationDto>(
    eventId > 0 ? API_ENDPOINTS.WEBINAR.REGISTRATIONS.BY_EVENT(eventId) : null,
    {
      params: queryParams as Record<string, unknown>,
      enabled: options?.enabled ?? eventId > 0,
    },
  );
};

/**
 * Kayıt durumunu günceller (APPROVED, REJECTED, CANCELLED, PENDING)
 *
 * API Endpoint: PUT /webinar/registrations/{id}/status
 */
export const useUpdateRegistrationStatus = (registrationId: number) => {
  return usePut<
    ApiResponseEventRegistrationDto,
    EventRegistrationStatusUpdateDto
  >(API_ENDPOINTS.WEBINAR.REGISTRATIONS.UPDATE_STATUS(registrationId));
};

/**
 * Katılım durumunu işaretler
 *
 * API Endpoint: PUT /webinar/registrations/{id}/attendance?attended={true|false}
 */
export const useMarkAttendance = (registrationId: number) => {
  return usePut<ApiResponseEventRegistrationDto, { attended: boolean }>(
    ({ attended }: { attended: boolean }) =>
      `${API_ENDPOINTS.WEBINAR.REGISTRATIONS.MARK_ATTENDANCE(registrationId)}?attended=${attended}`,
  );
};

/**
 * Tek bir kaydı ID ile getirir
 *
 * API Endpoint: GET /webinar/registrations/{id}
 */
export const useGetRegistrationById = (
  registrationId: number,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseEventRegistrationDto>(
    registrationId > 0
      ? API_ENDPOINTS.WEBINAR.REGISTRATIONS.BY_ID(registrationId)
      : null,
    { enabled: options?.enabled ?? registrationId > 0 },
  );
};

/**
 * Kaydı siler
 *
 * API Endpoint: DELETE /webinar/registrations/{id}
 */
export const useDeleteRegistration = (registrationId: number) => {
  return useDelete<ApiResponseEventRegistrationDto>(
    API_ENDPOINTS.WEBINAR.REGISTRATIONS.DELETE(registrationId),
  );
};
