"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ProductImageDto,
  ProductImageCreateDto,
  ApiResponseProductImageDto,
} from "@/types";
import { useProductsContext } from "../../../../_shared/contexts";

interface UseCreateProductImageOptions {
  onSuccess?: (data: ProductImageDto) => void;
  onError?: (error: string) => void;
}

/**
 * Product görseli ekleme hook'u
 */
export const useCreateProductImage = ({
  onSuccess,
  onError,
}: UseCreateProductImageOptions = {}) => {
  const { currentProductId: productId, refetchCurrentProductImages } =
    useProductsContext();
  const {
    mutate: createProductImage,
    loading: isLoading,
    error,
  } = usePost<ApiResponseProductImageDto, ProductImageCreateDto>(
    API_ENDPOINTS.SUPPLY.PRODUCTS.IMAGES(productId || 0),
    {
      onSuccess: (data) => {
        if (data?.data) {
          refetchCurrentProductImages();
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
