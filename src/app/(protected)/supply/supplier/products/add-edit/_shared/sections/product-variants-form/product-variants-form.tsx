"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { ProductVariantFormContent } from "./sections";
import {
  validationSchema as variantValidationSchema,
  initialValues as variantInitialValues,
} from "./schemas";
import { ProductVariantsFormProps } from "./types/props";

/**
 * Product Variants form component
 */
export const ProductVariantsForm: React.FC<ProductVariantsFormProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <FormProvider
        initialValues={variantInitialValues}
        validationSchema={variantValidationSchema}
      >
        <ProductVariantFormContent />
      </FormProvider>
    </div>
  );
};
