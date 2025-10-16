"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, AppointmentDto } from "@/types";

interface UseAppointmentByIdReturn {
  appointment: AppointmentDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir appointment verisi getiren hook
 * @param id - Appointment ID'si
 * @returns Appointment verisi ve yönetim fonksiyonları
 */
export const useAppointmentById = (id: number): UseAppointmentByIdReturn => {
  const {
    data: appointmentResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<AppointmentDto>>(
    id ? API_ENDPOINTS.APPOINTMENTS.BY_ID(id) : null
  );

  return {
    appointment: appointmentResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
