"use client";

import { usePost } from "@/hooks";
import { useAuth } from "@/contexts";
import { API_ENDPOINTS } from "@/lib";
import { SchoolPricingCreateDto, SchoolPricingDto } from "@/types";

/**
 * Pricing ekleme hook'u
 */
export const useAddPricing = () => {
  const {
    mutate: postPricing,
    loading: isLoading,
    error,
  } = usePost<SchoolPricingDto, SchoolPricingCreateDto>(
    API_ENDPOINTS.PRICING.SCHOOL_PRICING_CREATE,
    {
      onSuccess: (data) => {
        // console.log("✅ onSuccess alanı -> Pricing başarıyla eklendi:", data);
      },
      onError: (error) => {
        // console.log("❌ onError alanı -> Pricing eklenirken hata:", error);
      },
    }
  );

  return {
    postPricing,
    isLoading,
    error,
  };
};
