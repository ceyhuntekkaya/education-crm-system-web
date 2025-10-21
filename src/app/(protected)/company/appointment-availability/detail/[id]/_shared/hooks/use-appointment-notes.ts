"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, AppointmentNoteDto } from "@/types";

interface UseAppointmentNotesReturn {
  notes: AppointmentNoteDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Appointment ID'ye göre notları getiren hook
 * @param appointmentId - Appointment ID'si
 * @returns Appointment notları ve yönetim fonksiyonları
 */
export const useAppointmentNotes = (
  appointmentId: number
): UseAppointmentNotesReturn => {
  const {
    data: notesResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<AppointmentNoteDto[]>>(
    appointmentId ? API_ENDPOINTS.APPOINTMENTS.NOTES(appointmentId) : null
  );

  return {
    notes: notesResponse?.data || [],
    isLoading,
    error,
    refetch,
  };
};
