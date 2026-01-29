"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ProductVariantDto, ApiResponseListProductVariantDto } from "@/types";

interface UseProductVariantsReturn {
  variants: ProductVariantDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  activeVariants: ProductVariantDto[];
  hasActiveVariants: boolean;
}

/**
 * Ürün varyantlarını getiren hook
 * @param productId - Ürün ID'si
 * @returns Varyant verileri ve yönetim fonksiyonları
 */
export const useProductVariants = (
  productId: number | null,
): UseProductVariantsReturn => {
  const {
    data: variantResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseListProductVariantDto>(
    productId ? API_ENDPOINTS.SUPPLY.PRODUCT_VARIANTS.LIST(productId) : null,
  );

  const variants = variantResponse?.data || [];

  // Aktif varyantları filtrele
  const activeVariants = variants.filter(
    (variant: ProductVariantDto) => variant.isActive,
  );

  return {
    variants,
    isLoading,
    error,
    refetch,
    activeVariants,
    hasActiveVariants: activeVariants.length > 0,
  };
};
