"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/api";
import type {
  ApiResponseListProductVariantDto,
  ProductVariantDto,
} from "../../types";

interface UseProductVariantsReturn {
  variants: ProductVariantDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Ürün varyantlarını getiren hook
 * @param productId - Ürün ID'si
 * @returns Varyant verileri ve yönetim fonksiyonları
 */
export const useProductVariants = (
  productId: number
): UseProductVariantsReturn => {
  const {
    data: variantsResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseListProductVariantDto>(
    productId ? API_ENDPOINTS.SUPPLY.PRODUCTS.VARIANTS(productId) : null
  );

  const variants = variantsResponse?.data || [];

  return {
    variants,
    isLoading,
    error,
    refetch,
  };
};
