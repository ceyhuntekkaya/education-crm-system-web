"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
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

  // İlk slot'un appointment field'ını al
  const currentAppointment =
    appointmentResponse?.data?.[0]?.appointment || null;

  return {
    currentAppointment,
    appointmentLoading,
    appointmentError,
    refetchAppointment,
  };
};
