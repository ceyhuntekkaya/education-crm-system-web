"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { TeacherRegisterProvider } from "./context";
import { RegisterFormContent } from "./components";
import { getInitialValues, teacherRegisterValidationSchema } from "./schemas";
import { UserType } from "@/enums/UserType";

export type RegistrationType = UserType.TEACHER | UserType.INSTRUCTOR;

interface RegisterFormProps {
  registrationType: RegistrationType;
}

/**
 * Teacher/Instructor Register Form Component
 */
export const RegisterForm: React.FC<RegisterFormProps> = ({
  registrationType,
}) => {
  const initialValues = getInitialValues(registrationType);

  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={teacherRegisterValidationSchema}
    >
      <TeacherRegisterProvider registrationType={registrationType}>
        <RegisterFormContent />
      </TeacherRegisterProvider>
    </FormProvider>
  );
};
