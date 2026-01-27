"use client";

import { useRef } from "react";
import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { QuotationItemDto, QuotationItemUpdateDto } from "@/types";

interface UseEditQuotationItemProps {
  quotationId: number | null;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

/**
 * Quotation Item güncelleme hook'u - Quotation add-edit sayfası için
 * itemId dinamik olduğu için putItem fonksiyonu itemId parametresi alır
 */
export const useEditQuotationItem = ({
  quotationId,
  onSuccess,
  onError,
}: UseEditQuotationItemProps) => {
  // itemId'yi runtime'da saklamak için ref kullan
  const itemIdRef = useRef<number | null>(null);

  const {
    mutate,
    loading: isLoading,
    error,
  } = usePut<QuotationItemDto, QuotationItemUpdateDto>(
    () => {
      const itemId = itemIdRef.current;
      if (!quotationId || !itemId) return "";
      return API_ENDPOINTS.SUPPLY.QUOTATION_ITEMS.UPDATE(quotationId, itemId);
    },
    {
      onSuccess: (data) => {
        console.log("✅ Quotation Item başarıyla güncellendi:", data);
        onSuccess?.();
      },
      onError: (error) => {
        console.error("❌ Quotation Item güncellenirken hata:", error);
        onError?.(error);
      },
    },
  );

  const putItem = async (
    itemId: number,
    data: QuotationItemUpdateDto,
  ): Promise<any> => {
    if (!quotationId || !itemId) {
      throw new Error("Quotation ID veya Item ID bulunamadı");
    }

    // itemId'yi ref'e kaydet
    itemIdRef.current = itemId;

    // usePut'un mutate fonksiyonunu çağır
    return mutate(data);
  };

  return {
    putItem,
    isLoading,
    error,
  };
};
