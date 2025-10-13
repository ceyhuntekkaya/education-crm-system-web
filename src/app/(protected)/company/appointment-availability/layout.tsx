"use client";

import React from "react";
import { AppointmentAvailabilityProvider } from "./_shared/context/appointment-context";

const AppointmentAvailabilityLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <AppointmentAvailabilityProvider>
      <>{children}</>
    </AppointmentAvailabilityProvider>
  );
};

export default AppointmentAvailabilityLayout;
