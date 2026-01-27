"use client";

import React, { forwardRef } from "react";
import { FormProvider } from "@/contexts/form-context";
import { QuotationFormContent, QuotationFormHandle } from "./sections";
import {
  validationSchema as quotationValidationSchema,
  initialValues as quotationInitialValues,
} from "./schemas";
import { QuotationFormProps } from "./types/props";
import { useQuotationAddEdit } from "../../context";

/**
 * Quotation form component
 */
export const QuotationForm = forwardRef<
  QuotationFormHandle,
  QuotationFormProps
>(({ className, initialData }, ref) => {
  // Context'ten rfqId ve supplierId'yi al
  const { rfqId, supplierId } = useQuotationAddEdit();

  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...quotationInitialValues, ...initialData }
    : { ...quotationInitialValues, rfqId, supplierId };

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={quotationValidationSchema}
      >
        <QuotationFormContent ref={ref} />
      </FormProvider>
    </div>
  );
});

QuotationForm.displayName = "QuotationForm";
