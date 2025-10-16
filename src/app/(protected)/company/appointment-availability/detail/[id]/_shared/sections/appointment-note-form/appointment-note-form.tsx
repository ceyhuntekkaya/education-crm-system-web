"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { AppointmentNoteFormContent } from "./sections";
import {
  validationSchema as appointmentNoteValidationSchema,
  initialValues as appointmentNoteInitialValues,
} from "./schemas";
import CustomCard from "@/components/ui/custom-card";
import { AppointmentNoteFormProps } from "./types/props";

/**
 * Appointment note form component
 * Context'ten appointmentId'yi ve addNote fonksiyonunu kullanır
 */
export const AppointmentNoteForm: React.FC<AppointmentNoteFormProps> = ({
  className,
}) => {
  return (
    <CustomCard className={className} title="Yeni Randevu Notu">
      <FormProvider
        initialValues={appointmentNoteInitialValues}
        validationSchema={appointmentNoteValidationSchema}
      >
        <AppointmentNoteFormContent />
      </FormProvider>
    </CustomCard>
  );
};
