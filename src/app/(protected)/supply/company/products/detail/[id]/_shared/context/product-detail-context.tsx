"use client";

import React, { createContext, useContext } from "react";
import { useProductById } from "../hooks/use-product-by-id";
import {
  ProductDetailContextValue,
  ProductDetailProviderProps,
} from "../types";

const ProductDetailContext = createContext<
  ProductDetailContextValue | undefined
>(undefined);

export const ProductDetailProvider: React.FC<ProductDetailProviderProps> = ({
  children,
  productId,
}) => {
  const { product, isLoading, error, refetch } = useProductById(productId);

  const contextValue: ProductDetailContextValue = {
    productId,
    product,
    isLoading,
    error,
    refetch,
  };

  return (
    <ProductDetailContext.Provider value={contextValue}>
      {children}
    </ProductDetailContext.Provider>
  );
};

/**
 * ProductDetail context'ini kullanmak için hook
 */
export const useProductDetail = (): ProductDetailContextValue => {
  const context = useContext(ProductDetailContext);
  if (context === undefined) {
    throw new Error(
      "useProductDetail must be used within a ProductDetailProvider"
    );
  }
  return context;
};
