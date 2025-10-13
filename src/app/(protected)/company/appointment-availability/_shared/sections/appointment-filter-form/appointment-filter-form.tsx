"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { AppointmentAvailabilityFormContent } from "./sections";
import { validationSchema, initialValues } from "./schemas";

/**
 * Randevu müsaitlik sorgulama form component'ı
 * Context üzerinden otomatik çalışır
 */
export const AppointmentAvailabilityFilterForm: React.FC = () => {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <AppointmentAvailabilityFormContent />
    </FormProvider>
  );
};
