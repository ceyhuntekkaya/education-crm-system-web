"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponseCompanyEventDto,
  ApiResponsePageCompanyEventDto,
  ApiResponsePageRegistrationDto,
} from "@/app/(protected)/individual/company/events/_shared/types";

/**
 * Yayındaki etkinlikleri listeler (Company tarafı)
 *
 * API Endpoint: GET /webinar/events/published
 */
export const useGetPublishedEvents = (options?: { enabled?: boolean }) => {
  return useGet<ApiResponsePageCompanyEventDto>(
    API_ENDPOINTS.WEBINAR.EVENTS.PUBLISHED,
    {
      params: { page: 0, size: 50 } as Record<string, unknown>,
      enabled: options?.enabled ?? true,
    },
  );
};

/**
 * ID ile etkinlik getirir (kayıt sayfasında kullanılır)
 *
 * API Endpoint: GET /webinar/events/{id}
 */
export const useGetEventById = (
  eventId: number | null,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseCompanyEventDto>(
    eventId ? API_ENDPOINTS.WEBINAR.EVENTS.BY_ID(eventId) : "",
    {
      enabled: options?.enabled ?? !!eventId,
    },
  );
};

/**
 * Şirket kullanıcısının kendi kayıtlarını getirir
 *
 * API Endpoint: GET /webinar/registrations/by-teacher/{userId}
 */
export const useGetMyRegistrations = (
  userId: number | null,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponsePageRegistrationDto>(
    userId ? API_ENDPOINTS.WEBINAR.REGISTRATIONS.BY_TEACHER(userId) : "",
    {
      params: { page: 0, size: 200 } as Record<string, unknown>,
      enabled: options?.enabled ?? !!userId,
    },
  );
};
