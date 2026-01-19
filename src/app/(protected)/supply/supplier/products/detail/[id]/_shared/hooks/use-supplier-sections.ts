import { useMemo } from "react";
import {
  supplierBasicInfoConfig,
  supplierContactInfoConfig,
  supplierAdditionalInfoConfig,
} from "../config";
import { processSupplierConfig } from "../utils";
import { SupplierDto } from "@/types";

/**
 * Supplier sections hook'u
 * Tedarikçi section işleme mantığını kapsüller
 */
export const useSupplierSections = (supplier: SupplierDto | null) => {
  return useMemo(() => {
    // Supplier null ise boş array döndür
    if (!supplier) return [];

    // Tedarikçi section'larını oluştur
    const sections = [
      {
        title: "Temel Bilgiler",
        titleColor: "text-primary-600",
        titleIcon: "ph-bold ph-info",
        items: processSupplierConfig(supplierBasicInfoConfig, supplier).filter(
          (item) => item.isShowing
        ),
      },
      {
        title: "İletişim Bilgileri",
        titleColor: "text-secondary-600",
        titleIcon: "ph-bold ph-phone",
        items: processSupplierConfig(
          supplierContactInfoConfig,
          supplier
        ).filter((item) => item.isShowing),
      },
      {
        title: "Değerlendirme ve Ek Bilgiler",
        titleColor: "text-warning-600",
        titleIcon: "ph-bold ph-star",
        items: processSupplierConfig(
          supplierAdditionalInfoConfig,
          supplier
        ).filter((item) => item.isShowing),
      },
    ].filter((section) => section.items.length > 0);

    return sections;
  }, [supplier]);
};
