import React from "react";

/**
 * Config item interface - tüm config tiplerini kapsayan generic interface
 */
export interface ConfigItem {
  label: string;
  value: (
    pricing: any,
    formatPrice?: (amount?: number, currency?: string) => string
  ) => React.ReactNode;
  isShowing: (pricing: any) => boolean;
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
 * Tüm config interface'leri ConfigItem'ı extend eder
 */
export interface BasicInfoItemConfig extends ConfigItem {}
export interface TuitionFeeItemConfig extends ConfigItem {}
export interface RegistrationFeeItemConfig extends ConfigItem {}
export interface AdditionalFeeItemConfig extends ConfigItem {}
export interface ServiceFeeItemConfig extends ConfigItem {}
export interface TotalCostItemConfig extends ConfigItem {}
export interface PaymentInfoItemConfig extends ConfigItem {}
export interface DiscountItemConfig extends ConfigItem {}
export interface OtherInfoItemConfig extends ConfigItem {}
export interface DescriptionItemConfig extends ConfigItem {}
