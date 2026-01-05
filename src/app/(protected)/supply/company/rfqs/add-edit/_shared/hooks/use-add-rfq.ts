"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { RFQDto, RFQCreateDto } from "@/types";
import { useRouter } from "next/navigation";
import { useRFQsContext } from "../../../_shared/contexts";

/**
 * RFQ ekleme hook'u
 */
export const useAddRFQ = () => {
  const router = useRouter();
  const { rfqsListRefetch: refetch } = useRFQsContext();

  const {
    mutate: postRFQ,
    loading: isLoading,
    error,
  } = usePost<RFQDto, RFQCreateDto>(API_ENDPOINTS.SUPPLY.RFQS.CREATE, {
    onSuccess: (data) => {
      // Liste API'sine tekrar istek at
      refetch();
      // RFQs sayfasına yönlendir
      router.push("/supply/company/rfqs");
    },
    onError: (error) => {
      console.error("❌ RFQ eklenirken hata:", error);
    },
  });

  return {
    postRFQ,
    isLoading,
    error,
  };
};
