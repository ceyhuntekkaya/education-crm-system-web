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
    const response = await mutate(data);
    return response?.data ?? null;
  };

  return {
    createEvent,
    isCreating: loading,
    createError: error,
  };
};
