"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { QuotationFormContent } from "./sections";
import {
  validationSchema as quotationValidationSchema,
  initialValues as quotationInitialValues,
} from "./schemas";
import { QuotationFormProps } from "./types/props";

/**
 * Quotation form component - transforms QuotationDto to form data
 * Social media PostForm yapısı ile aynı mimari
 */
export const QuotationForm: React.FC<QuotationFormProps> = ({
  className,
  initialData,
}) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? {
        ...quotationInitialValues,
        rfqId: initialData.rfqId || "",
        supplierId: initialData.supplierId || "",
        totalAmount: initialData.totalAmount || "",
        currency: initialData.currency || "TRY",
        validUntil: initialData.validUntil || "", // API format: "2026-01-18"
        deliveryDays: initialData.deliveryDays || "",
        paymentTerms: initialData.paymentTerms || "",
        warrantyTerms: initialData.warrantyTerms || "",
        notes: initialData.notes || "",
      }
    : quotationInitialValues;

  // Debug: Form initial values kontrolü
  console.log("🔍 QuotationForm - initialData:", initialData);
  console.log("📋 QuotationForm - formInitialValues:", formInitialValues);

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={quotationValidationSchema}
      >
        <QuotationFormContent />
      </FormProvider>
    </div>
  );
};
