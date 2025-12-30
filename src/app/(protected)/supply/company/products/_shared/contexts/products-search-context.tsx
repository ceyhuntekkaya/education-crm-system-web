"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useFormHook } from "@/hooks";
import {
  useProductsSearch,
  useCategoriesData,
  useSuppliersData,
} from "../hooks";
import {
  ProductsSearchContextValue,
  ProductsSearchProviderProps,
} from "../types";
import { SearchProductsParams } from "../api";

/**
 * 🔍 PRODUCTS SEARCH CONTEXT
 * Ürün arama için context
 */

const ProductsSearchContext = createContext<
  ProductsSearchContextValue | undefined
>(undefined);

export function ProductsSearchProvider({
  children,
}: ProductsSearchProviderProps) {
  const [searchUrl, setSearchUrl] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<Record<string, unknown>>({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // 📝 FORM MANAGEMENT
  const { values, resetForm } = useFormHook();

  // 📊 API DATA
  const categories = useCategoriesData();
  const suppliers = useSuppliersData();

  // 🔍 SEARCH
  const { products, loading, error, hasSearched } = useProductsSearch(
    searchUrl,
    searchParams
  );

  // 🔍 SEARCH ACTION
  const search = useCallback(async (data: SearchProductsParams) => {
    setSearchUrl("/supply/products/search");
    setSearchParams(data as Record<string, unknown>);
  }, []);

  // 🔄 RESET
  const resetSearch = useCallback(() => {
    setSearchUrl(null);
    setSearchParams({});
    resetForm();
  }, [resetForm]);

  // 🎯 CONTEXT VALUE
  const contextValue: ProductsSearchContextValue = {
    products,
    hasSearched,
    formValues: values,
    categories,
    suppliers,
    options: { categories, suppliers },
    sectionChanges: {},
    search,
    searchLoading: loading,
    searchError: error,
    resetSearch,
    viewMode,
    setViewMode,
  };

  return (
    <ProductsSearchContext.Provider value={contextValue}>
      {children}
    </ProductsSearchContext.Provider>
  );
}

export function useProductsSearchContext() {
  const context = useContext(ProductsSearchContext);
  if (context === undefined) {
    throw new Error(
      "useProductsSearchContext must be used within a ProductsSearchProvider"
    );
  }
  return context;
}

export default ProductsSearchContext;
