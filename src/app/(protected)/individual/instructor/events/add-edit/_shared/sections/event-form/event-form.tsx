"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { EventFormContent } from "./sections/event-form-content";
import { eventSchema } from "./schemas";
import type { EventFormProps } from "./types";
import { transformEventToFormData } from "../../utils";

const initialValues = {
  organizerId: "",
  title: "",
  description: "",
  eventType: "",
  deliveryFormat: "",
  startDateTime: "",
  endDateTime: "",
  maxCapacity: "",
  location: "",
  onlineLink: "",
  targetAudience: "",
  speakerName: "",
  speakerBio: "",
  coverImageUrl: "",
  registrationDeadline: "",
  categoryId: "",
  autoApproveRegistration: true,
  certificateEnabled: false,
  certificateTemplateUrl: "",
  status: "DRAFT",
};

export const EventForm: React.FC<EventFormProps> = ({
  className,
  initialData,
}) => {
  const formInitialValues = initialData
    ? { ...initialValues, ...transformEventToFormData(initialData) }
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
        validationSchema={eventSchema}
      >
        <EventFormContent />
      </FormProvider>
    </div>
  );
};
