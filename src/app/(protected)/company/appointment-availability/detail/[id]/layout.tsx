"use client";

import React from "react";
import { useParams } from "next/navigation";
import { AppointmentDetailProvider } from "./_shared";

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppointmentDetailLayout({ children }: LayoutProps) {
  const { id } = useParams();
  const appointmentId = parseInt(id as string, 10);

  if (isNaN(appointmentId)) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="ph ph-warning-circle me-2"></i>
        Geçersiz randevu ID&apos;si.
      </div>
    );
  }

  return (
    <AppointmentDetailProvider appointmentId={appointmentId}>
      {children}
    </AppointmentDetailProvider>
  );
}
