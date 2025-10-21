"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { AppointmentAvailabilityContextType } from "../types";
import {
  useUnifiedAvailability,
  useFilterManagement,
  useAvailabilityActions,
  useAppointmentDetailsFilter,
} from "../hooks";
import { hasValidSearchCriteria } from "../utils";

const AppointmentAvailabilityContext = createContext<
  AppointmentAvailabilityContextType | undefined
>(undefined);

interface AppointmentAvailabilityProviderProps {
  children: ReactNode;
}

export const AppointmentAvailabilityProvider: React.FC<
  AppointmentAvailabilityProviderProps
> = ({ children }) => {
  // Filter management hook
  const {
    filters,
    setFilters,
    updateFilters,
    clearFilters,
    isRangeFilter,
    addSchoolToFilters,
  } = useFilterManagement();

  // Unified availability hook
  const {
    availabilities,
    availabilityLoading,
    availabilityError,
    singleHook,
    rangeHook,
  } = useUnifiedAvailability(filters);

  // Availability actions hook
  const { fetchAvailabilities } = useAvailabilityActions(
    singleHook,
    rangeHook,
    isRangeFilter,
    addSchoolToFilters,
    setFilters
  );

  // Appointment details filtering hook
  const {
    appointmentFilters,
    filteredAppointments,
    setAppointmentFilters,
    clearAppointmentFilters,
    removeAppointmentFilter,
  } = useAppointmentDetailsFilter(availabilities);

  // Veri durumunu hesapla
  const hasSearchCriteria = hasValidSearchCriteria(filters);
  const hasDataToFilter =
    hasSearchCriteria && availabilities.length > 0 && !availabilityLoading;

  const contextValue: AppointmentAvailabilityContextType = {
    // Availability data
    availabilities,
    availabilityLoading,
    availabilityError,

    // Filter parameters
    filters,

    // Frontend appointment filters
    appointmentFilters,
    filteredAppointments,

    // Data state
    hasDataToFilter,

    // Actions
    fetchAvailabilities,
    updateFilters,
    clearFilters,

    // Appointment details filtering
    setAppointmentFilters,
    clearAppointmentFilters,
    removeAppointmentFilter,
  };

  return (
    <AppointmentAvailabilityContext.Provider value={contextValue}>
      {children}
    </AppointmentAvailabilityContext.Provider>
  );
};

export const useAppointmentAvailability =
  (): AppointmentAvailabilityContextType => {
    const context = useContext(AppointmentAvailabilityContext);
    if (context === undefined) {
      throw new Error(
        "useAppointmentAvailability must be used within an AppointmentAvailabilityProvider"
      );
    }
    return context;
  };

// Legacy context için backward compatibility
export const AppointmentProvider = AppointmentAvailabilityProvider;
export const useAppointment = useAppointmentAvailability;
