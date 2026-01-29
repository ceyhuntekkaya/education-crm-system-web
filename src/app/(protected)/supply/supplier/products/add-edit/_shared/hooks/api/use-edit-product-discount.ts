"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ProductDiscountDto, ProductDiscountUpdateDto } from "@/types";
import { useProductsContext } from "../../../../_shared/contexts";

interface UseEditProductDiscountProps {
  onSuccess?: (data: ProductDiscountDto) => void;
  onError?: (error: any) => void;
}

interface EditProductDiscountPayload extends ProductDiscountUpdateDto {
  discountId: number;
}

/**
 * Product Discount güncelleme hook'u
 */
export const useEditProductDiscount = ({
  onSuccess,
  onError,
}: UseEditProductDiscountProps = {}) => {
  const { currentProductId: productId, refetchCurrentProductDiscounts } =
    useProductsContext();
  const {
    mutate,
    loading: isLoading,
    error,
  } = usePut<ProductDiscountDto, EditProductDiscountPayload>(
    (payload: EditProductDiscountPayload) =>
      API_ENDPOINTS.SUPPLY.PRODUCT_DISCOUNTS.UPDATE(
        productId || 0,
        payload.discountId,
      ),
    {
      onSuccess: (data) => {
        refetchCurrentProductDiscounts();
        onSuccess?.(data);
      },
      onError: (error) => {
        onError?.(error);
      },
    },
  );

  const updateProductDiscount = async (
    discountId: number,
    data: ProductDiscountUpdateDto,
  ) => {
    return mutate({ ...data, discountId });
  };

  return {
    updateProductDiscount,
    isLoading,
    error,
  };
};
