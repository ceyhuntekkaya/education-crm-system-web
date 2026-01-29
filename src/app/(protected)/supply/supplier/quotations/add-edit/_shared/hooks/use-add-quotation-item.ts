"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib";
import { QuotationItemCreateDto, QuotationItemDto } from "@/types";

interface UseAddQuotationItemProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

/**
 * Quotation Item ekleme hook'u - Quotation add-edit sayfası için
 * quotationId dinamik olarak submitForm'da verilir
 *
 * NOT: usePost burada kullanılamaz çünkü endpoint quotationId'ye bağlı ve bu ID
 * sadece form submit edildiğinde bilinir. usePost statik URL gerektirir.
 * Bu nedenle apiClient.post kullanılır (mimari uygun - bkz: rfq-detail-context.tsx)
 */
export const useAddQuotationItem = ({
  onSuccess,
  onError,
}: UseAddQuotationItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postItem = async (
    quotationId: number,
    data: QuotationItemCreateDto,
  ): Promise<QuotationItemDto> => {
    if (!quotationId) {
      const err = new Error("Quotation ID bulunamadı");
      setError(err.message);
      onError?.(err);
      throw err;
    }

    setIsLoading(true);
    setError(null);

    try {
      const endpoint = API_ENDPOINTS.SUPPLY.QUOTATION_ITEMS.CREATE(quotationId);

      // apiClient kullanarak POST isteği (mimari yapıya uygun)
      const response = await apiClient.post<QuotationItemDto>(endpoint, data, {
        headers: {
          "X-Show-Snackbar": "true",
        },
      });

      setIsLoading(false);
      onSuccess?.();

      // response.data içinde API wrapper var, data field'ını döndür
      return (response.data as any)?.data || response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Item ekleme başarısız";
      setError(errorMessage);
      setIsLoading(false);
      onError?.(err);
      throw err;
    }
  };

  return {
    postItem,
    isLoading,
    error,
  };
};
