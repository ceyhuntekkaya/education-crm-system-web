"use client";

import { useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";

interface UseDeleteProductProps {
  productId: number;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

/**
 * Product silme hook'u
 */
export const useDeleteProduct = ({
  productId,
  onSuccess,
  onError,
}: UseDeleteProductProps) => {
  const {
    mutate,
    loading: isLoading,
    error,
  } = useDelete<void, void>(
    () => API_ENDPOINTS.SUPPLY.PRODUCTS.BY_ID(productId),
    {
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error) => {
        onError?.(error);
      },
    },
  );

  const deleteProduct = async () => {
    return mutate();
  };

  return {
    deleteProduct,
    isLoading,
    error,
  };
};
