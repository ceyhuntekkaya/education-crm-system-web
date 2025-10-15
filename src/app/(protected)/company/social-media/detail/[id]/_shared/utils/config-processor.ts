import React from "react";
import type { ConfigItem, ProcessedItem, SectionConfig } from "../types";
import { PostDto } from "@/types";

/**
 * Config'i işleyerek kullanılabilir item listesine dönüştürür
 */
export const processConfig = (
  config: ConfigItem[] | ((post: PostDto | null) => ConfigItem[]),
  post: PostDto | null
): ProcessedItem[] => {
  if (!post) return [];

  // Eğer config bir fonksiyon ise, çağır ve sonucu al
  const configItems = typeof config === "function" ? config(post) : config;

  return configItems.map((configItem) => ({
    label: configItem.label,
    value: configItem.value(post),
    isShowing: configItem.isShowing(post),
  }));
};

/**
 * Birden fazla config'i işleyerek section'lar oluşturur
 */
export const createSections = (
  sectionConfigs: SectionConfig[],
  post: PostDto | null
) => {
  if (!post) return [];

  return sectionConfigs
    .map((sectionConfig) => ({
      title: sectionConfig.title,
      titleColor: sectionConfig.titleColor,
      titleIcon: sectionConfig.titleIcon,
      items: processConfig(sectionConfig.config, post),
    }))
    .filter((section) => section.items.some((item) => item.isShowing));
};
