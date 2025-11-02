"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { AppointmentNoteCreateDto } from "@/types/dto/appointment/AppointmentNoteCreateDto";
import { AppointmentNoteDto } from "@/types/dto/appointment/AppointmentNoteDto";

/**
 * Appointment note ekleme hook'u
 */
export const useAddAppointmentNote = (
  appointmentId: number,
  refetchNotes?: () => void
) => {
  const {
    mutate: postNote,
    loading: isLoading,
    error,
  } = usePost<AppointmentNoteDto, AppointmentNoteCreateDto>(
    API_ENDPOINTS.APPOINTMENTS.NOTES(appointmentId),
    {
      onSuccess: () => {
        refetchNotes?.();
      },
    }
  );

  return {
    addNote: postNote,
    isLoading,
    error,
  };
};
