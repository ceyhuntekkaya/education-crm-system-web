"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { AppointmentSlotDto } from "@/types";

interface UseSlotByIdProps {
  slotId: number | null;
}

/**
 * Slot ID'sine göre slot bilgilerini getiren hook
 */
export const useSlotById = ({ slotId }: UseSlotByIdProps) => {
  const {
    data: slot,
    loading: isLoading,
    error,
    refetch,
  } = useGet<AppointmentSlotDto>(
    slotId ? API_ENDPOINTS.APPOINTMENTS.SLOT_BY_ID(slotId) : null
  );

  return {
    slot,
    isLoading,
    error,
    refetch,
  };
};
