"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponsePageEventDto } from "@/app/(protected)/individual/instructor/events/_shared/types";

/**
 * Belirli bir organizatöre ait etkinlikleri listeler
 *
 * API Endpoint: GET /webinar/events/by-organizer/{organizerId}
 */
export const useGetOrganizerEvents = (
  organizerId: number,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponsePageEventDto>(
    organizerId > 0
      ? API_ENDPOINTS.WEBINAR.EVENTS.BY_ORGANIZER(organizerId)
      : null,
    {
      enabled: options?.enabled ?? organizerId > 0,
    },
  );
};
