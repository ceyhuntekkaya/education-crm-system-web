"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ProductDto, ApiResponseDto } from "@/types";

interface UseProductByIdReturn {
  product: ProductDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Product detay bilgisi çeken hook
 */
export const useProductById = (
  productId: number | null,
): UseProductByIdReturn => {
  const {
    data: productResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<ProductDto>>(
    productId ? API_ENDPOINTS.SUPPLY.PRODUCTS.BY_ID(productId) : null,
    {
      enabled: !!productId,
    },
  );

  return {
    product: productResponse?.data || null,
    isLoading,
    error: error?.toString() || null,
    refetch,
  };
};
