"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ProductVariantDto, ProductVariantUpdateDto } from "@/types";
import { useProductsContext } from "../../../../_shared/contexts";

interface UseEditProductVariantProps {
  onSuccess?: (data: ProductVariantDto) => void;
  onError?: (error: any) => void;
}

/**
 * Product Variant güncelleme hook'u
 */
export const useEditProductVariant = ({
  onSuccess,
  onError,
}: UseEditProductVariantProps = {}) => {
  const { currentProductId: productId, refetchCurrentProductVariants } =
    useProductsContext();

  // State to track current variant being edited
  let currentVariantId: number | null = null;

  const {
    mutate,
    loading: isLoading,
    error,
  } = usePut<ProductVariantDto, ProductVariantUpdateDto>(
    () =>
      API_ENDPOINTS.SUPPLY.PRODUCT_VARIANTS.UPDATE(
        productId || 0,
        currentVariantId || 0,
      ),
    {
      onSuccess: (data) => {
        refetchCurrentProductVariants();
        onSuccess?.(data);
      },
      onError: (error) => {
        onError?.(error);
      },
    },
  );

  const updateProductVariant = async (
    variantId: number,
    data: ProductVariantUpdateDto,
  ) => {
    currentVariantId = variantId;
    // Sadece ProductVariantUpdateDto'yu gönder, variantId'yi payload'a ekleme
    return mutate(data);
  };

  return {
    updateProductVariant,
    isLoading,
    error,
  };
};
