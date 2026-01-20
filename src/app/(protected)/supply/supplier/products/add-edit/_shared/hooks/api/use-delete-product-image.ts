"use client";

import { useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { useProductsContext } from "../../../../_shared/contexts";

interface UseDeleteProductImageOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Product görseli silme hook'u
 */
export const useDeleteProductImage = ({
  onSuccess,
  onError,
}: UseDeleteProductImageOptions = {}) => {
  const { currentProductId: productId, refetchCurrentProductImages } =
    useProductsContext();
  const {
    mutate: deleteProductImage,
    loading: isLoading,
    error,
  } = useDelete<ApiResponseDto<void>, number>(
    (imageId: number) => {
      return `${API_ENDPOINTS.SUPPLY.PRODUCTS.IMAGES(productId || 0)}/${imageId}`;
    },
    {
      onSuccess: () => {
        refetchCurrentProductImages();
        onSuccess?.();
      },
      onError: (error) => {
        console.error("❌ Product görseli silinirken hata:", error);
        onError?.(error);
      },
    },
  );

  return {
    deleteProductImage,
    isLoading,
    error,
  };
};
