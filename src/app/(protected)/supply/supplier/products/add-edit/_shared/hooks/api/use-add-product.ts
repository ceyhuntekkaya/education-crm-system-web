"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ProductDto, ProductCreateDto } from "@/types";
import { useRouter } from "next/navigation";
import { useProductsContext } from "../../../../_shared/contexts";

/**
 * Product ekleme hook'u
 */
export const useAddProduct = () => {
  const router = useRouter();
  const { refetch } = useProductsContext();

  const {
    mutate: postProduct,
    loading: isLoading,
    error,
  } = usePost<ProductDto, ProductCreateDto>(
    API_ENDPOINTS.SUPPLY.PRODUCTS.CREATE,
    {
      onSuccess: (data) => {
        // Ana liste API'sine tekrar istek at
        refetch();

        // Yeni ekleme olduğu zaman listeye yönlendir
        router.push("/supply/supplier/products");
      },
      onError: (error) => {
        console.error("❌ Product eklenirken hata:", error);
      },
    },
  );

  return {
    postProduct,
    isLoading,
    error,
  };
};
