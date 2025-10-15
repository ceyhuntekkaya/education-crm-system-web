import React from "react";
import { PostDto } from "@/types";

/**
 * Config item interface - tüm config tiplerini kapsayan generic interface
 */
export interface ConfigItem {
  label: string;
  value: (post: PostDto | null) => React.ReactNode;
  isShowing: (post: PostDto | null) => boolean;
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
  config: ConfigItem[] | ((post: PostDto | null) => ConfigItem[]);
}

/**
 * Config interface'leri - her config dosyası için ayrı interface
 * Tüm config interface'leri ConfigItem'ı extend eder
 */
export interface BasicInfoItemConfig extends ConfigItem {}
export interface MediaItemConfig extends ConfigItem {}
export interface MetaInfoItemConfig extends ConfigItem {}
export interface StatisticsItemConfig extends ConfigItem {}
export interface TimestampItemConfig extends ConfigItem {}
export interface AuthorInfoItemConfig extends ConfigItem {}
export interface EngagementItemConfig extends ConfigItem {}
export interface SettingsItemConfig extends ConfigItem {}
