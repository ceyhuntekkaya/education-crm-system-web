import React from "react";

/**
 * Config item interface - tüm config tiplerini kapsayan generic interface
 */
export interface ConfigItem {
  label: string;
  value: (gallery: any) => React.ReactNode;
  isShowing: (gallery: any) => boolean;
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
  config: ConfigItem[] | ((gallery: any) => ConfigItem[]);
}

/**
 * Config interface'leri - her config dosyası için ayrı interface
 * Tüm config interface'leri ConfigItem'ı extend eder
 */
export interface BasicInfoItemConfig extends ConfigItem {}
export interface MediaItemConfig extends ConfigItem {}
export interface GalleryItemsItemConfig extends ConfigItem {}
export interface VisibilityItemConfig extends ConfigItem {}
export interface StatisticsItemConfig extends ConfigItem {}
export interface MetaInfoItemConfig extends ConfigItem {}
export interface TimestampItemConfig extends ConfigItem {}
export interface OwnershipItemConfig extends ConfigItem {}
