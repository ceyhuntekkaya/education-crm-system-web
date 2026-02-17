"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { ApplicationFormContent } from "./sections";
import { applicationSchema } from "./schemas";
import type { ApplicationFormProps } from "./types";

const initialValues = {
  coverLetter: "",
};

/**
 * İş ilanına başvuru formu
 */
export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <FormProvider
        key="application-form"
        initialValues={initialValues}
        validationSchema={applicationSchema}
      >
        <ApplicationFormContent />
      </FormProvider>
    </div>
  );
};
