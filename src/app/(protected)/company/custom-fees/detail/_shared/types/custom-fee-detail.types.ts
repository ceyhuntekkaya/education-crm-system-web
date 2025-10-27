import { CustomFeeDto } from "@/types";
import { ReactNode } from "react";

/**
 * Custom fee detail context type
 */
export interface CustomFeeDetailContextType {
  // Current custom fee data
  currentCustomFee: CustomFeeDto | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  refreshCustomFee: () => void;

  // Sections
  allSections?: CustomFeeSection[];
}

/**
 * Custom fee detail provider props
 */
export interface CustomFeeDetailProviderProps {
  children: ReactNode;
}

/**
 * Config item type for custom fee detail
 */
export interface CustomFeeConfigItem {
  label: string;
  value: (customFee: CustomFeeDto) => React.ReactNode;
  isShowing: (customFee: CustomFeeDto) => boolean;
}

/**
 * Processed item type
 */
export interface CustomFeeProcessedItem {
  label: string;
  value: React.ReactNode;
  isShowing: boolean;
}

/**
 * Section configuration type
 */
export interface CustomFeeSectionConfig {
  title: string;
  titleColor?: string;
  titleIcon?: string;
  config: CustomFeeConfigItem[];
}

/**
 * Processed section type
 */
export interface CustomFeeSection {
  title: string;
  titleColor?: string;
  titleIcon?: string;
  items: CustomFeeProcessedItem[];
}
