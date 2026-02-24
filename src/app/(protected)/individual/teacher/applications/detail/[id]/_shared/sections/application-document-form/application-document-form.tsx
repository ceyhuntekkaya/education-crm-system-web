"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { ApplicationDocumentFormContent } from "./sections";
import { applicationDocumentSchema } from "./schemas";
import type { ApplicationDocumentFormProps } from "./types";

const initialValues = {
  documentUrl: "",
  documentMetadata: null,
};

/**
 * Belge ekleme formu
 */
export const ApplicationDocumentForm: React.FC<
  ApplicationDocumentFormProps
> = ({ className, onSuccess, onCancel }) => {
  return (
    <div className={className}>
      <FormProvider
        key="application-document-form"
        initialValues={initialValues}
        validationSchema={applicationDocumentSchema}
      >
        <ApplicationDocumentFormContent
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </FormProvider>
    </div>
  );
};
