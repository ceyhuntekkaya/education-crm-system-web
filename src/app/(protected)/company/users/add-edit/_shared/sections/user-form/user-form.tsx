"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { UserFormContent } from "./sections";
import {
  validationSchema as userValidationSchema,
  initialValues as userInitialValues,
} from "./schemas";
import { UserFormProps } from "./types/props";

/**
 * User form component
 */
export const UserForm: React.FC<UserFormProps> = ({
  className,
  initialData,
  isEditing = false,
}) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...userInitialValues, ...initialData }
    : userInitialValues;

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={userValidationSchema}
      >
        <UserFormContent />
      </FormProvider>
    </div>
  );
};
