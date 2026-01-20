"use client";

import { useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { useProductsContext } from "../../../../_shared/contexts";

interface UseDeleteProductDiscountProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

/**
 * Product Discount silme hook'u
 */
export const useDeleteProductDiscount = ({
  onSuccess,
  onError,
}: UseDeleteProductDiscountProps = {}) => {
  const { currentProductId: productId, refetchCurrentProductDiscounts } =
    useProductsContext();
  const {
    mutate,
    loading: isLoading,
    error,
  } = useDelete<void, number>(
    (discountId: number) =>
      API_ENDPOINTS.SUPPLY.PRODUCT_DISCOUNTS.DELETE(productId || 0, discountId),
    {
      onSuccess: () => {
        refetchCurrentProductDiscounts();
        onSuccess?.();
      },
      onError: (error) => {
        onError?.(error);
      },
    },
  );

  const deleteProductDiscount = async (discountId: number) => {
    return mutate(discountId);
  };

  return {
    deleteProductDiscount,
    isLoading,
    error,
  };
};
