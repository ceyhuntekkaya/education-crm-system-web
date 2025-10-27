"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { RegisterProvider } from "./context";
import { RegisterFormContent } from "./components";
import { initialValues, registerValidationSchema } from "./schemas";

export type RegistrationType = "institution" | "user";

interface RegisterFormProps {
  registrationType?: RegistrationType;
}

/**
 * Main Register Form Component
 * FormProvider ve RegisterProvider ile tüm formu sarar
 */
export const RegisterForm: React.FC<RegisterFormProps> = ({
  registrationType = "institution",
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
