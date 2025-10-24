import { SchoolPricingDto } from "@/types/dto/pricing/SchoolPricingDto";
import { ReactNode } from "react";

/**
 * Pricing column handlers interface
 * Defines the callback functions for pricing table actions
 */
export interface PricingColumnHandlers {
  onViewDetails: (pricing: SchoolPricingDto) => void;
  onEdit: (pricing: SchoolPricingDto) => void;
  onToggleStatus: (pricing: SchoolPricingDto) => void;
  onDelete?: (pricing: SchoolPricingDto) => void;
  onDuplicate?: (pricing: SchoolPricingDto) => void;
}

/**
 * Badge variant types for pricing status display
 */
export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "secondary"
  | "info";

/**
 * Pricing action buttons component props
 */
export interface PricingActionButtonsProps {
  pricing: SchoolPricingDto;
  onViewDetails?: (pricing: SchoolPricingDto) => void;
  onEdit?: (pricing: SchoolPricingDto) => void;
  onToggleStatus?: (pricing: SchoolPricingDto) => void;
  onDelete?: (pricing: SchoolPricingDto) => void;
  onDuplicate?: (pricing: SchoolPricingDto) => void;
}

/**
 * Pricing table component props
 */
export interface PricingTableProps {
  pricings?: SchoolPricingDto[];
  loading?: boolean;
}

/**
 * Pricing context type
 */
export interface PricingContextType {
  // Pricing data
  schoolPricings: SchoolPricingDto[];
  pricingLoading: boolean;
  pricingError: string | null;

  // Actions
  refetchPricings: () => void;
}

/**
 * Pricing statistics interface
 */
export interface PricingStats {
  total: number;
  active: number;
  draft: number;
  pending: number;
  archived: number;
  averageAnnualTuition: number;
  averageMonthlyTuition: number;
  totalSchools: number;
}
