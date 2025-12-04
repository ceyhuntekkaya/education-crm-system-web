"use client";

import { useState } from "react";
import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, AppointmentSlotDto } from "@/types";
import { AppointmentAvailabilityFilters } from "../types";

interface SlotSearchRequest {
  startDate: string;
  endDate: string;
  schoolId: number;
}

interface UseAppointmentAvailabilityReturn {
  availability: AppointmentSlotDto[];
  availabilityLoading: boolean;
  availabilityError: string | null;
  fetchAvailability: (filters: AppointmentAvailabilityFilters) => void;
}

/**
 * Kurum randevu müsaitlik verilerini yöneten hook (Tekil Tarih)
 * Yeni API yapısı: POST /api/appointments/slots/search/date
 * Tekil tarih için startDate ve endDate aynı günü gönderir
 * @returns Randevu müsaitlik verileri ve yönetim fonksiyonları
 */
export const useAppointmentAvailability =
  (): UseAppointmentAvailabilityReturn => {
    const {
      data: availabilityResponse,
      loading: availabilityLoading,
      error: availabilityError,
      mutate,
    } = usePost<ApiResponseDto<AppointmentSlotDto[]>, SlotSearchRequest>(
      API_ENDPOINTS.APPOINTMENTS.SLOTS_SEARCH_DATE
    );

    const fetchAvailability = (filters: AppointmentAvailabilityFilters) => {
      if (!filters.schoolId || !filters.date) {
        console.warn("SchoolId ve date gerekli!");
        return;
      }

      // Tekil tarih için startDate ve endDate aynı
      const requestBody: SlotSearchRequest = {
        startDate: filters.date,
        endDate: filters.date,
        schoolId: filters.schoolId,
      };

      mutate(requestBody);
    };

    return {
      availability: availabilityResponse?.data || [],
      availabilityLoading,
      availabilityError,
      fetchAvailability,
    };
  };
