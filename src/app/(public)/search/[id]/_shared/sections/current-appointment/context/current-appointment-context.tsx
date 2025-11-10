"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { CurrentAppointmentContextType } from "../types";
import { useInstitutionDetail } from "../../../contexts";
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
  // InstitutionDetailContext'ten appointment verilerini al - TEK KAYNAK
  const {
    currentAppointment,
    currentAppointmentLoading,
    currentAppointmentError,
    refetchCurrentAppointment,
    refetchAppointmentSlots,
  } = useInstitutionDetail();

  // Refetch callback'i - hem current appointment hem de slots'u yenile
  const handleRefetchAfterChange = () => {
    refetchCurrentAppointment();
    refetchAppointmentSlots();
  };

  // Reschedule hook'unu kullan - başarılı işlemden sonra otomatik refetch
  const { rescheduleAppointment, isRescheduling, rescheduleError } =
    useAppointmentReschedule(handleRefetchAfterChange);

  // Cancel hook'unu kullan - başarılı işlemden sonra otomatik refetch
  const { cancelAppointment, isCancelling, cancelError } =
    useAppointmentCancel(handleRefetchAfterChange);

  const contextValue: CurrentAppointmentContextType = {
    currentAppointment,
    isLoading: currentAppointmentLoading,
    error: currentAppointmentError,
    refetch: refetchCurrentAppointment,
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
