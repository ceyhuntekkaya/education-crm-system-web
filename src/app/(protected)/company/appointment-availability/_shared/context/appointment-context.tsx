"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { AppointmentAvailabilityContextType } from "../types";
import {
  useUnifiedAvailability,
  useFilterManagement,
  useAvailabilityActions,
} from "../hooks";

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

  const contextValue: AppointmentAvailabilityContextType = {
    // Availability data
    availabilities,
    availabilityLoading,
    availabilityError,

    // Filter parameters
    filters,

    // Actions
    fetchAvailabilities,
    updateFilters,
    clearFilters,
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
