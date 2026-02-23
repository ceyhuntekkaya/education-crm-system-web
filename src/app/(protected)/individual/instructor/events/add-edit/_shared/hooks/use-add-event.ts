"use client";

import { useCreateEvent } from "@/app/(protected)/individual/instructor/events/_shared/hooks/api";
import type { EventCreateDto, EventDto } from "@/types";

/**
 * Yeni etkinlik oluşturma hook'u
 */
export const useAddEvent = () => {
  const { mutate, loading, error } = useCreateEvent();

  const createEvent = async (
    data: EventCreateDto,
  ): Promise<EventDto | null> => {
    // executeMutation, backend'in { success, data } wrapper'ını soyarak
    // doğrudan EventDto döndürür (use-api.ts satır 89-91).
    // TypeScript bu runtime davranışını bilmediği için cast gerekli.
    const response = await mutate(data);
    return (response as unknown as EventDto) ?? null;
  };

  return {
    createEvent,
    isCreating: loading,
    createError: error,
  };
};
