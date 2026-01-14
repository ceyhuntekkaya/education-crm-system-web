"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useFormHook } from "@/hooks";
import {
  useSearchProducts,
  useCategoriesData,
  useSuppliersData,
} from "../hooks/api";
import { SearchProductsParams } from "@/types/dto/supply/product.dto";
import { ProductResultDto, mapProductDtoToResult } from "../types";
import { createProductsApiParams, cleanProductsApiParams } from "../utils";
import { FormValues } from "@/types";

/**
 * 🔍 PRODUCTS CONTEXT
 * Basitleştirilmiş context - RFQ yapısına uygun
 */

interface ProductsContextValue {
  // Search state
  hasSearched: boolean;
  searchParams: SearchProductsParams | undefined;

  // Products data
  products: ProductResultDto[];
  productsLoading: boolean;
  productsError: any;

  // Categories data
  categories: any;
  categoriesLoading: boolean;

  // Suppliers data
  suppliers: any;
  suppliersLoading: boolean;

  // Form values
  formValues: Record<string, any>;

  // Actions
  search: (formValues: FormValues) => void;
  resetSearch: () => void;
  refetch: () => void;
}

interface ProductsProviderProps {
  children: React.ReactNode;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined
);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchProductsParams>();

  // Form management
  const { values, resetForm } = useFormHook();

  // API data - RFQ gibi basit yapı
  const { data, loading, error, refetch } = useSearchProducts(searchParams, {
    enabled: !!searchParams,
  });

  // Categories and Suppliers data
  const categories = useCategoriesData();
  const suppliers = useSuppliersData();

  // Transform data
  const products: ProductResultDto[] =
    data?.data?.content?.map((item) => mapProductDtoToResult(item)) || [];

  // Search action
  const search = useCallback((formValues: FormValues) => {
    const apiParams = createProductsApiParams(formValues);
    const cleanParams = cleanProductsApiParams(apiParams);
    setSearchParams(cleanParams);
    setHasSearched(true);
  }, []);

  // Reset action
  const resetSearch = useCallback(() => {
    setSearchParams(undefined);
    setHasSearched(false);
    resetForm();
  }, [resetForm]);

  // Context value
  const contextValue: ProductsContextValue = {
    hasSearched,
    searchParams,
    products,
    productsLoading: loading,
    productsError: error,
    categories: categories.data,
    categoriesLoading: categories.loading,
    suppliers: suppliers.data,
    suppliersLoading: suppliers.loading,
    formValues: values,
    search,
    resetSearch,
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
