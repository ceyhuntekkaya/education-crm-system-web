"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { UserRegisterProvider } from "./context";
import { RegisterFormContent } from "./components";
import { initialValues, userRegisterValidationSchema } from "./schemas";

/**
 * Parent Register Form Component
 */
export const RegisterForm: React.FC = () => {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={userRegisterValidationSchema}
    >
      <UserRegisterProvider>
        <RegisterFormContent />
      </UserRegisterProvider>
    </FormProvider>
  );
};
