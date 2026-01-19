"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { ItemFormContent } from "./sections";
import {
  validationSchema as itemValidationSchema,
  initialValues as itemInitialValues,
} from "./schemas";
import { ItemFormProps } from "./types/props";

/**
 * RFQ Item form component
 */
export const ItemForm: React.FC<ItemFormProps> = ({
  className,
  initialData,
}) => {
  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  // categoryId'yi string'e çevir (autocomplete için)
  const formInitialValues = initialData
    ? {
        ...itemInitialValues,
        ...initialData,
        categoryId: initialData.categoryId?.toString() || undefined,
      }
    : itemInitialValues;

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={itemValidationSchema}
      >
        <ItemFormContent />
      </FormProvider>
    </div>
  );
};
