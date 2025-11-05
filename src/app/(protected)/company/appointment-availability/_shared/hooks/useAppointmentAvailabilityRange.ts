"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, AppointmentSlotDto } from "@/types";
import { AppointmentAvailabilityRangeFilters } from "../types";

interface SlotSearchRequest {
  startDate: string;
  endDate: string;
  schoolId: number;
}

interface UseAppointmentAvailabilityRangeReturn {
  availabilities: AppointmentSlotDto[];
  availabilityLoading: boolean;
  availabilityError: string | null;
  fetchAvailabilityRange: (
    filters: AppointmentAvailabilityRangeFilters
  ) => void;
}

/**
 * Okul randevu müsaitlik aralığı verilerini yöneten hook
 * Yeni API yapısı: POST /api/appointments/slots/search/date
 * @returns Randevu müsaitlik aralığı verileri ve yönetim fonksiyonları
 */
export const useAppointmentAvailabilityRange =
  (): UseAppointmentAvailabilityRangeReturn => {
    const {
      data: availabilityResponse,
      loading: availabilityLoading,
      error: availabilityError,
      mutate,
    } = usePost<ApiResponseDto<AppointmentSlotDto[]>, SlotSearchRequest>(
      API_ENDPOINTS.APPOINTMENTS.SLOTS_SEARCH_DATE
    );

    const fetchAvailabilityRange = (
      filters: AppointmentAvailabilityRangeFilters
    ) => {
      if (!filters.schoolId || !filters.startDate || !filters.endDate) {
        console.warn("SchoolId, startDate ve endDate gerekli!");
        return;
      }

      const requestBody: SlotSearchRequest = {
        startDate: filters.startDate,
        endDate: filters.endDate,
        schoolId: filters.schoolId,
      };

      mutate(requestBody);
    };

    return {
      availabilities: availabilityResponse?.data || [],
      availabilityLoading,
      availabilityError,
      fetchAvailabilityRange,
    };
  };
