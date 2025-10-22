import React from "react";
import { CampusDto } from "@/types";
import type {
  CampusConfigItem,
  CampusProcessedItem,
  CampusSectionConfig,
} from "../types";

/**
 * Config'i işleyerek kullanılabilir item listesine dönüştürür
 */
export const processCampusConfig = (
  config: CampusConfigItem[],
  campus: CampusDto | null
): CampusProcessedItem[] => {
  if (!campus) return [];

  return config.map((configItem) => ({
    label: configItem.label,
    value: configItem.value(campus),
    isShowing: configItem.isShowing(campus),
  }));
};

/**
 * Birden fazla config'i işleyerek section'lar oluşturur
 */
export const createCampusSections = (
  sectionConfigs: CampusSectionConfig[],
  campus: CampusDto | null
) => {
  if (!campus) return [];

  return sectionConfigs
    .map((sectionConfig) => ({
      title: sectionConfig.title,
      titleColor: sectionConfig.titleColor,
      titleIcon: sectionConfig.titleIcon,
      items: processCampusConfig(sectionConfig.config, campus),
    }))
    .filter((section) => section.items.some((item) => item.isShowing));
};
