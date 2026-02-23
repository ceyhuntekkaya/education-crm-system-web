"use client";

import { useUpdateEvent } from "@/app/(protected)/individual/instructor/events/_shared/hooks/api";
import type { EventUpdateDto, EventDto } from "@/types";

/**
 * Etkinlik güncelleme hook'u
 * @param eventId - Etkinlik ID'si
 */
export const useEditEvent = (eventId: number) => {
  const { mutate, loading, error } = useUpdateEvent(eventId);

  const updateEvent = async (
    data: EventUpdateDto,
  ): Promise<EventDto | null> => {
    const response = await mutate(data);
    return response?.data ?? null;
  };

  return {
    updateEvent,
    isUpdating: loading,
    updateError: error,
  };
};
