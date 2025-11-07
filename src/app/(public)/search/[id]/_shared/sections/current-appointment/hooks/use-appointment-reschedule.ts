"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { AppointmentDto } from "@/types";

/**
 * Randevu erteleme request DTO
 */
export interface AppointmentRescheduleRequestDto {
  appointmentId: number;
  newAppointmentSlotId: number;
  rescheduleReason?: string;
}

interface UseAppointmentRescheduleReturn {
  rescheduleAppointment: (data: AppointmentRescheduleRequestDto) => void;
  isRescheduling: boolean;
  rescheduleError: string | null;
  rescheduledAppointment: AppointmentDto | null;
}

/**
 * Randevu erteleme hook'u
 *
 * @param onSuccess - Başarılı erteleme sonrası çalışacak callback
 */
export const useAppointmentReschedule = (
  onSuccess?: () => void
): UseAppointmentRescheduleReturn => {
  const {
    mutate: rescheduleAppointment,
    loading: isRescheduling,
    error: rescheduleError,
    data: rescheduledAppointment,
  } = usePost<AppointmentDto, AppointmentRescheduleRequestDto>(
    API_ENDPOINTS.APPOINTMENTS.RESCHEDULE,
    {
      onSuccess: () => {
        onSuccess?.();
      },
    }
  );

  return {
    rescheduleAppointment,
    isRescheduling,
    rescheduleError,
    rescheduledAppointment,
  };
};
