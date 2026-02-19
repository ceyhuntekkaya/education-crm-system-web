"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { ApplicationNoteFormContent } from "./sections";
import { applicationNoteSchema } from "./schemas";
import type { ApplicationNoteFormProps } from "./types";

const initialValues = {
  noteText: "",
};

/**
 * Not ekleme formu
 */
export const ApplicationNoteForm: React.FC<ApplicationNoteFormProps> = ({
  className,
  onSuccess,
  onCancel,
}) => {
  return (
    <div className={className}>
      <FormProvider
        key="application-note-form"
        initialValues={initialValues}
        validationSchema={applicationNoteSchema}
      >
        <ApplicationNoteFormContent onSuccess={onSuccess} onCancel={onCancel} />
      </FormProvider>
    </div>
  );
};
