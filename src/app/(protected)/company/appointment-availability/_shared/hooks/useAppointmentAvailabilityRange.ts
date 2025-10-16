"use client";

import { useState } from "react";
import { useGet } from "@/hooks";
import { API_ENDPOINTS, buildQueryString } from "@/lib";
import {
  ApiResponseDto,
  AppointmentAvailabilityDto,
  AppointmentDto,
} from "@/types";
import { AppointmentAvailabilityRangeFilters } from "../types";
import { mockAppointments } from "../mock";

interface UseAppointmentAvailabilityRangeReturn {
  availabilities: AppointmentDto[];
  availabilityLoading: boolean;
  availabilityError: string | null;
  fetchAvailabilityRange: (
    filters: AppointmentAvailabilityRangeFilters
  ) => void;
}

/**
 * Okul randevu müsaitlik aralığı verilerini yöneten hook
 * @returns Randevu müsaitlik aralığı verileri ve yönetim fonksiyonları
 */
export const useAppointmentAvailabilityRange =
  (): UseAppointmentAvailabilityRangeReturn => {
    const [currentFilters, setCurrentFilters] =
      useState<AppointmentAvailabilityRangeFilters | null>(null);

    // Build the URL with query parameters
    const buildUrl = (filters: AppointmentAvailabilityRangeFilters) => {
      if (!filters.schoolId || !filters.startDate || !filters.endDate) {
        return null;
      }

      const baseUrl = API_ENDPOINTS.APPOINTMENTS.SCHOOL_AVAILABILITY_RANGE(
        filters.schoolId
      );
      const queryParams: Record<string, unknown> = {
        startDate: filters.startDate,
        endDate: filters.endDate,
      };

      const queryString = buildQueryString(queryParams);
      return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    };

    const url = currentFilters ? buildUrl(currentFilters) : null;

    const {
      data: availabilityResponse,
      loading: availabilityLoading,
      error: availabilityError,
      refetch,
    } = useGet<ApiResponseDto<AppointmentDto[]>>(url);

    const fetchAvailabilityRange = (
      filters: AppointmentAvailabilityRangeFilters
    ) => {
      setCurrentFilters(filters);
      // Refetch will be triggered automatically when currentFilters change
      if (url) {
        refetch();
      }
    };

    return {
      availabilities: mockAppointments || availabilityResponse?.data || [],
      availabilityLoading,
      availabilityError,
      fetchAvailabilityRange,
    };
  };
