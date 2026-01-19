"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { QuotationDto, QuotationCreateDto } from "@/types";
import { useRouter } from "next/navigation";
import { useQuotationsContext } from "../../../_shared/contexts";

/**
 * Quotation ekleme hook'u
 * Social media useAddPost yapısı ile aynı mimari
 */
export const useAddQuotation = () => {
  const router = useRouter();
  const { quotationsListRefetch: refetch } = useQuotationsContext();

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
        // RFQs sayfasına yönlendir
        router.push("/supply/company/quotations");
      },
      onError: (error) => {
        console.error("❌ Quotation eklenirken hata:", error);
      },
    }
  );

  return {
    postQuotation,
    isLoading,
    error,
  };
};
