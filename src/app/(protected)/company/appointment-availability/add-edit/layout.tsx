"use client";

import React from "react";

interface AppointmentAddEditRootLayoutProps {
  children: React.ReactNode;
}

const AppointmentAddEditRootLayout: React.FC<
  AppointmentAddEditRootLayoutProps
> = ({ children }) => {
  return <div>{children}</div>;
};

export default AppointmentAddEditRootLayout;
