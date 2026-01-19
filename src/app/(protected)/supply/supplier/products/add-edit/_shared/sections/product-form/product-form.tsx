"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { ProductFormContent } from "./sections";
import {
  validationSchema as productValidationSchema,
  initialValues as productInitialValues,
} from "./schemas";
import { ProductFormProps } from "./types/props";
import { useProductAddEdit } from "../../context";
import { transformProductToFormData } from "../../utils";

/**
 * Product form component
 */
export const ProductForm: React.FC<ProductFormProps> = ({
  className,
  initialData,
}) => {
  // Context'ten supplierId'yi al
  const { supplierId } = useProductAddEdit();

  // Düzenleme modunda mevcut data varsa onu kullan, yoksa default değerleri kullan
  const formInitialValues = initialData
    ? { ...productInitialValues, ...transformProductToFormData(initialData) }
    : { ...productInitialValues, supplierId };

  return (
    <div className={className}>
      <FormProvider
        initialValues={formInitialValues}
        validationSchema={productValidationSchema}
      >
        <ProductFormContent />
      </FormProvider>
    </div>
  );
};
