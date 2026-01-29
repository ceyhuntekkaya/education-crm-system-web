"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ProductDto, ProductUpdateDto } from "@/types";
import { useProductsContext } from "../../../../_shared/contexts";

/**
 * Product güncelleme hook'u
 */
export const useEditProduct = () => {
  const {
    currentProductId: productId,
    refetchCurrentProduct: refetch,
    refetch: refetchProductsList,
  } = useProductsContext();

  const {
    mutate: putProduct,
    loading: isLoading,
    error,
  } = usePut<ProductDto, ProductUpdateDto>(
    API_ENDPOINTS.SUPPLY.PRODUCTS.BY_ID(productId || 0),
    {
      onSuccess: (data) => {
        // Ana liste API'sine tekrar istek at
        refetchProductsList();

        // Context'teki veriyi güncelle (detay sayfası için)
        if (refetch) {
          refetch();
        }

        // Update işleminde aynı sayfada kal (route yapma)
        // router.push yapılmıyor
      },
      onError: (error) => {
        console.error("❌ Product güncellenirken hata:", error);
      },
    },
  );

  return {
    putProduct,
    isLoading,
    error,
  };
};
