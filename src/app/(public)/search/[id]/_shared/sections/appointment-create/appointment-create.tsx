"use client";

import React from "react";
import { FormProvider } from "@/contexts";
import { AppointmentProvider } from "./contexts";
import { AppointmentFormContent } from "./components/appointment-form-content";

interface AppointmentCreateProps {
  schoolId: number;
  isOnline?: boolean;
}

/**
 * Main AppointmentCreate component with providers
 * This component serves as the entry point for appointment creation
 */
export const AppointmentCreate: React.FC<AppointmentCreateProps> = ({
  schoolId,
  isOnline = false,
}) => {
  const initialValues = {
    schoolId,
    isOnline,
    communicationPreference: "EMAIL" as const,
    agreedToTerms: false,
  };

  return (
    <AppointmentProvider schoolId={schoolId} isOnline={isOnline}>
      <FormProvider initialValues={initialValues}>
        <AppointmentFormContent />
      </FormProvider>
    </AppointmentProvider>
  );
};
