"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { ProductAddEditContextType } from "../types";
import {
  useProductById,
  useAddProduct,
  useEditProduct,
  useCategoryOptions,
} from "../hooks";
import { isValidEditId, parseEditId } from "../utils";
import { useProductsContext } from "../../../_shared/contexts";

/**
 * ProductAddEditContext
 */
const ProductAddEditContext = createContext<
  ProductAddEditContextType | undefined
>(undefined);

interface ProductAddEditProviderProps {
  children: ReactNode;
}

export const ProductAddEditProvider: React.FC<ProductAddEditProviderProps> = ({
  children,
}) => {
  // Supplier ID - TODO: Get from auth context
  const supplierId = 1;
  const params = useParams();
  const { id } = params;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const productId = parseEditId(id);

  // Product data hook
  const {
    product,
    isLoading: productLoading,
    error: productError,
    refetch,
  } = useProductById(productId);

  // Add Product hook
  const {
    postProduct,
    isLoading: addLoading,
    error: addError,
  } = useAddProduct();

  // Edit Product hook - refetch'i props olarak geçir
  const {
    putProduct,
    isLoading: editLoading,
    error: editError,
  } = useEditProduct({
    productId: productId || 0,
    refetch: isEditing ? refetch : undefined,
  });

  // Category options hook
  const { categoryOptions, isLoading: categoriesLoading } =
    useCategoryOptions();

  const contextValue: ProductAddEditContextType = {
    // Supplier ID
    supplierId,

    // Current Product data
    product: product || null,
    productDetailLoading: productLoading, // Sadece veri çekerken
    productSubmitLoading: addLoading || editLoading, // Form submit edilirken
    productError:
      productError?.toString() ||
      addError?.toString() ||
      editError?.toString() ||
      null,

    // Edit mode state
    isEditing,
    productId: productId?.toString() || null,

    // Category options
    categoryOptions,
    categoriesLoading,

    // Actions
    fetchProduct: refetch,
    postProduct,
    putProduct,
  };

  return (
    <ProductAddEditContext.Provider value={contextValue}>
      {children}
    </ProductAddEditContext.Provider>
  );
};

export const useProductAddEdit = () => {
  const context = useContext(ProductAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useProductAddEdit must be used within a ProductAddEditProvider",
    );
  }
  return context;
};
