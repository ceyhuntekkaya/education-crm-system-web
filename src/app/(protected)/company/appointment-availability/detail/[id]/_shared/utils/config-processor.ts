import React from "react";
import { AppointmentDto } from "@/types";
import type { ConfigItem, ProcessedItem, SectionConfig } from "../types";

/**
 * Config'i işleyerek kullanılabilir item listesine dönüştürür
 */
export const processConfig = (
  config: ConfigItem[],
  appointment: AppointmentDto | null
): ProcessedItem[] => {
  if (!appointment) return [];

  return config.map((configItem) => ({
    label: configItem.label,
    value: configItem.value(appointment),
    isShowing: configItem.isShowing(appointment),
  }));
};

/**
 * Birden fazla config'i işleyerek section'lar oluşturur
 */
export const createSections = (
  sectionConfigs: SectionConfig[],
  appointment: AppointmentDto | null
) => {
  if (!appointment) return [];

  return sectionConfigs
    .map((sectionConfig) => ({
      title: sectionConfig.title,
      titleColor: sectionConfig.titleColor,
      titleIcon: sectionConfig.titleIcon,
      items: processConfig(sectionConfig.config, appointment),
    }))
    .filter((section) => section.items.some((item) => item.isShowing));
};
