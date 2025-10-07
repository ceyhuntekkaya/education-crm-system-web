"use client";

import React from "react";
import {
  CurrentAppointmentProvider,
  useCurrentAppointmentContext,
} from "./context/current-appointment-context";
import {
  LoadingState,
  ErrorState,
  EmptyState,
  AppointmentContent,
} from "./sections";
import { CurrentAppointmentProps } from "./types";

const CurrentAppointmentContent: React.FC = () => {
  const { currentAppointment, isLoading, error, refetch } =
    useCurrentAppointmentContext();

  // Loading State
  if (isLoading) {
    return <LoadingState />;
  }

  // Error State
  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  // Empty State
  if (!currentAppointment) {
    return <EmptyState />;
  }

  // Success State - Show Appointment
  return <AppointmentContent appointment={currentAppointment} />;
};

const CurrentAppointment: React.FC<CurrentAppointmentProps> = ({
  institutionId,
}) => {
  return (
    <CurrentAppointmentProvider institutionId={institutionId}>
      <CurrentAppointmentContent />
    </CurrentAppointmentProvider>
  );
};

export default CurrentAppointment;
