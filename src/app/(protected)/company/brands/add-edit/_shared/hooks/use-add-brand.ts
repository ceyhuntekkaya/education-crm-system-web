"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { BrandCreateDto, BrandDto } from "@/types";
import { useRouter } from "next/navigation";

/**
 * Brand ekleme hook'u
 */
export const useAddBrand = () => {
  const router = useRouter();

  const {
    mutate: postBrand,
    loading: isLoading,
    error,
  } = usePost<BrandDto, BrandCreateDto>(
    API_ENDPOINTS.INSTITUTIONS.BRAND_CREATE,
    {
      onSuccess: (data) => {
        // console.log("✅ onSuccess alanı -> Brand başarıyla eklendi:", data);
        // Markalar sayfasına yönlendir
        router.push("/company/brands");
      },
      onError: (error) => {
        // console.log("❌ onError alanı -> Brand eklenirken hata:", error);
      },
    }
  );

  return {
    postBrand,
    isLoading,
    error,
  };
};
