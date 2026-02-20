"use client";

import { useUpdateOrganizer } from "@/app/(protected)/individual/instructor/organizers/_shared/hooks/api";
import type { EventOrganizerUpdateDto, EventOrganizerDto } from "@/types";

/**
 * Organizatör güncelleme hook'u
 * @param organizerId - Organizatör ID'si
 */
export const useEditOrganizer = (organizerId: number) => {
  const { mutate, loading, error } = useUpdateOrganizer(organizerId);

  const updateOrganizer = async (
    data: EventOrganizerUpdateDto,
  ): Promise<EventOrganizerDto | null> => {
    const response = await mutate(data);
    return response?.data ?? null;
  };

  return {
    updateOrganizer,
    isUpdating: loading,
    updateError: error,
  };
};
