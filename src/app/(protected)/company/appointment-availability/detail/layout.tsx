import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppointmentDetailLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
