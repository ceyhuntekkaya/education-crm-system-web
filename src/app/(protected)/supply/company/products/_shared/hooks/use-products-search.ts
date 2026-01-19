"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchProductsParams } from "@/types/dto/supply/product.dto";
import { ProductResultDto, mapProductDtoToResult } from "../types";
import { apiClient } from "@/lib/api";

/**
 * Ürün arama hook'u - Gerçek API kullanımı
 *
 * @param searchParams - Arama parametreleri
 * @param enabled - API call'ın aktif olup olmayacağı
 * @returns Ürün listesi ve API durumu
 *
 * API Endpoint: GET /supply/products/search
 */
export const useProductsSearch = (
  searchParams?: SearchProductsParams,
  enabled: boolean = false
) => {
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const executeSearch = async () => {
    if (!enabled || !searchParams) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get("/supply/products/search", {
        params: {
          searchTerm: searchParams.searchTerm,
          categoryId: searchParams.categoryId,
          supplierId: searchParams.supplierId,
          status: searchParams.status,
          minPrice: searchParams.minPrice,
          maxPrice: searchParams.maxPrice,
          page: searchParams.page || 0,
          size: searchParams.size || 20,
        },
      });
      setData(response.data);
      setHasSearched(true);
    } catch (err) {
      setError(err);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled && searchParams) {
      executeSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, JSON.stringify(searchParams)]);

  const products = useMemo<ProductResultDto[]>(() => {
    if (!data?.data?.content) return [];
    return data.data.content.map((item: any) => mapProductDtoToResult(item));
  }, [data]);

  const refetch = () => {
    executeSearch();
  };

  return {
    products,
    loading,
    error,
    refetch,
    hasSearched,
    totalElements: data?.data?.totalElements || 0,
    totalPages: data?.data?.totalPages || 0,
    currentPage: data?.data?.number || 0,
    pageSize: data?.data?.size || 20,
  };
};
