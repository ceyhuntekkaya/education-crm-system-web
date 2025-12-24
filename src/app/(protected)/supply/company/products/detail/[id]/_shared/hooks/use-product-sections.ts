import { useMemo } from "react";
import { PRODUCT_SECTIONS } from "../config";
import { createSections } from "../utils";
import { ProductDto } from "@/types";

/**
 * Product sections hook'u
 * Tüm section işleme mantığını kapsüller
 */
export const useProductSections = (product: ProductDto | null) => {
  return useMemo(() => {
    // Product null ise boş array döndür
    if (!product) return [];

    // Ana section'ları oluştur
    const productSections = createSections(PRODUCT_SECTIONS, product);

    return productSections;
  }, [product]);
};
