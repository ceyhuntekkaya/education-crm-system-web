import React, { ReactNode } from "react";
import { CampusDto } from "@/types";

/**
 * Campus Detail Provider Props
 */
export interface CampusDetailProviderProps {
  children: ReactNode;
}

/**
 * Config item interface for campus sections
 */
export interface CampusConfigItem {
  label: string;
  value: (campus: CampusDto | null) => React.ReactNode;
  isShowing: (campus: CampusDto | null) => boolean;
}

/**
 * Processed item interface for campus sections
 */
export interface CampusProcessedItem {
  label: string;
  value: React.ReactNode;
  isShowing: boolean;
}

/**
 * Section configuration interface for campus
 */
export interface CampusSectionConfig {
  title: string;
  titleColor?: string;
  titleIcon?: string;
  config: CampusConfigItem[];
}

/**
 * Specific config interfaces
 */
export interface CampusGeneralInfoConfig extends CampusConfigItem {}
export interface CampusSocialMediaConfig extends CampusConfigItem {}
export interface CampusSeoConfig extends CampusConfigItem {}

/**
 * Campus Detail Context Type
 */
export interface CampusDetailContextType {
  currentCampus: CampusDto | null;
  isLoading: boolean;
  error: string | null;
  refreshCampus: () => void;
  // Company context'ten gelen değerler
  selectedSchool: { id: number; name: string } | null;
  schools: { id: number; name: string }[];
  // Config-based sections
  allSections: any[];
}
