"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ProductImageDto, ApiResponseListProductImageDto } from "@/types";

interface UseProductImagesReturn {
  images: ProductImageDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre product images listesini getiren hook
 * @param id - Product ID'si
 * @returns Product images listesi ve yönetim fonksiyonları
 */
export const useProductImages = (id: number | null): UseProductImagesReturn => {
  const {
    data: imagesResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseListProductImageDto>(
    id ? API_ENDPOINTS.SUPPLY.PRODUCTS.IMAGES(id) : null,
  );

  return {
    images: imagesResponse?.data || [],
    isLoading,
    error,
    refetch,
  };
};
