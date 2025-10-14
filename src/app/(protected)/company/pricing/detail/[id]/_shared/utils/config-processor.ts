import React from "react";
import type { ConfigItem, ProcessedItem } from "../types";

/**
 * Config'i işleyerek kullanılabilir item listesine dönüştürür
 */
export const processConfig = (
  config: ConfigItem[],
  pricing: any,
  formatPrice?: (amount?: number, currency?: string) => string
): ProcessedItem[] => {
  if (!pricing) return [];

  return config.map((configItem) => ({
    label: configItem.label,
    value: configItem.value(pricing, formatPrice),
    isShowing: configItem.isShowing(pricing),
  }));
};

/**
 * Birden fazla config'i işleyerek section'lar oluşturur
 */
export const createSections = (
  sectionConfigs: Array<{
    title: string;
    titleColor: string;
    titleIcon: string;
    config: ConfigItem[];
  }>,
  pricing: any,
  formatPrice?: (amount?: number, currency?: string) => string
) => {
  if (!pricing) return [];

  return sectionConfigs
    .map((sectionConfig) => ({
      title: sectionConfig.title,
      titleColor: sectionConfig.titleColor,
      titleIcon: sectionConfig.titleIcon,
      items: processConfig(sectionConfig.config, pricing, formatPrice),
    }))
    .filter((section) => section.items.some((item) => item.isShowing));
};
