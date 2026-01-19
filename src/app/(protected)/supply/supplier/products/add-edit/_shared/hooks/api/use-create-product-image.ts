"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ProductImageDto,
  ProductImageCreateDto,
  ApiResponseProductImageDto,
} from "@/types";

interface UseCreateProductImageOptions {
  productId: number;
  onSuccess?: (data: ProductImageDto) => void;
  onError?: (error: string) => void;
}

/**
 * Product görseli ekleme hook'u
 */
export const useCreateProductImage = ({
  productId,
  onSuccess,
  onError,
}: UseCreateProductImageOptions) => {
  const {
    mutate: createProductImage,
    loading: isLoading,
    error,
  } = usePost<ApiResponseProductImageDto, ProductImageCreateDto>(
    API_ENDPOINTS.SUPPLY.PRODUCTS.IMAGES(productId),
    {
      onSuccess: (data) => {
        if (data?.data) {
          onSuccess?.(data.data);
        }
      },
      onError: (error) => {
        console.error("❌ Product görseli eklenirken hata:", error);
        onError?.(error);
      },
    },
  );

  return {
    createProductImage,
    isLoading,
    error,
  };
};
