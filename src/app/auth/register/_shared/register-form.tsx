"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { RegisterProvider } from "./context";
import { RegisterFormContent } from "./components";
import { initialValues, registerValidationSchema } from "./schemas";

/**
 * Main Register Form Component
 * FormProvider ve RegisterProvider ile tüm formu sarar
 */
export const RegisterForm: React.FC = () => {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
    >
      <RegisterProvider>
        <RegisterFormContent />
      </RegisterProvider>
    </FormProvider>
  );
};
