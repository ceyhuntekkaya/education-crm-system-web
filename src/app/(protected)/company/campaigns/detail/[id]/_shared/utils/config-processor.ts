import React from "react";
import type { ConfigItem, ProcessedItem, SectionConfig } from "../types";

/**
 * Config'i işleyerek kullanılabilir item listesine dönüştürür
 */
export const processConfig = (
  config: ConfigItem[],
  campaign: any
): ProcessedItem[] => {
  if (!campaign) return [];

  return config.map((configItem) => ({
    label: configItem.label,
    value: configItem.value(campaign),
    isShowing: configItem.isShowing(campaign),
  }));
};

/**
 * Birden fazla config'i işleyerek section'lar oluşturur
 */
export const createSections = (
  sectionConfigs: SectionConfig[],
  campaign: any
) => {
  if (!campaign) return [];

  return sectionConfigs
    .map((sectionConfig) => ({
      title: sectionConfig.title,
      titleColor: sectionConfig.titleColor,
      titleIcon: sectionConfig.titleIcon,
      items: processConfig(sectionConfig.config, campaign),
    }))
    .filter((section) => section.items.some((item) => item.isShowing));
};
