"use client";

import { useState } from "react";
import {
  AppointmentAvailabilityFilters,
  AppointmentAvailabilityRangeFilters,
} from "../types";
import { useCompany } from "../../../_shared";

/**
 * Filter management hook - filter state yönetimi ve işlemleri
 */
export const useFilterManagement = () => {
  const [filters, setFilters] = useState<
    AppointmentAvailabilityFilters | AppointmentAvailabilityRangeFilters
  >({});

  // Company context'ten seçili okulu al
  const { selectedSchool } = useCompany();

  // Filter tipini belirleme helper
  const isRangeFilter = (f: any): f is AppointmentAvailabilityRangeFilters => {
    return f && ("startDate" in f || "endDate" in f);
  };

  // Filter güncelleme
  const updateFilters = (
    newFilters: Partial<
      AppointmentAvailabilityFilters | AppointmentAvailabilityRangeFilters
    >
  ) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
  };

  // Filter temizleme
  const clearFilters = () => {
    setFilters({});
  };

  // Okul bilgisi ekleme helper
  const addSchoolToFilters = (
    inputFilters:
      | AppointmentAvailabilityFilters
      | AppointmentAvailabilityRangeFilters
  ) => {
    if (!selectedSchool?.id) {
      console.warn("Okul seçili değil, arama yapılamıyor");
      return null;
    }

    return {
      ...inputFilters,
      schoolId: selectedSchool.id,
    };
  };

  return {
    filters,
    setFilters,
    updateFilters,
    clearFilters,
    isRangeFilter,
    addSchoolToFilters,
    selectedSchool,
  };
};
