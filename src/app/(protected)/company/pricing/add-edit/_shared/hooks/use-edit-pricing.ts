"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { SchoolPricingUpdateDto, SchoolPricingDto } from "@/types";

interface UseEditPricingProps {
  pricingId: number;
  refetch?: () => void;
}

/**
 * Pricing güncelleme hook'u
 * @param pricingId - Güncellenecek pricing'in ID'si
 * @param refetch - Başarılı güncelleme sonrası çağrılacak refetch fonksiyonu
 */
export const useEditPricing = ({ pricingId, refetch }: UseEditPricingProps) => {
  const {
    mutate: putPricing,
    loading: isLoading,
    error,
  } = usePut<SchoolPricingDto, SchoolPricingUpdateDto>(
    API_ENDPOINTS.PRICING.SCHOOL_PRICING_UPDATE(pricingId),
    {
      onSuccess: (data) => {
        console.log(
          "✅ onSuccess alanı -> Pricing başarıyla güncellendi:",
          data
        );
        // Refetch varsa çalıştır
        if (refetch) {
          refetch();
        }
      },
      onError: (error) => {
        console.log("❌ onError alanı -> Pricing güncellenirken hata:", error);
      },
    }
  );

  return {
    putPricing,
    isLoading,
    error,
  };
};
