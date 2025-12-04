"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { ContactFormContent } from "./sections";
import { validationSchema, initialValues } from "./schemas";

interface ContactFormProps {
  className?: string;
}

/**
 * Contact form component
 * Kurumlar için iletişim formu
 */
export const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  return (
    <div className={className}>
      <FormProvider
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <ContactFormContent />
      </FormProvider>
    </div>
  );
};
