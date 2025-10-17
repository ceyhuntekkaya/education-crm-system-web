"use client";

import React, { createContext, useContext } from "react";
import { useAppointmentById } from "../hooks/use-appointment-by-id";
import { useAppointmentSections } from "../hooks/use-appointment-sections";
import { useAddAppointmentNote } from "../hooks/use-add-appointment-note";
import { useAppointmentNotes } from "../hooks/use-appointment-notes";
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
  const {
    appointment,
    isLoading: appointmentDetailLoading,
    error: appointmentDetailError,
    refetch: refetchAppointment,
  } = useAppointmentById(appointmentId);

  const allSections = useAppointmentSections(appointment);

  const {
    notes,
    isLoading: appointmentNotesLoading,
    error: appointmentNotesError,
    refetch: refetchNotes,
  } = useAppointmentNotes(appointmentId);

  const {
    addNote,
    isLoading: noteAddLoading,
    error: noteAddError,
  } = useAddAppointmentNote(appointmentId, refetchNotes);

  const contextValue: AppointmentDetailContextValue = {
    appointmentId,
    appointment,
    appointmentDetailLoading,
    appointmentDetailError,
    refetchAppointment,
    allSections,
    addNote,
    noteAddLoading,
    noteAddError,
    notes,
    appointmentNotesLoading,
    appointmentNotesError,
    refetchNotes,
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
