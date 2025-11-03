"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { useAuth } from "@/contexts";

interface UseCurrentAppointmentParams {
  schoolId: string | number;
}

interface UseCurrentAppointmentReturn {
  currentAppointment: AppointmentDto | null;
  appointmentLoading: boolean;
  appointmentError: string | null;
  refetchAppointment: () => void;
}

/**
 * Kullanıcının mevcut randevusunu getiren hook
 * @param schoolId - Okul ID'si (URL'den params olarak gelir)
 * @returns Randevu verileri ve yönetim fonksiyonları
 */
export const useCurrentAppointment = ({
  schoolId,
}: UseCurrentAppointmentParams): UseCurrentAppointmentReturn => {
  // useAuth'dan userId'yi al
  const { user } = useAuth();
  const userId = user?.id;

  // API endpoint: /appointments/slots/search/user/{userId}/school/{schoolId}
  const endpoint = userId
    ? API_ENDPOINTS.APPOINTMENTS.CURRENT_APPOINTMENT(userId, schoolId)
    : null;

  const {
    data: appointmentResponse,
    loading: appointmentLoading,
    error: appointmentError,
    refetch: refetchAppointment,
  } = useGet<ApiResponseDto<AppointmentDto[]>>(endpoint);

  return {
    currentAppointment: appointmentResponse?.data?.[0] || null,
    appointmentLoading,
    appointmentError,
    refetchAppointment,
  };
};
