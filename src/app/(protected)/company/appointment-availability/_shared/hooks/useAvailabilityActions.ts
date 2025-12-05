"use client";

import {
  AppointmentAvailabilityFilters,
  AppointmentAvailabilityRangeFilters,
} from "../types";

/**
 * Availability fetch logic hook - veri çekme işlemlerini yöneten mantık
 */
export const useAvailabilityActions = (
  singleHook: any,
  rangeHook: any,
  isRangeFilter: (f: any) => f is AppointmentAvailabilityRangeFilters,
  addSchoolToFilters: (
    filters:
      | AppointmentAvailabilityFilters
      | AppointmentAvailabilityRangeFilters
  ) => any,
  setFilters: (
    filters:
      | AppointmentAvailabilityFilters
      | AppointmentAvailabilityRangeFilters
  ) => void
) => {
  const handleFetchAvailabilities = (
    newFilters:
      | AppointmentAvailabilityFilters
      | AppointmentAvailabilityRangeFilters
  ) => {
    // Filtrelere selectedSchool ID'sini otomatik ekle
    const filtersWithSchool = addSchoolToFilters(newFilters);

    if (!filtersWithSchool) {
      return; // Kurum seçili değil
    }

    setFilters(filtersWithSchool);

    // Filter tipine göre uygun hook'u çağır
    if (isRangeFilter(filtersWithSchool)) {
      rangeHook.fetchAvailabilityRange(filtersWithSchool);
    } else {
      singleHook.fetchAvailability(filtersWithSchool);
    }
  };

  return {
    fetchAvailabilities: handleFetchAvailabilities,
  };
};
