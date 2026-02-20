"use client";

import { useGet, usePost, usePut, useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponseEventOrganizerDto,
  ApiResponsePageEventOrganizerDto,
  GetOrganizersParams,
} from "../../types";
import type { EventOrganizerCreateDto, EventOrganizerUpdateDto } from "@/types";

/**
 * Tüm etkinlik düzenleyenlerini listeler / arar
 *
 * API Endpoint: GET /webinar/organizers
 */
export const useGetOrganizers = (
  params?: GetOrganizersParams,
  options?: { enabled?: boolean },
) => {
  const queryParams: GetOrganizersParams = {
    page: params?.page ?? 0,
    size: params?.size ?? 20,
    sortBy: params?.sortBy ?? "createdAt",
    sortDir: params?.sortDir ?? "DESC",
    ...params,
  };

  return useGet<ApiResponsePageEventOrganizerDto>(
    API_ENDPOINTS.WEBINAR.ORGANIZERS.LIST,
    {
      params: queryParams as Record<string, unknown>,
      enabled: options?.enabled ?? true,
    },
  );
};

/**
 * Aktif etkinlik düzenleyenlerini listeler
 *
 * API Endpoint: GET /webinar/organizers/active
 */
export const useGetActiveOrganizers = (
  params?: Pick<GetOrganizersParams, "page" | "size">,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponsePageEventOrganizerDto>(
    API_ENDPOINTS.WEBINAR.ORGANIZERS.ACTIVE,
    {
      params: params as Record<string, unknown>,
      enabled: options?.enabled ?? true,
    },
  );
};

/**
 * ID ile etkinlik düzenleyeni getirir
 *
 * API Endpoint: GET /webinar/organizers/{id}
 */
export const useGetOrganizerById = (
  id: number | null,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseEventOrganizerDto>(
    id ? API_ENDPOINTS.WEBINAR.ORGANIZERS.BY_ID(id) : null,
    {
      enabled: options?.enabled ?? !!id,
    },
  );
};

/**
 * Düzenleyen oluşturur
 *
 * API Endpoint: POST /webinar/organizers
 */
export const useCreateOrganizer = () => {
  return usePost<ApiResponseEventOrganizerDto, EventOrganizerCreateDto>(
    API_ENDPOINTS.WEBINAR.ORGANIZERS.CREATE,
  );
};

/**
 * Düzenleyen günceller
 *
 * API Endpoint: PUT /webinar/organizers/{id}
 */
export const useUpdateOrganizer = (id: number) => {
  return usePut<ApiResponseEventOrganizerDto, EventOrganizerUpdateDto>(
    API_ENDPOINTS.WEBINAR.ORGANIZERS.UPDATE(id),
  );
};

/**
 * Düzenleyen siler
 *
 * API Endpoint: DELETE /webinar/organizers/{id}
 */
export const useDeleteOrganizer = (id: number) => {
  return useDelete<ApiResponseEventOrganizerDto>(
    API_ENDPOINTS.WEBINAR.ORGANIZERS.DELETE(id),
  );
};
