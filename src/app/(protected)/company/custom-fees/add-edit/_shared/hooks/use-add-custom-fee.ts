"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { CustomFeeCreateDto, CustomFeeDto, ApiResponseDto } from "@/types";
import { useRouter } from "next/navigation";
import { useCustomFeeList } from "../../../_shared";

/**
 * Custom fee ekleme hook'u
 *
 * @returns {Object}
 * - postCustomFee: Yeni custom fee ekleme fonksiyonu
 * - isLoading: Form submit loading durumu (formLoading olarak kullanılır)
 * - error: Hata durumu
 */
export const useAddCustomFee = () => {
  const router = useRouter();
  const { refetchCustomFees } = useCustomFeeList();

  const {
    mutate: postCustomFee,
    loading: isLoading,
    error,
  } = usePost<ApiResponseDto<CustomFeeDto>, CustomFeeCreateDto>(
    API_ENDPOINTS.PRICING.CUSTOM_FEE_CREATE,
    {
      onSuccess: (data) => {
        console.log("✅ Ek ücret başarıyla eklendi:", data);
        // Liste sayfasını yenile
        refetchCustomFees();
        // Liste sayfasına yönlendir
        router.push("/company/custom-fees");
      },
      onError: (error) => {
        console.error("❌ Ek ücret eklenirken hata:", error);
      },
    }
  );

  return {
    postCustomFee,
    isLoading, // Bu form submit loading'i olarak kullanılır
    error,
  };
};
