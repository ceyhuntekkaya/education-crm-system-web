"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { CampaignFormContent } from "./sections";
import {
  validationSchema as campaignValidationSchema,
  initialValues as campaignInitialValues,
} from "./schemas";
import { CampaignFormProps } from "./types/props";

/**
 * Campaign form component
 */
export const CampaignForm: React.FC<CampaignFormProps> = ({
  className,
  initialData,
}) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...campaignInitialValues, ...initialData }
    : campaignInitialValues;

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={campaignValidationSchema}
      >
        <CampaignFormContent />
      </FormProvider>
    </div>
  );
};
