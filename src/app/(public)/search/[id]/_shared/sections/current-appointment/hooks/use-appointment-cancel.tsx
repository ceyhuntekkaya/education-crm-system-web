"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { CancelledByType } from "@/enums";

/**
 * Randevu iptal request DTO
 */
export interface AppointmentCancelRequestDto {
  appointmentId: number;
  cancellationReason: string;
  canceledByType: CancelledByType;
}

interface UseAppointmentCancelReturn {
  cancelAppointment: (data: AppointmentCancelRequestDto) => void;
  isCancelling: boolean;
  cancelError: string | null;
  cancelledAppointment: any | null;
}

/**
 * Randevu iptal hook'u
 *
 * @param onSuccess - Başarılı iptal sonrası çalışacak callback
 */
export const useAppointmentCancel = (
  onSuccess?: () => void
): UseAppointmentCancelReturn => {
  const {
    mutate: cancelAppointment,
    loading: isCancelling,
    error: cancelError,
    data: cancelledAppointment,
  } = usePost<any, AppointmentCancelRequestDto>(
    API_ENDPOINTS.APPOINTMENTS.CANCEL,
    {
      onSuccess: () => {
        onSuccess?.();
      },
    }
  );

  return {
    cancelAppointment,
    isCancelling,
    cancelError,
    cancelledAppointment,
  };
};
