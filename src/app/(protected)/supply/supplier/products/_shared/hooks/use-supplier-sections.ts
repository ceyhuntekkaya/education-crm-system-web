import { useMemo } from "react";
import { SupplierDto } from "@/types";

/**
 * Supplier sections hook'u - Minimal implementation for supplier products
 * Returns empty array as sections are not used in list view
 */
export const useSupplierSections = (supplier: SupplierDto | null) => {
  return useMemo(() => {
    // Supplier null ise veya list view'de kullanılıyorsa boş array döndür
    if (!supplier) return [];

    // Tedarikçi ürün listesi için section yapısı kullanılmıyor
    // Detail sayfasında kendi section yapısı olacak
    return [];
  }, [supplier]);
};
