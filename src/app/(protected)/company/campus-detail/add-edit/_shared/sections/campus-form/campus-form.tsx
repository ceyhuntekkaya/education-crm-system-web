"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { CampusFormContent } from "./sections";
import {
  validationSchema as campusValidationSchema,
  initialValues as campusInitialValues,
} from "./schemas";
import { CampusFormProps } from "./types/props";

/**
 * Campus form component
 */
export const CampusForm: React.FC<CampusFormProps> = ({
  className,
  initialData,
}) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...campusInitialValues, ...initialData }
    : campusInitialValues;

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={campusValidationSchema}
      >
        <CampusFormContent />
      </FormProvider>
    </div>
  );
};
