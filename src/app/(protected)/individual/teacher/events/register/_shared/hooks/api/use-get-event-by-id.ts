"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseEventDto } from "@/app/(protected)/individual/teacher/events/_shared/types/api-response.types";

/**
 * Etkinlik ID'ye göre etkinlik detayı getirir
 *
 * API Endpoint: GET /webinar/events/:id
 */
export const useGetEventById = (
  eventId: number | null,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseEventDto>(
    eventId ? API_ENDPOINTS.WEBINAR.EVENTS.BY_ID(eventId) : "",
    {
      enabled: options?.enabled ?? !!eventId,
    },
  );
};
