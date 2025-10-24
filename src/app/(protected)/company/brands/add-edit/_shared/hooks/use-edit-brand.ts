"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { BrandCreateDto, BrandDto } from "@/types";

interface UseEditBrandProps {
  brandId: number;
  refetch?: () => void;
}

/**
 * Brand güncelleme hook'u
 */
export const useEditBrand = ({ brandId, refetch }: UseEditBrandProps) => {
  const {
    mutate: putBrand,
    loading: isLoading,
    error,
  } = usePut<BrandDto, BrandCreateDto>(
    () => API_ENDPOINTS.INSTITUTIONS.BRAND_BY_ID(brandId),
    {
      onSuccess: (data) => {
        console.log("✅ Brand başarıyla güncellendi:", data);
        // Refetch varsa çalıştır
        if (refetch) {
          refetch();
        }
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
