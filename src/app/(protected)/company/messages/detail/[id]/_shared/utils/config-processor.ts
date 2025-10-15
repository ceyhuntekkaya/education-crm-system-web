import React from "react";
import type { ConfigItem, ProcessedItem, SectionConfig } from "../types";
import { MessageDto } from "@/types/dto/content/MessageDto";

/**
 * Config'i işleyerek kullanılabilir item listesine dönüştürür
 */
export const processConfig = (
  config: ConfigItem[] | ((message: MessageDto) => ConfigItem[]),
  message: MessageDto
): ProcessedItem[] => {
  if (!message) return [];

  // Eğer config bir fonksiyon ise, çağır ve sonucu al
  const configItems = typeof config === "function" ? config(message) : config;

  return configItems.map((configItem) => ({
    label: configItem.label,
    value: configItem.value(message),
    isShowing: configItem.isShowing(message),
  }));
};

/**
 * Birden fazla config'i işleyerek section'lar oluşturur
 */
export const createSections = (
  sectionConfigs: SectionConfig[],
  message: MessageDto
) => {
  if (!message) return [];

  return sectionConfigs
    .map((sectionConfig) => ({
      title: sectionConfig.title,
      titleColor: sectionConfig.titleColor,
      titleIcon: sectionConfig.titleIcon,
      items: processConfig(sectionConfig.config, message),
    }))
    .filter((section) => section.items.some((item) => item.isShowing));
};
