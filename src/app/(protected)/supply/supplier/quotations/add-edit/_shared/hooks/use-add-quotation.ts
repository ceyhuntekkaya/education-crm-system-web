"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { QuotationDto, QuotationCreateDto } from "@/types";
import { useRouter } from "next/navigation";
import { useQuotationsContext } from "../../../_shared/contexts";

/**
 * Quotation ekleme hook'u
 */
export const useAddQuotation = () => {
  const router = useRouter();
  const { refetch } = useQuotationsContext();

  const {
    mutate: postQuotation,
    loading: isLoading,
    error,
  } = usePost<QuotationDto, QuotationCreateDto>(
    API_ENDPOINTS.SUPPLY.QUOTATIONS.CREATE,
    {
      onSuccess: (data) => {
        // Liste API'sine tekrar istek at
        refetch();
        // Quotations sayfasına yönlendir
        router.push("/supply/supplier/quotations");
      },
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
