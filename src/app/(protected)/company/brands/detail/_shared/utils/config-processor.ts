import React from "react";
import { BrandDto } from "@/types";
import type {
  BrandConfigItem,
  BrandProcessedItem,
  BrandSectionConfig,
} from "../types";

/**
 * Config'i işleyerek kullanılabilir item listesine dönüştürür
 */
export const processBrandConfig = (
  config: BrandConfigItem[],
  brand: BrandDto | null
): BrandProcessedItem[] => {
  if (!brand) return [];

  return config.map((configItem) => ({
    label: configItem.label,
    value: configItem.value(brand),
    isShowing: configItem.isShowing(brand),
  }));
};

/**
 * Birden fazla config'i işleyerek section'lar oluşturur
 */
export const createBrandSections = (
  sectionConfigs: BrandSectionConfig[],
  brand: BrandDto | null
) => {
  if (!brand) return [];

  return sectionConfigs
    .map((sectionConfig) => ({
      title: sectionConfig.title,
      titleColor: sectionConfig.titleColor,
      titleIcon: sectionConfig.titleIcon,
      items: processBrandConfig(sectionConfig.config, brand),
    }))
    .filter((section) => section.items.some((item) => item.isShowing));
};
