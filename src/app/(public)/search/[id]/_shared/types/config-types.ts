import React from "react";
import type { SchoolPricingDto } from "@/types";

/**
 * Config item interface - tüm config tiplerini kapsayan generic interface
 */
export interface ConfigItem {
  label: string;
  value: (
    pricing: SchoolPricingDto,
    formatCurrency?: (amount?: number) => string
  ) => React.ReactNode;
  isShowing: (pricing: SchoolPricingDto) => boolean;
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
  config: ConfigItem[];
}

/**
 * Config interface'leri - her config dosyası için ayrı interface
 */
export interface BasicFeeItemConfig extends ConfigItem {}
export interface AdditionalFeeItemConfig extends ConfigItem {}
export interface CustomFeeItemConfig extends ConfigItem {}
export interface SummaryItemConfig extends ConfigItem {}
