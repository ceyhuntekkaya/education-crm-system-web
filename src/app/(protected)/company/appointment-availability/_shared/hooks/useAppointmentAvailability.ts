"use client";

import { useState } from "react";
import { useGet } from "@/hooks";
import { API_ENDPOINTS, buildQueryString } from "@/lib";
import {
  ApiResponseDto,
  AppointmentAvailabilityDto,
  AppointmentDto,
} from "@/types";
import { AppointmentAvailabilityFilters } from "../types";
import { mockAppointments } from "../mock";

interface UseAppointmentAvailabilityReturn {
  availability: AppointmentDto[];
  availabilityLoading: boolean;
  availabilityError: string | null;
  fetchAvailability: (filters: AppointmentAvailabilityFilters) => void;
}

/**
 * Okul randevu müsaitlik verilerini yöneten hook
 * @returns Randevu müsaitlik verileri ve yönetim fonksiyonları
 */
export const useAppointmentAvailability =
  (): UseAppointmentAvailabilityReturn => {
    const [currentFilters, setCurrentFilters] =
      useState<AppointmentAvailabilityFilters | null>(null);

    // Build the URL with query parameters
    const buildUrl = (filters: AppointmentAvailabilityFilters) => {
      if (!filters.schoolId || !filters.date) {
        return null;
      }

      const baseUrl = API_ENDPOINTS.APPOINTMENTS.SCHOOL_AVAILABILITY(
        filters.schoolId
      );
      const queryParams: Record<string, unknown> = {
        date: filters.date,
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

    const fetchAvailability = (filters: AppointmentAvailabilityFilters) => {
      setCurrentFilters(filters);
      // Refetch will be triggered automatically when currentFilters change
      if (url) {
        refetch();
      }
    };

    return {
      availability: mockAppointments || availabilityResponse?.data || [],
      availabilityLoading,
      availabilityError,
      fetchAvailability,
    };
  };
