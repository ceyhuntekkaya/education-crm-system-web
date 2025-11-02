"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { useAuth } from "@/contexts/auth-context";
import { UserFormContent } from "./sections";
import {
  validationSchema as userValidationSchema,
  getInitialValues,
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
  const { user: authUser } = useAuth();

  // Initial values'u authUser ile al
  const baseInitialValues = getInitialValues(authUser);

  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...baseInitialValues, ...initialData }
    : baseInitialValues;

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
