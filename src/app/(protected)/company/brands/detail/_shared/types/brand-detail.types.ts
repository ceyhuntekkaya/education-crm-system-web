import React, { ReactNode } from "react";
import { BrandDto } from "@/types";

/**
 * Brand Detail Provider Props
 */
export interface BrandDetailProviderProps {
  children: ReactNode;
}

/**
 * Config item interface for brand sections
 */
export interface BrandConfigItem {
  label: string;
  value: (brand: BrandDto | null) => React.ReactNode;
  isShowing: (brand: BrandDto | null) => boolean;
}

/**
 * Processed item interface for brand sections
 */
export interface BrandProcessedItem {
  label: string;
  value: React.ReactNode;
  isShowing: boolean;
}

/**
 * Section configuration interface for brand
 */
export interface BrandSectionConfig {
  title: string;
  titleColor?: string;
  titleIcon?: string;
  config: BrandConfigItem[];
}

/**
 * Specific config interfaces
 */
export interface BrandGeneralInfoConfig extends BrandConfigItem {}
export interface BrandSocialMediaConfig extends BrandConfigItem {}
export interface BrandSeoConfig extends BrandConfigItem {}

/**
 * Brand Detail Context Type
 */
export interface BrandDetailContextType {
  currentBrand: BrandDto | null;
  isLoading: boolean;
  error: string | null;
  refreshBrand: () => void;
  // Company context'ten gelen değerler
  selectedSchool: { id: number; name: string } | null;
  schools: { id: number; name: string }[];
  // Config-based sections
  allSections: any[];
}
