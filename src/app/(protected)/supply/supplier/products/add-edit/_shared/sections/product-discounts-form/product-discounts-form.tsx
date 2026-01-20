"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { ProductDiscountFormContent } from "./sections";
import {
  validationSchema as discountValidationSchema,
  initialValues as discountInitialValues,
} from "./schemas";
import { ProductDiscountsFormProps } from "./types/props";

/**
 * Product Discounts form component
 */
export const ProductDiscountsForm: React.FC<ProductDiscountsFormProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <FormProvider
        initialValues={discountInitialValues}
        validationSchema={discountValidationSchema}
      >
        <ProductDiscountFormContent />
      </FormProvider>
    </div>
  );
};
