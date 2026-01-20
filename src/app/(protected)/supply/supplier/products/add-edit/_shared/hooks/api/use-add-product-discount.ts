"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ProductDiscountDto, ProductDiscountCreateDto } from "@/types";
import { useProductsContext } from "../../../../_shared/contexts";

interface UseAddProductDiscountProps {
  onSuccess?: (data: ProductDiscountDto) => void;
  onError?: (error: any) => void;
}

/**
 * Product Discount ekleme hook'u
 */
export const useAddProductDiscount = ({
  onSuccess,
  onError,
}: UseAddProductDiscountProps = {}) => {
  const { currentProductId: productId, refetchCurrentProductDiscounts } =
    useProductsContext();

  const endpoint = API_ENDPOINTS.SUPPLY.PRODUCT_DISCOUNTS.CREATE(
    productId || 0,
  );

  const {
    mutate: postProductDiscount,
    loading: isLoading,
    error,
  } = usePost<ProductDiscountDto, ProductDiscountCreateDto>(endpoint, {
    onSuccess: (data) => {
      refetchCurrentProductDiscounts();
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error("❌ Product Discount eklenirken hata:", error);
      onError?.(error);
    },
  });

  return {
    postProductDiscount,
    isLoading,
    error,
  };
};
