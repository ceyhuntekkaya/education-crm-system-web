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
    () => API_ENDPOINTS.PRICING.SCHOOL_PRICING_BY_ID(pricingId),
    {
      onSuccess: (data) => {
        console.log("✅ Pricing başarıyla güncellendi:", data);
        // Refetch varsa çalıştır
        if (refetch) {
          refetch();
        }
      },
      onError: (error) => {
        console.error("❌ Pricing güncellenirken hata:", error);
      },
    }
  );

  /**
   * Pricing güncelleme fonksiyonu
   * Sadece SchoolPricingUpdateDto'da olan alanları kabul eder
   */
  const updatePricing = async (data: SchoolPricingUpdateDto) => {
    // Boş değerleri temizle (undefined veya null olanları kaldır)
    // Ancak 0 değerlerini ve string "-" gibi değerleri koruyalım
    const cleanedData = Object.entries(data).reduce((acc, [key, value]) => {
      // undefined, null veya tam olarak boş string ("") olan değerleri atla
      if (value !== undefined && value !== null && value !== "") {
        acc[key as keyof SchoolPricingUpdateDto] = value;
      }
      return acc;
    }, {} as SchoolPricingUpdateDto);

    console.log("📤 Gönderilen veri (use-edit-pricing):", cleanedData);
    console.log("📊 Veri özeti:", {
      totalFields: Object.keys(data).length,
      cleanedFields: Object.keys(cleanedData).length,
      removedFields: Object.keys(data).filter(
        (k) => !Object.keys(cleanedData).includes(k)
      ),
    });

    return putPricing(cleanedData);
  };

  return {
    putPricing: updatePricing,
    isLoading,
    error,
  };
};
