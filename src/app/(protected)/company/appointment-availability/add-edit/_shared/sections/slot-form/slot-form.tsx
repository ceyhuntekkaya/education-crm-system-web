"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { SlotFormContent } from "./sections";
import {
  validationSchema as slotValidationSchema,
  initialValues as slotInitialValues,
} from "./schemas";
import { SlotFormProps } from "./types/props";

/**
 * Appointment Slot form component
 */
export const SlotForm: React.FC<SlotFormProps> = ({
  className,
  initialData,
}) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...slotInitialValues, ...initialData }
    : slotInitialValues;

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={slotValidationSchema}
      >
        <SlotFormContent />
      </FormProvider>
    </div>
  );
};
