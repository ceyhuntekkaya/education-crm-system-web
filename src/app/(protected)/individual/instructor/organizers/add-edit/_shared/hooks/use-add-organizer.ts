"use client";

import { useCreateOrganizer } from "@/app/(protected)/individual/instructor/organizers/_shared/hooks/api";
import type { EventOrganizerCreateDto, EventOrganizerDto } from "@/types";

/**
 * Yeni organizatör oluşturma hook'u
 */
export const useAddOrganizer = () => {
  const { mutate, loading, error } = useCreateOrganizer();

  const createOrganizer = async (
    data: EventOrganizerCreateDto,
  ): Promise<EventOrganizerDto | null> => {
    const response = await mutate(data);
    return response?.data ?? null;
  };

  return {
    createOrganizer,
    isCreating: loading,
    createError: error,
  };
};
