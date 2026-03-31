"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import {
  useSearchProducts,
  useCategoriesData,
  useSuppliersData,
} from "../hooks/api";
import {
  SearchProductsParams,
  ProductResultDto,
  mapProductDtoToResult,
} from "@/types/dto/supply/product.dto";
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

  // Actions
  search: (formValues: FormValues) => void;
  resetSearch: () => void;
  refetch: () => void;
}

interface ProductsProviderProps {
  children: React.ReactNode;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchProductsParams>();

  // API data - RFQ gibi basit yapı
  const { data, loading, error, refetch } = useSearchProducts(searchParams, {
    enabled: !!searchParams,
  });

  // Categories and Suppliers data
  const categories = useCategoriesData();
  const suppliers = useSuppliersData();

  // Transform data - memoize to prevent unnecessary re-renders
  const products: ProductResultDto[] = useMemo(
    () => data?.data?.content?.map((item) => mapProductDtoToResult(item)) || [],
    [data],
  );

  // searchParams değiştiğinde (ilk fetch hariç) refetch tetikle
  // useGet sadece url/enabled değişiminde fetch yapar, params değişimini yakalamaz
  const isFirstSearch = useRef(true);
  useEffect(() => {
    if (searchParams) {
      if (isFirstSearch.current) {
        isFirstSearch.current = false;
      } else {
        refetch();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Search action - sadece "Filtrele" butonuna basıldığında çalışır
  const search = useCallback((formValues: FormValues) => {
    const apiParams = createProductsApiParams(formValues);
    setSearchParams(cleanProductsApiParams(apiParams));
    setHasSearched(true);
  }, []);

  // Reset action
  const resetSearch = useCallback(() => {
    setSearchParams(undefined);
    setHasSearched(false);
  }, []);

  // Context value - memoize to prevent unnecessary re-renders of consumers
  const contextValue: ProductsContextValue = useMemo(
    () => ({
      hasSearched,
      searchParams,
      products,
      productsLoading: loading,
      productsError: error,
      categories: categories.data,
      categoriesLoading: categories.loading,
      suppliers: suppliers.data,
      suppliersLoading: suppliers.loading,
      search,
      resetSearch,
      refetch,
    }),
    [
      hasSearched,
      searchParams,
      products,
      loading,
      error,
      categories.data,
      categories.loading,
      suppliers.data,
      suppliers.loading,
      search,
      resetSearch,
      refetch,
    ],
  );

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
      "useProductsContext must be used within a ProductsProvider",
    );
  }
  return context;
}

export default ProductsContext;
