import React from "react";
import {
  BasicInfoItemConfig,
  StockInfoItemConfig,
  PriceInfoItemConfig,
  SupplierInfoItemConfig,
  AdditionalInfoItemConfig,
} from "./config-types";

/**
 * Section config item types
 */
export type SectionConfigItem =
  | BasicInfoItemConfig
  | StockInfoItemConfig
  | PriceInfoItemConfig
  | SupplierInfoItemConfig
  | AdditionalInfoItemConfig;

/**
 * Section config yapısı
 */
export interface SectionConfig {
  title: string;
  titleColor?: string;
  titleIcon?: string;
  config: SectionConfigItem[];
}

/**
 * İşlenmiş section item
 */
export interface ProcessedSectionItem {
  label: string;
  value: React.ReactNode;
  isShowing: boolean;
}

/**
 * İşlenmiş section yapısı
 */
export interface ProcessedSection {
  title: string;
  titleColor?: string;
  titleIcon?: string;
  items: ProcessedSectionItem[];
}
