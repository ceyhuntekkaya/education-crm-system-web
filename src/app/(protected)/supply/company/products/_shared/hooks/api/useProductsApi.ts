"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  SearchProductsParams,
  SearchProductsStatus,
  ApiResponsePageProductDto,
} from "@/types/dto/supply/product.dto";

// ================== API HOOKS ==================

/**
 * Ürün araması yapar
 *
 * @param params - Arama parametreleri
 * @param options - Hook seçenekleri
 * @returns Ürün listesi
 *
 * API Endpoint: GET /supply/products/search
 */
export const useSearchProducts = (
  params?: SearchProductsParams,
  options?: { enabled?: boolean }
) => {
  return useGet<ApiResponsePageProductDto>(
    params && options?.enabled !== false
      ? API_ENDPOINTS.SUPPLY.PRODUCTS.SEARCH
      : null,
    {
      params: params as Record<string, unknown>,
      enabled: options?.enabled ?? !!params,
    }
  );
};
