"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { PasswordChangeFormContent } from "./sections";
import {
  validationSchema as passwordValidationSchema,
  getInitialValues,
} from "./schemas";
import { ChangePasswordSectionProps } from "./types/props";

/**
 * Password change form component
 */
export const ChangePasswordSection: React.FC<ChangePasswordSectionProps> = ({
  className,
  initialData,
  isEditing = false,
}) => {
  // Initial values'u al
  const baseInitialValues = getInitialValues();

  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...baseInitialValues, ...initialData }
    : baseInitialValues;

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={passwordValidationSchema}
      >
        <PasswordChangeFormContent />
      </FormProvider>
    </div>
  );
};
