"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { AppointmentAvailabilityRangeFormContent } from "./sections";
import { validationSchema, initialValues } from "./schemas";

/**
 * Randevu müsaitlik aralığı sorgulama form component'ı
 * Context üzerinden otomatik çalışır
 */
export const AppointmentAvailabilityRangeFilterForm: React.FC = () => {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <AppointmentAvailabilityRangeFormContent />
    </FormProvider>
  );
};
