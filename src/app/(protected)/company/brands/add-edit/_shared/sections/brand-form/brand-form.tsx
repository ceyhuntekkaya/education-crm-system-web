"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { BrandFormContent } from "./sections";
import {
  validationSchema as brandValidationSchema,
  initialValues as brandInitialValues,
} from "./schemas";
import { BrandFormProps } from "./types/props";

/**
 * Brand form component
 */
export const BrandForm: React.FC<BrandFormProps> = ({
  className,
  initialData,
}) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...brandInitialValues, ...initialData }
    : brandInitialValues;

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={brandValidationSchema}
      >
        <BrandFormContent />
      </FormProvider>
    </div>
  );
};
