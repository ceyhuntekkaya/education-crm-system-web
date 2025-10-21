import React from "react";
import { AppointmentDto } from "@/types";

/**
 * Status translation interface
 */
export interface StatusTranslation {
  text: string;
  badgeClass: string;
}

/**
 * Config item interface - tüm config tiplerini kapsayan generic interface
 */
export interface ConfigItem {
  label: string;
  value: (appointment: AppointmentDto | null) => React.ReactNode;
  isShowing: (appointment: AppointmentDto | null) => boolean;
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
export interface DateTimeItemConfig extends ConfigItem {}
export interface ParticipantItemConfig extends ConfigItem {}
export interface MeetingInfoItemConfig extends ConfigItem {}
export interface OutcomeItemConfig extends ConfigItem {}
export interface CancellationItemConfig extends ConfigItem {}
export interface NotesItemConfig extends ConfigItem {}

/**
 * Status translation result
 */
export interface StatusTranslation {
  text: string;
  className?: string;
}
