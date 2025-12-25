"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, ProductDto } from "@/types";

interface UseProductByIdReturn {
  product: ProductDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir product verisi getiren hook
 * @param id - Product ID'si
 * @returns Product verisi ve yönetim fonksiyonları
 */
export const useProductById = (id: number): UseProductByIdReturn => {
  const {
    data: productResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<ProductDto>>(
    id ? API_ENDPOINTS.SUPPLY.PRODUCTS.BY_ID(id) : null
  );

  return {
    product: productResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
