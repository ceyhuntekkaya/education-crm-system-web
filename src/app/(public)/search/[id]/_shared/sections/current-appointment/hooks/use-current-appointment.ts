"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
import { useAuth } from "@/contexts";

interface UseCurrentAppointmentParams {
  schoolId: string | number;
}

interface UseCurrentAppointmentReturn {
  currentAppointment: AppointmentSlotDto | null;
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
  // Backend response: ApiResponseDto<AppointmentSlotDto[]>
  // Her slot içinde appointment field'ı var
  const endpoint = userId
    ? API_ENDPOINTS.APPOINTMENTS.CURRENT_APPOINTMENT(userId, schoolId)
    : null;

  const {
    data: appointmentResponse,
    loading: appointmentLoading,
    error: appointmentError,
    refetch: refetchAppointment,
  } = useGet<ApiResponseDto<AppointmentSlotDto[]>>(endpoint);

  // Son slot'u direkt olarak al
  const currentAppointment = 
    appointmentResponse?.data && appointmentResponse.data.length > 0
      ? appointmentResponse.data[appointmentResponse.data.length - 1]
      : null;

  return {
    currentAppointment,
    appointmentLoading,
    appointmentError,
    refetchAppointment,
  };
};
