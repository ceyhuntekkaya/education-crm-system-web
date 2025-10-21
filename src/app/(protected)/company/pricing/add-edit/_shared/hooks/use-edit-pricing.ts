"use client";

import { usePut } from "@/hooks";
import { useAuth } from "@/contexts";
import { API_ENDPOINTS } from "@/lib";
import { SchoolPricingCreateDto, SchoolPricingDto } from "@/types";

/**
 * Pricing güncelleme hook'u
 */
export const useEditPricing = (pricingId: number) => {
  const {
    mutate: putPricing,
    loading: isLoading,
    error,
  } = usePut<SchoolPricingDto, SchoolPricingCreateDto>(
    () => API_ENDPOINTS.PRICING.SCHOOL_PRICING_BY_ID(pricingId),
    {
      onSuccess: (data) => {
        console.log("✅ Pricing başarıyla güncellendi:", data);
      },
      onError: (error) => {
        console.error("❌ Pricing güncellenirken hata:", error);
      },
    }
  );

  return {
    putPricing,
    isLoading,
    error,
  };
};
