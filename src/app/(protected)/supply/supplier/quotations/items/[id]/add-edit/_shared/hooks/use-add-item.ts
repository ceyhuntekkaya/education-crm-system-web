"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { QuotationItemDto, QuotationItemCreateDto } from "@/types";
import { useRouter } from "next/navigation";
import { useQuotationItemsContext } from "../../../_shared/contexts";

interface UseAddItemProps {
  quotationId: number;
}

/**
 * Quotation Item ekleme hook'u
 */
export const useAddItem = ({ quotationId }: UseAddItemProps) => {
  const router = useRouter();
  const { refetch } = useQuotationItemsContext();

  const {
    mutate: postItem,
    loading: isLoading,
    error,
  } = usePost<QuotationItemDto, QuotationItemCreateDto>(
    API_ENDPOINTS.SUPPLY.QUOTATION_ITEMS.CREATE(quotationId),
    {
      onSuccess: (data) => {
        // Liste API'sine tekrar istek at
        refetch();
        // Items sayfasına yönlendir
        router.push(`/supply/supplier/quotations/items/${quotationId}`);
      },
      onError: (error) => {
        console.error("❌ Quotation Item eklenirken hata:", error);
      },
    },
  );

  return {
    postItem,
    isLoading,
    error,
  };
};
