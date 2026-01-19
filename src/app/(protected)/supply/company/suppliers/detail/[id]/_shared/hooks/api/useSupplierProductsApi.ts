"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponsePageProductSummaryDto,
  GetSupplierProductsParams,
  ProductSummaryDto,
} from "@/types";

export interface UseSupplierProductsApiReturn {
  products: ProductSummaryDto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  total: number;
}

/**
 * Tedarikçi ürünlerini getiren API hook'u
 *
 * @param supplierId - Tedarikçi ID'si
 * @param params - Arama parametreleri
 * @param options - Hook seçenekleri
 *
 * API Endpoint: GET /supply/suppliers/{id}/products
 */
export const useSupplierProductsApi = (
  supplierId: number,
  params?: GetSupplierProductsParams,
  options?: { enabled?: boolean }
): UseSupplierProductsApiReturn => {
  const { data, loading, error, refetch } =
    useGet<ApiResponsePageProductSummaryDto>(
      supplierId && supplierId > 0 && options?.enabled !== false
        ? API_ENDPOINTS.SUPPLY.SUPPLIERS.PRODUCTS(supplierId)
        : null,
      {
        params: params as Record<string, unknown>,
        enabled: options?.enabled ?? supplierId > 0,
      }
    );

  const products = data?.data?.content || [];
  const total = data?.data?.totalElements || 0;

  return {
    products,
    loading,
    error: error || null,
    refetch,
    total,
  };
};
