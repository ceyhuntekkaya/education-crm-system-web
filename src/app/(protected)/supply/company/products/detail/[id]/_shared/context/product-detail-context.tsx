"use client";

import React, { createContext, useContext, useState } from "react";
import { useProductById, useSupplierById } from "../hooks/api";
import { useProductComputedValues } from "../hooks";
import {
  ProductDetailContextValue,
  ProductDetailProviderProps,
} from "../types";
import { TabType } from "../types";

const ProductDetailContext = createContext<
  ProductDetailContextValue | undefined
>(undefined);

export const ProductDetailProvider: React.FC<ProductDetailProviderProps> = ({
  children,
  productId,
}) => {
  const { product, isLoading, error, refetch } = useProductById(productId);

  // Product yüklendikten sonra supplierId ile supplier bilgisini çek
  const {
    supplier,
    isLoading: isLoadingSupplier,
    error: supplierError,
    refetch: refetchSupplier,
  } = useSupplierById(product?.supplierId);

  // UI State
  const [activeTab, setActiveTab] = useState<TabType>("details");

  // Helper değerleri hesapla
  const {
    statusInfo,
    stockInfo,
    priceWithTax,
    isLowStock,
    isOutOfStock,
    hasValidId,
  } = useProductComputedValues(product, productId);

  const contextValue: ProductDetailContextValue = {
    productId,
    product,
    supplier,
    isLoading,
    isLoadingSupplier,
    error,
    supplierError,
    refetch,
    refetchSupplier,
    statusInfo,
    stockInfo,
    priceWithTax,
    isLowStock,
    isOutOfStock,
    hasValidId,
    activeTab,
    setActiveTab,
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
