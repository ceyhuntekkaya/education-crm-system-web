"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { BrandCreateDto, BrandDto } from "@/types";

/**
 * Brand güncelleme hook'u
 */
export const useEditBrand = (brandId: number) => {
  const {
    mutate: putBrand,
    loading: isLoading,
    error,
  } = usePut<BrandDto, BrandCreateDto>(
    () => API_ENDPOINTS.INSTITUTIONS.BRAND_BY_ID(brandId),
    {
      onSuccess: (data) => {
        console.log("✅ Brand başarıyla güncellendi:", data);
      },
      onError: (error) => {
        console.error("❌ Brand güncellenirken hata:", error);
      },
    }
  );

  return {
    putBrand,
    isLoading,
    error,
  };
};
