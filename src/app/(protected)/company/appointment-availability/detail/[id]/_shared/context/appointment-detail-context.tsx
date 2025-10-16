"use client";

import React, { createContext, useContext } from "react";
import { useAppointmentById } from "../hooks/use-appointment-by-id";
import {
  AppointmentDetailContextValue,
  AppointmentDetailProviderProps,
} from "../types/context-types";

const AppointmentDetailContext = createContext<
  AppointmentDetailContextValue | undefined
>(undefined);

export const AppointmentDetailProvider: React.FC<
  AppointmentDetailProviderProps
> = ({ children, appointmentId }) => {
  const { appointment, isLoading, error, refetch } =
    useAppointmentById(appointmentId);

  const contextValue: AppointmentDetailContextValue = {
    appointmentId,
    appointment,
    isLoading,
    error,
    refetch,
  };

  return (
    <AppointmentDetailContext.Provider value={contextValue}>
      {children}
    </AppointmentDetailContext.Provider>
  );
};

/**
 * AppointmentDetail context'ini kullanmak için hook
 */
export const useAppointmentDetail = (): AppointmentDetailContextValue => {
  const context = useContext(AppointmentDetailContext);
  if (context === undefined) {
    throw new Error(
      "useAppointmentDetail must be used within a AppointmentDetailProvider"
    );
  }
  return context;
};
