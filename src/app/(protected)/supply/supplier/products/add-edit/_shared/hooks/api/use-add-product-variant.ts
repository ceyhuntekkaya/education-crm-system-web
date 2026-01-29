"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ProductVariantDto, ProductVariantCreateDto } from "@/types";
import { useProductsContext } from "../../../../_shared/contexts";

interface UseAddProductVariantProps {
  onSuccess?: (data: ProductVariantDto) => void;
  onError?: (error: any) => void;
}

/**
 * Product Variant ekleme hook'u
 */
export const useAddProductVariant = ({
  onSuccess,
  onError,
}: UseAddProductVariantProps = {}) => {
  const { currentProductId: productId, refetchCurrentProductVariants } =
    useProductsContext();

  const endpoint = API_ENDPOINTS.SUPPLY.PRODUCT_VARIANTS.CREATE(productId || 0);

  const {
    mutate: postProductVariant,
    loading: isLoading,
    error,
  } = usePost<ProductVariantDto, ProductVariantCreateDto>(endpoint, {
    onSuccess: (data) => {
      refetchCurrentProductVariants();
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error("❌ Product Variant eklenirken hata:", error);
      onError?.(error);
    },
  });

  return {
    postProductVariant,
    isLoading,
    error,
  };
};
