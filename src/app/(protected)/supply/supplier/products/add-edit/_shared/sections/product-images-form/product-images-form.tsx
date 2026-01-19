"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { ProductImagesFormContent } from "./sections";
import { useProductAddEdit } from "../../context";

/**
 * Product Images Form Component
 * Ürün görsellerini yüklemek ve yönetmek için form
 */
export const ProductImagesForm: React.FC = () => {
  const { isEditing, productId } = useProductAddEdit();

  // Sadece düzenleme modunda göster
  if (!isEditing || !productId) {
    return null;
  }

  return (
    <FormProvider initialValues={{}}>
      <ProductImagesFormContent />
    </FormProvider>
  );
};
