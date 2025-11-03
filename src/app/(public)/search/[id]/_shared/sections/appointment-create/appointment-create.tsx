"use client";

import React from "react";
import { FormProvider } from "@/contexts";
import { AppointmentProvider } from "./contexts";
import { AppointmentFormContent } from "./components/appointment-form-content";
import { AppointmentCreateProps } from "./types";
import { createInitialValues } from "./schemas/initial-values-schema";
import { CustomCard } from "@/components";

/**
 * Main AppointmentCreate component with providers
 * This component serves as the entry point for appointment creation
 */
export const AppointmentCreate: React.FC<AppointmentCreateProps> = ({
  schoolId,
  isOnline = false,
}) => {
  // Schema'dan initial values oluştur
  const initialValues = createInitialValues(schoolId, isOnline);

  return (
    <CustomCard title="Randevu Oluştur">
      <FormProvider initialValues={initialValues}>
        <AppointmentProvider schoolId={schoolId} isOnline={isOnline}>
          <AppointmentFormContent />
        </AppointmentProvider>
      </FormProvider>
    </CustomCard>
  );
};
