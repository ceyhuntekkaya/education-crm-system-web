import { useMemo } from "react";
import { PRICING_SECTIONS, DESCRIPTION_SECTION } from "../config";
import { createSections, processConfig, formatPrice } from "../utils";

/**
 * Pricing sections hook'u
 * Tüm section işleme mantığını kapsüller
 */
export const usePricingSections = (pricing: any) => {
  return useMemo(() => {
    // Pricing null ise boş array döndür
    if (!pricing) return [];

    // Ana section'ları oluştur
    const pricingSections = createSections(
      PRICING_SECTIONS,
      pricing,
      formatPrice
    );

    // Açıklama section'ı kaldırıldı - kullanıcı istemiyor
    // const descriptionsItems = processConfig(
    //   DESCRIPTION_SECTION.config,
    //   pricing
    // );

    const allSections = [...pricingSections];

    // Açıklama section'ı eklenmedi
    // if (descriptionsItems.some((item) => item.isShowing)) {
    //   allSections.push({
    //     title: DESCRIPTION_SECTION.title,
    //     titleColor: DESCRIPTION_SECTION.titleColor,
    //     titleIcon: DESCRIPTION_SECTION.titleIcon,
    //     items: descriptionsItems,
    //   });
    // }

    return allSections;
  }, [pricing]);
};
