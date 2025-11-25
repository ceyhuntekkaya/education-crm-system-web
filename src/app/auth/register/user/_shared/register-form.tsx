"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { UserRegisterProvider } from "./context";
import { RegisterFormContent } from "./components";
import { initialValues, userRegisterValidationSchema } from "./schemas";
import { UserType } from "@/enums/UserType";

export type RegistrationType = UserType;

interface RegisterFormProps {
  registrationType?: RegistrationType;
}

/**
 * User Register Form Component
 */
export const RegisterForm: React.FC<RegisterFormProps> = ({
  registrationType = UserType.PARENT,
}) => {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={userRegisterValidationSchema}
    >
      <UserRegisterProvider registrationType={registrationType}>
        <RegisterFormContent />
      </UserRegisterProvider>
    </FormProvider>
  );
};
