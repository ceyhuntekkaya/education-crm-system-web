"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { RFQDto, RFQCreateDto } from "@/types";

/**
 * RFQ ekleme hook'u - Add/Edit sayfası için
 * NOT: Bu hook add-edit sayfasında kullanılıyor, onSuccess callback'leri page.tsx'te yönetiliyor
 */
export const useAddRFQ = () => {
  const {
    mutate: postRFQ,
    loading: isLoading,
    error,
  } = usePost<RFQDto, RFQCreateDto>(API_ENDPOINTS.SUPPLY.RFQS.CREATE, {
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
