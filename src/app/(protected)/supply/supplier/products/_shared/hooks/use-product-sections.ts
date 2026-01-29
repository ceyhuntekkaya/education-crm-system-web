import { useMemo } from "react";
import { ProductDto } from "@/types";

/**
 * Product sections hook'u - Minimal implementation for supplier products
 * Returns empty array as sections are not used in list view
 */
export const useProductSections = (product: ProductDto | null) => {
  return useMemo(() => {
    // Product null ise veya list view'de kullanılıyorsa boş array döndür
    if (!product) return [];

    // Tedarikçi ürün listesi için section yapısı kullanılmıyor
    // Detail sayfasında kendi section yapısı olacak
    return [];
  }, [product]);
};
