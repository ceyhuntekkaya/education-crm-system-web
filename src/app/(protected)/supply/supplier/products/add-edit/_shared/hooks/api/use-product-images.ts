"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseListProductImageDto, ProductImageDto } from "@/types";

interface UseProductImagesReturn {
  images: ProductImageDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Product görsellerini çeken hook
 */
export const useProductImages = (
  productId: number | null,
): UseProductImagesReturn => {
  const {
    data: imagesResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseListProductImageDto>(
    productId ? API_ENDPOINTS.SUPPLY.PRODUCTS.IMAGES(productId) : null,
    {
      enabled: !!productId,
    },
  );

  return {
    images: imagesResponse?.data || [],
    isLoading,
    error: error?.toString() || null,
    refetch,
  };
};
