"use client";

import { useMemo, useState } from "react";
import { useGet } from "@/hooks";
import { ApiResponsePageProductDto } from "../api";
import { ProductResultDto, mapProductDtoToResult } from "../types";
import { mockProducts } from "../mock/mock-products";

/**
 * Ürün arama hook'u
 *
 * @param searchUrl - Arama URL'i (null ise istek atılmaz)
 * @param searchParams - Arama parametreleri
 * @returns Ürün listesi ve API durumu
 *
 * API Endpoint: GET /supply/products/search
 */
export const useProductsSearch = (
  searchUrl: string | null,
  searchParams?: Record<string, unknown>
) => {
  const [hasSearched, setHasSearched] = useState(false);

  const { data, loading, error, refetch } = useGet<ApiResponsePageProductDto>(
    searchUrl,
    {
      // params: searchParams,
      enabled: !!searchUrl,
      onSuccess: () => {
        setHasSearched(true);
      },
      onError: () => {
        setHasSearched(true);
      },
    }
  );

  const products = useMemo<ProductResultDto[]>(() => {
    if (!data?.data?.content) return [];
    return data.data.content.map((item) => mapProductDtoToResult(item as any));
  }, [data]);

  return {
    products: mockProducts,
    loading,
    error,
    refetch,
    hasSearched,
  };
};
