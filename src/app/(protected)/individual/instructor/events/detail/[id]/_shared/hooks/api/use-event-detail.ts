"use client";

import { useGetEventById } from "../../../../../_shared/hooks/api/useEventsApi";

/**
 * Etkinlik ID'sine göre tek bir etkinliğin detaylarını getirir
 */
export const useEventDetail = (id: number) =>
  useGetEventById(id, { enabled: id > 0 });
