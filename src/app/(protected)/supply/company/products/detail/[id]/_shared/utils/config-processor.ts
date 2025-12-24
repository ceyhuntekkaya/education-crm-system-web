import React from "react";
import type { SectionConfigItem, ProcessedSectionItem } from "../types";
import { ProductDto } from "@/types";

/**
 * Config'i işleyerek kullanılabilir item listesine dönüştürür
 */
export const processConfig = (
  config: SectionConfigItem[],
  product: ProductDto | null
): ProcessedSectionItem[] => {
  if (!product) return [];

  return config.map((configItem) => ({
    label: configItem.label,
    value: configItem.value(product),
    isShowing: configItem.isShowing(product),
  }));
};

/**
 * Birden fazla config'i işleyerek section'lar oluşturur
 */
export const createSections = (
  sectionConfigs: Array<{
    title: string;
    titleColor?: string;
    titleIcon?: string;
    config: SectionConfigItem[];
  }>,
  product: ProductDto | null
) => {
  if (!product) return [];

  return sectionConfigs
    .map((sectionConfig) => ({
      title: sectionConfig.title,
      titleColor: sectionConfig.titleColor,
      titleIcon: sectionConfig.titleIcon,
      items: processConfig(sectionConfig.config, product),
    }))
    .filter((section) => section.items.some((item) => item.isShowing));
};
