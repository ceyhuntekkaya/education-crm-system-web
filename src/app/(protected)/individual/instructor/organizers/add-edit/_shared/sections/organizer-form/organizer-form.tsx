"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { OrganizerFormContent } from "./sections/organizer-form-content";
import { organizerSchema } from "./schemas";
import type { OrganizerFormProps } from "./types";
import { transformOrganizerToFormData } from "../../utils";

const initialValues = {
  name: "",
  type: "",
  description: "",
  logoUrl: "",
  website: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  socialMediaLinks: "",
  isVerified: false,
  isActive: true,
  slug: "",
};

export const OrganizerForm: React.FC<OrganizerFormProps> = ({
  className,
  initialData,
}) => {
  const formInitialValues = initialData
    ? { ...initialValues, ...transformOrganizerToFormData(initialData) }
    : initialValues;

  const formKey = React.useMemo(() => {
    if (!initialData) return "new";
    return `edit-${initialData.id || Date.now()}`;
  }, [initialData]);

  return (
    <div className={className}>
      <FormProvider
        key={formKey}
        initialValues={formInitialValues}
        validationSchema={organizerSchema}
      >
        <OrganizerFormContent />
      </FormProvider>
    </div>
  );
};
