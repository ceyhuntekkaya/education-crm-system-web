"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { RFQFormContent } from "./sections";
import {
  validationSchema as rfqValidationSchema,
  initialValues as rfqInitialValues,
} from "./schemas";
import { RFQFormProps } from "./types/props";

/**
 * RFQ form component
 */
export const RFQForm: React.FC<RFQFormProps> = ({ className, initialData }) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...rfqInitialValues, ...initialData }
    : rfqInitialValues;

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={rfqValidationSchema}
      >
        <RFQFormContent />
      </FormProvider>
    </div>
  );
};
