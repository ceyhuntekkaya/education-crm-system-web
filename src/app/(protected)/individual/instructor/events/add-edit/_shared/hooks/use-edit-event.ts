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
    // executeMutation, backend'in { success, data } wrapper'ını soyarak
    // doğrudan EventDto döndürür (use-api.ts satır 89-91).
    const response = await mutate(data);
    return (response as unknown as EventDto) ?? null;
  };

  return {
    updateEvent,
    isUpdating: loading,
    updateError: error,
  };
};
