import React from "react";
import type { ConfigItem, ProcessedItem, SectionConfig } from "../types";

/**
 * Config'i işleyerek kullanılabilir item listesine dönüştürür
 */
export const processConfig = (
  config: ConfigItem[] | ((gallery: any) => ConfigItem[]),
  gallery: any
): ProcessedItem[] => {
  if (!gallery) return [];

  // Eğer config bir fonksiyon ise, çağır ve sonucu al
  const configItems = typeof config === "function" ? config(gallery) : config;

  return configItems.map((configItem) => ({
    label: configItem.label,
    value: configItem.value(gallery),
    isShowing: configItem.isShowing(gallery),
  }));
};

/**
 * Birden fazla config'i işleyerek section'lar oluşturur
 */
export const createSections = (
  sectionConfigs: SectionConfig[],
  gallery: any
) => {
  if (!gallery) return [];

  return sectionConfigs
    .map((sectionConfig) => ({
      title: sectionConfig.title,
      titleColor: sectionConfig.titleColor,
      titleIcon: sectionConfig.titleIcon,
      items: processConfig(sectionConfig.config, gallery),
    }))
    .filter((section) => section.items.some((item) => item.isShowing));
};
