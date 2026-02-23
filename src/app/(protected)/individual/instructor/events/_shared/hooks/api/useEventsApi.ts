"use client";

import { useGet, usePost, usePut, useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponseEventDto,
  ApiResponsePageEventDto,
  GetEventsParams,
} from "../../types";
import type { EventCreateDto, EventUpdateDto } from "@/types";

/**
 * Tüm etkinlikleri listeler / arar
 *
 * API Endpoint: GET /webinar/events
 */
export const useGetEvents = (
  params?: GetEventsParams,
  options?: { enabled?: boolean },
) => {
  const queryParams: GetEventsParams = {
    page: params?.page ?? 0,
    size: params?.size ?? 20,
    sortBy: params?.sortBy ?? "startDateTime",
    sortDir: params?.sortDir ?? "ASC",
    ...params,
  };

  return useGet<ApiResponsePageEventDto>(API_ENDPOINTS.WEBINAR.EVENTS.LIST, {
    params: queryParams as Record<string, unknown>,
    enabled: options?.enabled ?? true,
  });
};

/**
 * Yayındaki etkinlikleri listeler
 *
 * API Endpoint: GET /webinar/events/published
 */
export const useGetPublishedEvents = (
  params?: Pick<GetEventsParams, "page" | "size">,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponsePageEventDto>(
    API_ENDPOINTS.WEBINAR.EVENTS.PUBLISHED,
    {
      params: params as Record<string, unknown>,
      enabled: options?.enabled ?? true,
    },
  );
};

/**
 * ID ile etkinlik getirir
 *
 * API Endpoint: GET /webinar/events/{id}
 */
export const useGetEventById = (
  id: number | null,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseEventDto>(
    id ? API_ENDPOINTS.WEBINAR.EVENTS.BY_ID(id) : null,
    {
      enabled: options?.enabled ?? !!id,
    },
  );
};

/**
 * Etkinlik oluşturur
 *
 * API Endpoint: POST /webinar/events
 */
export const useCreateEvent = () => {
  return usePost<ApiResponseEventDto, EventCreateDto>(
    API_ENDPOINTS.WEBINAR.EVENTS.CREATE,
  );
};

/**
 * Etkinlik günceller
 *
 * API Endpoint: PUT /webinar/events/{id}
 */
export const useUpdateEvent = (id: number) => {
  return usePut<ApiResponseEventDto, EventUpdateDto>(
    API_ENDPOINTS.WEBINAR.EVENTS.UPDATE(id),
  );
};

/**
 * Etkinlik siler
 *
 * API Endpoint: DELETE /webinar/events/{id}
 */
export const useDeleteEvent = (id: number) => {
  return useDelete<ApiResponseEventDto>(
    API_ENDPOINTS.WEBINAR.EVENTS.DELETE(id),
  );
};
