"use client";

import React, { createContext, useContext } from "react";
import { useGetProductsBySupplier } from "../hooks/api";
import type { ProductDto } from "@/types";

/**
 * 🔍 PRODUCTS CONTEXT
 * Basitleştirilmiş context - sadece API verileri
 */

interface ProductsContextValue {
  products: ProductDto[];
  productsListLoading: boolean;
  productsListError: any;
  refetch: () => void;
}

interface ProductsProviderProps {
  children: React.ReactNode;
  supplierId: number;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined
);

export function ProductsProvider({
  children,
  supplierId,
}: ProductsProviderProps) {
  // 📊 API DATA - Sadece ham veriyi al
  const { data, loading, error, refetch } =
    useGetProductsBySupplier(supplierId);

  // Raw API verisini ProductDto[] formatına dönüştür
  const products: ProductDto[] = data?.data?.content || [];

  // 🎯 CONTEXT VALUE
  const contextValue: ProductsContextValue = {
    products,
    productsListLoading: loading,
    productsListError: error,
    refetch,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error(
      "useProductsContext must be used within a ProductsProvider"
    );
  }
  return context;
}

export default ProductsContext;
