"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponsePageProductDto,
  GetProductsBySupplierParams,
} from "@/types";

// ================== API HOOKS ==================

/**
 * Tedarikçiye ait ürünleri getirir
 *
 * @param supplierId - Tedarikçi ID'si
 * @param params - Sayfalama parametreleri
 * @returns Ürün listesi
 *
 * API Endpoint: GET /supply/products/by-supplier/{supplierId}
 */
export const useGetProductsBySupplier = (
  supplierId: number,
  params?: GetProductsBySupplierParams,
  options?: { enabled?: boolean }
) => {
  return useGet<ApiResponsePageProductDto>(
    supplierId ? API_ENDPOINTS.SUPPLY.PRODUCTS.BY_SUPPLIER(supplierId) : null,
    {
      params: params as Record<string, unknown>,
      enabled: options?.enabled ?? !!supplierId,
    }
  );
};
