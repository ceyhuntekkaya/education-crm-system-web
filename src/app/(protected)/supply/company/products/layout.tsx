"use client";

import React from "react";
import { FormProvider } from "@/contexts";
import {
  ProductsSearchProvider,
  initialProductsFilterValues,
  productsFilterValidationSchema,
} from "./_shared";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormProvider
      initialValues={initialProductsFilterValues}
      validationSchema={productsFilterValidationSchema}
    >
      <ProductsBridge>{children}</ProductsBridge>
    </FormProvider>
  );
}

const ProductsBridge = ({ children }: { children: React.ReactNode }) => {
  return <ProductsSearchProvider>{children}</ProductsSearchProvider>;
};
