"use client";

import { useMemo } from "react";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { useAuth } from "@/contexts";
import { AppointmentDto } from "@/types/dto/appointment/AppointmentDto";
import { ApiResponseDto } from "@/types";

interface UseAppointmentsProps {
  schoolId?: number;
  status?: string;
  limit?: number;
}

interface UseAppointmentsReturn {
  appointments: AppointmentDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Kullanıcının randevularını getiren hook
 * @param options - Filtreleme seçenekleri (schoolId, status, limit)
 * @returns Randevu verileri ve yönetim fonksiyonları
 */
export const useAppointments = ({
  schoolId,
  status,
  limit,
}: UseAppointmentsProps = {}): UseAppointmentsReturn => {
  const { user } = useAuth();

  // API endpoint - user varsa
  const endpoint = user?.id
    ? API_ENDPOINTS.APPOINTMENTS.SLOTS_SEARCH_USER(user.id)
    : null;

  // API isteği
  const {
    data: appointmentsResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<AppointmentDto[]>>(endpoint, {
    enabled: !!user?.id, // Sadece user varsa çalışsın
    onSuccess: (data) => {
      console.log(
        "Appointments fetched successfully:",
        data?.data?.length || 0
      );
    },
    onError: (error) => {
      console.error("Appointments fetch error:", error);
    },
  });

  // Filtrelenmiş randevular
  const appointments = useMemo(() => {
    let filtered = appointmentsResponse?.data || [];

    // schoolId filtresi
    if (schoolId) {
      filtered = filtered.filter((apt) => apt.schoolId === schoolId);
    }

    // status filtresi
    if (status) {
      filtered = filtered.filter((apt) => apt.status === status);
    }

    // limit filtresi
    if (limit && filtered.length > limit) {
      filtered = filtered.slice(0, limit);
    }

    return filtered;
  }, [appointmentsResponse?.data, schoolId, status, limit]);

  return {
    appointments,
    loading,
    error,
    refetch,
  };
};
