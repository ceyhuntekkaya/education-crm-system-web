import React from "react";

/**
 * Config item interface - tüm config tiplerini kapsayan generic interface
 */
export interface ConfigItem {
  label: string;
  value: (campaign: any) => React.ReactNode;
  isShowing: (campaign: any) => boolean;
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
export interface DiscountItemConfig extends ConfigItem {}
export interface TargetAudienceItemConfig extends ConfigItem {}
export interface UsageLimitsItemConfig extends ConfigItem {}
export interface DatesItemConfig extends ConfigItem {}
export interface MediaItemConfig extends ConfigItem {}
export interface StatisticsItemConfig extends ConfigItem {}
export interface DescriptionItemConfig extends ConfigItem {}
export interface PaymentInfoItemConfig extends ConfigItem {}
export interface MetaInfoItemConfig extends ConfigItem {}
export interface ManagementItemConfig extends ConfigItem {}
export interface CampaignSchoolsItemConfig extends ConfigItem {}
export interface CampaignContentsItemConfig extends ConfigItem {}
export interface BonusesGiftsItemConfig extends ConfigItem {}
export interface CtaInfoItemConfig extends ConfigItem {}
