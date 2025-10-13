"use client";

import React from "react";
import { AppointmentProvider } from "./_shared/context/appointment-context";

const AppointmentLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AppointmentProvider>
      <>{children}</>
    </AppointmentProvider>
  );
};

export default AppointmentLayout;
