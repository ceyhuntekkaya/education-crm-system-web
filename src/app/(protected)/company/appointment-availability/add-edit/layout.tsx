"use client";

import React from "react";
import { SlotAddEditProvider } from "./_shared";

interface AppointmentAddEditRootLayoutProps {
  children: React.ReactNode;
}

const AppointmentAddEditRootLayout: React.FC<
  AppointmentAddEditRootLayoutProps
> = ({ children }) => {
  return <SlotAddEditProvider>{children}</SlotAddEditProvider>;
};

export default AppointmentAddEditRootLayout;
