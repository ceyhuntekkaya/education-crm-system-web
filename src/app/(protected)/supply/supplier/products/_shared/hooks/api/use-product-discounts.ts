"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ProductDiscountDto, ApiResponseProductDiscountList } from "@/types";

interface UseProductDiscountsReturn {
  discounts: ProductDiscountDto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  hasActiveDiscount: boolean;
  activeDiscounts: ProductDiscountDto[];
}

/**
 * Ürün indirimlerini getiren hook
 * @param productId - Ürün ID'si
 * @returns İndirim verileri ve yönetim fonksiyonları
 */
export const useProductDiscounts = (
  productId: number | null,
): UseProductDiscountsReturn => {
  const {
    data: discountResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseProductDiscountList>(
    productId ? API_ENDPOINTS.SUPPLY.PRODUCT_DISCOUNTS.LIST(productId) : null,
  );

  const discounts = discountResponse?.data || [];

  // Aktif indirimleri filtrele - sadece isActive=true olanları göster
  // Tarih kontrolü yapma, backend zaten isActive ile kontrol ediyor
  const activeDiscounts = discounts.filter((discount) => discount.isActive);

  return {
    discounts,
    isLoading,
    error,
    refetch,
    hasActiveDiscount: activeDiscounts.length > 0,
    activeDiscounts,
  };
};
