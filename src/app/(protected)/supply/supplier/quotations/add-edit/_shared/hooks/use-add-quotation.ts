"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { QuotationDto, QuotationCreateDto } from "@/types";

/**
 * Quotation ekleme hook'u
 * NOT: Bu hook add-edit sayfasında kullanılıyor, onSuccess callback'leri page.tsx'te yönetiliyor
 */
export const useAddQuotation = () => {
  const {
    mutate: postQuotation,
    loading: isLoading,
    error,
  } = usePost<QuotationDto, QuotationCreateDto>(
    API_ENDPOINTS.SUPPLY.QUOTATIONS.CREATE,
    {
      onError: (error) => {
        console.error("❌ Quotation eklenirken hata:", error);
      },
    },
  );

  return {
    postQuotation,
    isLoading,
    error,
  };
};
