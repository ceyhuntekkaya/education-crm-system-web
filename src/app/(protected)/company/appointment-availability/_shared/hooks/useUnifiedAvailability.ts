"use client";

import { useMemo } from "react";
import {
  AppointmentAvailabilityFilters,
  AppointmentAvailabilityRangeFilters,
} from "../types";
import {
  useAppointmentAvailability as useAvailabilityHook,
  useAppointmentAvailabilityRange as useAvailabilityRangeHook,
} from "./";

/**
 * Unified availability hook - tek ve range hook'larını birleştiren mantık
 */
export const useUnifiedAvailability = (
  filters: AppointmentAvailabilityFilters | AppointmentAvailabilityRangeFilters
) => {
  // Single date hook
  const singleHook = useAvailabilityHook();
  // Range hook
  const rangeHook = useAvailabilityRangeHook();

  // Filter tipini belirleme logic'i
  const isRangeFilter = (f: any): f is AppointmentAvailabilityRangeFilters => {
    return f && ("startDate" in f || "endDate" in f);
  };

  // Unified data - hangisini kullanacağımızı belirle
  const unifiedData = useMemo(() => {
    const isRange = isRangeFilter(filters);

    return {
      // Unified availabilities (tek kaynak)
      availabilities: isRange
        ? rangeHook.availabilities
        : singleHook.availability,

      // Unified loading state
      availabilityLoading: isRange
        ? rangeHook.availabilityLoading
        : singleHook.availabilityLoading,

      // Unified error state
      availabilityError: isRange
        ? rangeHook.availabilityError
        : singleHook.availabilityError,

      // Hook referansları
      singleHook,
      rangeHook,
      isRangeFilter: isRange,
    };
  }, [filters, singleHook, rangeHook]);

  return unifiedData;
};
