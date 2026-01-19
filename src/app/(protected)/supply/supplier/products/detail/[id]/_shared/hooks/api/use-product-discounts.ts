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
  productId: number | null
): UseProductDiscountsReturn => {
  const {
    data: discountResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseProductDiscountList>(
    productId ? API_ENDPOINTS.SUPPLY.PRODUCTS.DISCOUNTS(productId) : null
  );

  const discounts = discountResponse?.data || [];

  // Aktif indirimleri filtrele
  const activeDiscounts = discounts.filter((discount) => {
    if (!discount.isActive) return false;

    const now = new Date();
    const startDate = discount.startDate ? new Date(discount.startDate) : null;
    const endDate = discount.endDate ? new Date(discount.endDate) : null;

    // Başlangıç tarihi kontrolü
    if (startDate && now < startDate) return false;

    // Bitiş tarihi kontrolü
    if (endDate && now > endDate) return false;

    return true;
  });

  return {
    discounts,
    isLoading,
    error,
    refetch,
    hasActiveDiscount: activeDiscounts.length > 0,
    activeDiscounts,
  };
};
