"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { CurrentAppointmentContextType } from "../types";
import { useCurrentAppointment } from "../hooks/use-current-appointment";
import {
  useAppointmentReschedule,
  AppointmentRescheduleRequestDto,
} from "../hooks/use-appointment-reschedule";
import {
  useAppointmentCancel,
  AppointmentCancelRequestDto,
} from "../hooks/use-appointment-cancel";

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

  // Reschedule hook'unu kullan - başarılı işlemden sonra otomatik refetch
  const { rescheduleAppointment, isRescheduling, rescheduleError } =
    useAppointmentReschedule(refetchAppointment);

  // Cancel hook'unu kullan - başarılı işlemden sonra otomatik refetch
  const { cancelAppointment, isCancelling, cancelError } =
    useAppointmentCancel(refetchAppointment);

  const contextValue: CurrentAppointmentContextType = {
    currentAppointment,
    isLoading: appointmentLoading,
    error: appointmentError,
    refetch: refetchAppointment,
    rescheduleAppointment,
    isRescheduling,
    rescheduleError,
    cancelAppointment,
    isCancelling,
    cancelError,
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
