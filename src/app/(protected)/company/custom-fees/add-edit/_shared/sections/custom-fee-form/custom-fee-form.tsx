"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { CustomFeeFormContent } from "./sections";
import {
  validationSchema as customFeeValidationSchema,
  initialValues as customFeeInitialValues,
} from "./schemas";
import { CustomFeeFormProps } from "./types/props";

/**
 * Custom fee form component
 */
export const CustomFeeForm: React.FC<CustomFeeFormProps> = ({
  className,
  isEditing,
  initialData,
}) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...customFeeInitialValues, ...initialData }
    : customFeeInitialValues;

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={customFeeValidationSchema}
      >
        <CustomFeeFormContent />
      </FormProvider>
    </div>
  );
};
