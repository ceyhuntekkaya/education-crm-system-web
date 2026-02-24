"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { RegistrationFormContent } from "./sections";
import { registrationSchema } from "./schemas";
import type { RegistrationFormProps } from "./types";

const initialValues = {
  registrationNote: "",
};

/**
 * Etkinlik kayıt formu — FormProvider ile sarar (Company)
 */
export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <FormProvider
        key="registration-form"
        initialValues={initialValues}
        validationSchema={registrationSchema}
      >
        <RegistrationFormContent />
      </FormProvider>
    </div>
  );
};
