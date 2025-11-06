"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { CancelledByType } from "@/enums";

export interface ConfirmAppointmentRequest {
  appointmentId: number;
  confirmedBy: number;
}

export interface CancelAppointmentRequest {
  appointmentId: number;
  cancellationReason: string;
  canceledByType: CancelledByType;
}

interface UseAppointmentActionsReturn {
  confirmAppointment: (
    data: ConfirmAppointmentRequest
  ) => Promise<ApiResponseDto<void> | null>;
  cancelAppointment: (
    data: CancelAppointmentRequest
  ) => Promise<ApiResponseDto<void> | null>;
  confirmLoading: boolean;
  cancelLoading: boolean;
}

/**
 * Hook for handling appointment confirmation and cancellation actions
 * Randevu onaylama ve iptal işlemlerini yöneten hook
 */
export const useAppointmentActions = (): UseAppointmentActionsReturn => {
  const { mutate: confirmAppointment, loading: confirmLoading } = usePost<
    ApiResponseDto<void>,
    ConfirmAppointmentRequest
  >(API_ENDPOINTS.APPOINTMENTS.CONFIRM);

  const { mutate: cancelAppointment, loading: cancelLoading } = usePost<
    ApiResponseDto<void>,
    CancelAppointmentRequest
  >(API_ENDPOINTS.APPOINTMENTS.CANCEL);

  return {
    confirmAppointment,
    cancelAppointment,
    confirmLoading,
    cancelLoading,
  };
};
