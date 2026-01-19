"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { RFQFormContent } from "./sections";
import {
  validationSchema as rfqValidationSchema,
  initialValues as rfqInitialValues,
} from "./schemas";
import { RFQFormProps } from "./types/props";
import { useRFQAddEdit } from "../../context";

/**
 * RFQ form component
 */
export const RFQForm: React.FC<RFQFormProps> = ({ className, initialData }) => {
  // Context'ten companyId'yi al
  const { companyId } = useRFQAddEdit();

  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...rfqInitialValues, ...initialData }
    : { ...rfqInitialValues, companyId };

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={rfqValidationSchema}
      >
        <RFQFormContent />
      </FormProvider>
    </div>
  );
};
