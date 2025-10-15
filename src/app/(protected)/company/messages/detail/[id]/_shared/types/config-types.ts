import React from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";

/**
 * Config item interface - tüm config tiplerini kapsayan generic interface
 */
export interface ConfigItem {
  label: string;
  value: (message: MessageDto) => React.ReactNode;
  isShowing: (message: MessageDto) => boolean;
}

/**
 * Processed item interface - işlenmiş config item'ların tipi
 */
export interface ProcessedItem {
  label: string;
  value: React.ReactNode;
  isShowing: boolean;
}

/**
 * Section configuration interface
 */
export interface SectionConfig {
  title: string;
  titleColor: string;
  titleIcon: string;
  config: ConfigItem[] | ((message: MessageDto) => ConfigItem[]);
}
