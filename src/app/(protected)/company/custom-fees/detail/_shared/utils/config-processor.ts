import React from "react";
import { CustomFeeDto } from "@/types";
import type {
  CustomFeeConfigItem,
  CustomFeeProcessedItem,
  CustomFeeSectionConfig,
} from "../types";

/**
 * Config'i işleyerek kullanılabilir item listesine dönüştürür
 */
export const processCustomFeeConfig = (
  config: CustomFeeConfigItem[],
  customFee: CustomFeeDto | null
): CustomFeeProcessedItem[] => {
  if (!customFee) return [];

  return config.map((configItem) => ({
    label: configItem.label,
    value: configItem.value(customFee),
    isShowing: configItem.isShowing(customFee),
  }));
};

/**
 * Birden fazla config'i işleyerek section'lar oluşturur
 */
export const createCustomFeeSections = (
  sectionConfigs: CustomFeeSectionConfig[],
  customFee: CustomFeeDto | null
) => {
  if (!customFee) return [];

  return sectionConfigs
    .map((sectionConfig) => ({
      title: sectionConfig.title,
      titleColor: sectionConfig.titleColor,
      titleIcon: sectionConfig.titleIcon,
      items: processCustomFeeConfig(sectionConfig.config, customFee),
    }))
    .filter((section) => section.items.some((item) => item.isShowing));
};
