"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponsePageEventDto,
  ApiResponsePageRegistrationDto,
  GetPublishedEventsParams,
} from "../../types/api-response.types";

/**
 * Yayındaki etkinlikleri listeler (Teacher tarafı)
 *
 * API Endpoint: GET /webinar/events/published
 */
export const useGetPublishedEvents = (
  params?: GetPublishedEventsParams,
  options?: { enabled?: boolean },
) => {
  const queryParams: GetPublishedEventsParams = {
    page: params?.page ?? 0,
    size: params?.size ?? 50,
    ...params,
  };

  return useGet<ApiResponsePageEventDto>(
    API_ENDPOINTS.WEBINAR.EVENTS.PUBLISHED,
    {
      params: queryParams as Record<string, unknown>,
      enabled: options?.enabled ?? true,
    },
  );
};

/**
 * Öğretmenin kendi kayıtlarını getirir
 *
 * API Endpoint: GET /webinar/registrations/by-teacher/{teacherId}
 */
export const useGetMyRegistrations = (
  teacherId: number | null,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponsePageRegistrationDto>(
    teacherId ? API_ENDPOINTS.WEBINAR.REGISTRATIONS.BY_TEACHER(teacherId) : "",
    {
      params: { page: 0, size: 200 } as Record<string, unknown>,
      enabled: options?.enabled ?? !!teacherId,
    },
  );
};
