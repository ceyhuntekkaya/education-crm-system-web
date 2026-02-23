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
    // executeMutation zaten backend'in { success, data } yapısından
    // data alanını çıkartıp döndürüyor, bu yüzden response doğrudan EventOrganizerDto
    // executeMutation, backend'in { success, data } wrapper'ını soyarak
    // doğrudan EventOrganizerDto döndürür (use-api.ts satır 89-91).
    // TypeScript bu runtime davranışını bilmediği için cast gerekli.
    const response = await mutate(data);
    return (response as unknown as EventOrganizerDto) ?? null;
  };

  return {
    createOrganizer,
    isCreating: loading,
    createError: error,
  };
};
