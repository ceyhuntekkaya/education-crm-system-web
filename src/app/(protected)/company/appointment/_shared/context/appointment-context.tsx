"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { AppointmentContextType } from "../types";

const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({
  children,
}) => {
  const contextValue: AppointmentContextType = {
    // Context properties will be added here as needed
  };

  return (
    <AppointmentContext.Provider value={contextValue}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error(
      "useAppointment must be used within an AppointmentProvider"
    );
  }
  return context;
};
