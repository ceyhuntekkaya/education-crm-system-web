"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseCompanyEventDto } from "@/app/(protected)/individual/company/events/_shared/types";

/**
 * Etkinlik ID'ye göre etkinlik detayı getirir (Company tarafı)
 *
 * API Endpoint: GET /webinar/events/:id
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
