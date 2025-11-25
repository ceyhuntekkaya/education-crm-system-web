"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { RegisterProvider } from "./context";
import { RegisterFormContent } from "./components";
import { initialValues, registerValidationSchema } from "./schemas";
import { UserType } from "@/enums/UserType";

// UserType enum'ını direkt kullan
export type RegistrationType = UserType;

interface RegisterFormProps {
  registrationType?: RegistrationType;
}

/**
 * Main Register Form Component
 * FormProvider ve RegisterProvider ile tüm formu sarar
 */
export const RegisterForm: React.FC<RegisterFormProps> = ({
  registrationType = UserType.INSTITUTION_USER,
}) => {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
    >
      <RegisterProvider registrationType={registrationType}>
        <RegisterFormContent />
      </RegisterProvider>
    </FormProvider>
  );
};
