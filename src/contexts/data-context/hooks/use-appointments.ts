"use client";

import { useMemo } from "react";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { useAuth } from "@/contexts";
import { AppointmentSlotDto } from "@/types/dto/appointment/AppointmentSlotDto";
import { ApiResponseDto } from "@/types";

/**
 * Hook to fetch user appointments
 * Internal hook used by DataProvider
 */
export const useAppointments = () => {
  const { user } = useAuth();

  // API endpoint - user varsa
  const endpoint = user?.id
    ? API_ENDPOINTS.APPOINTMENTS.SLOTS_SEARCH_USER(user.id)
    : null;

  // API isteği - Backend'den AppointmentSlotDto[] dönüyor
  const {
    data: slotsResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<AppointmentSlotDto[]>>(endpoint, {
    enabled: !!user?.id, // Sadece user varsa çalışsın
    onSuccess: (data) => {
      // console.log(
      //   "Appointment slots fetched successfully:",
      //   data?.data?.length || 0
      // );
    },
    onError: (error) => {
      console.error("Appointment slots fetch error:", error);
    },
  });

  // Slot'lar
  const slots = useMemo(() => {
    return slotsResponse?.data || [];
  }, [slotsResponse?.data]);

  return {
    slots,
    loading,
    error,
    refetch,
  };
};
