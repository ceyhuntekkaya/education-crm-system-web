"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { CurrentAppointmentContextType } from "../types";
import { useCurrentAppointment } from "../hooks/use-current-appointment";

const CurrentAppointmentContext = createContext<
  CurrentAppointmentContextType | undefined
>(undefined);

interface CurrentAppointmentProviderProps {
  children: ReactNode;
  schoolId: string | number;
}

export const CurrentAppointmentProvider: React.FC<
  CurrentAppointmentProviderProps
> = ({ children, schoolId }) => {
  // Current appointment hook'unu kullan (userId useAuth'dan alınıyor)
  const {
    currentAppointment,
    appointmentLoading,
    appointmentError,
    refetchAppointment,
  } = useCurrentAppointment({ schoolId });

  const contextValue: CurrentAppointmentContextType = {
    currentAppointment,
    isLoading: appointmentLoading,
    error: appointmentError,
    refetch: refetchAppointment,
  };

  return (
    <CurrentAppointmentContext.Provider value={contextValue}>
      {children}
    </CurrentAppointmentContext.Provider>
  );
};

export const useCurrentAppointmentContext =
  (): CurrentAppointmentContextType => {
    const context = useContext(CurrentAppointmentContext);
    if (context === undefined) {
      throw new Error(
        "useCurrentAppointmentContext must be used within a CurrentAppointmentProvider"
      );
    }
    return context;
  };
