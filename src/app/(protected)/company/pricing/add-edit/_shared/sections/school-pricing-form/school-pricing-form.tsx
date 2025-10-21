"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { SchoolPricingFormContent } from "./sections";
import {
  validationSchema as schoolPricingValidationSchema,
  initialValues as schoolPricingInitialValues,
} from "./schemas";
import { SchoolPricingFormProps } from "./types/props";

/**
 * School pricing form component
 */
export const SchoolPricingForm: React.FC<SchoolPricingFormProps> = ({
  className,
  isEditing = false,
  initialData,
}) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...schoolPricingInitialValues, ...initialData }
    : schoolPricingInitialValues;

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={schoolPricingValidationSchema}
      >
        <SchoolPricingFormContent />
      </FormProvider>
    </div>
  );
};
