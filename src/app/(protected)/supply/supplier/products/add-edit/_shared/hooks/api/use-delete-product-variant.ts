"use client";

import { useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { useProductsContext } from "../../../../_shared/contexts";

interface UseDeleteProductVariantProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

/**
 * Product Variant silme hook'u
 */
export const useDeleteProductVariant = ({
  onSuccess,
  onError,
}: UseDeleteProductVariantProps = {}) => {
  const { currentProductId: productId, refetchCurrentProductVariants } =
    useProductsContext();

  // State to track current variant being deleted
  let currentVariantId: number | null = null;

  const {
    mutate,
    loading: isLoading,
    error,
  } = useDelete<void, void>(
    () =>
      API_ENDPOINTS.SUPPLY.PRODUCT_VARIANTS.DELETE(
        productId || 0,
        currentVariantId || 0,
      ),
    {
      onSuccess: () => {
        refetchCurrentProductVariants();
        onSuccess?.();
      },
      onError: (error) => {
        onError?.(error);
      },
    },
  );

  const deleteProductVariant = async (variantId: number) => {
    currentVariantId = variantId;
    return mutate();
  };

  return {
    deleteProductVariant,
    isLoading,
    error,
  };
};
