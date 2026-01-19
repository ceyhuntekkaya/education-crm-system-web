"use client";

import { useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";

interface UseDeleteProductImageOptions {
  productId: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Product görseli silme hook'u
 */
export const useDeleteProductImage = ({
  productId,
  onSuccess,
  onError,
}: UseDeleteProductImageOptions) => {
  const {
    mutate: deleteProductImage,
    loading: isLoading,
    error,
  } = useDelete<ApiResponseDto<void>, number>(
    (imageId: number) => {
      return `${API_ENDPOINTS.SUPPLY.PRODUCTS.IMAGES(productId)}/${imageId}`;
    },
    {
      onSuccess: () => {
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
