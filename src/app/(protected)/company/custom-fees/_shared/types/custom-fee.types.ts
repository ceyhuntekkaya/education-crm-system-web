import { CustomFeeDto } from "@/types/dto/pricing/CustomFeeDto";
import { ReactNode } from "react";

/**
 * Custom fee column handlers interface
 * Defines the callback functions for custom fee table actions
 */
export interface CustomFeeColumnHandlers {
  onViewDetails: (customFee: CustomFeeDto) => void;
  onEdit: (customFee: CustomFeeDto) => void;
  onToggleStatus: (customFee: CustomFeeDto) => void;
  onDelete?: (customFee: CustomFeeDto) => void;
  onDuplicate?: (customFee: CustomFeeDto) => void;
}

/**
 * Badge variant types for custom fee status display
 */
export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "secondary"
  | "info";

/**
 * Custom fee action buttons component props
 */
export interface CustomFeeActionButtonsProps {
  customFee: CustomFeeDto;
  onViewDetails?: (customFee: CustomFeeDto) => void;
  onEdit?: (customFee: CustomFeeDto) => void;
  onToggleStatus?: (customFee: CustomFeeDto) => void;
  onDelete?: (customFee: CustomFeeDto) => void;
  onDuplicate?: (customFee: CustomFeeDto) => void;
}

/**
 * Custom fee table component props
 */
export interface CustomFeesTableProps {
  customFees?: CustomFeeDto[];
  loading?: boolean;
}

/**
 * Custom fee context type
 */
export interface CustomFeeContextType {
  // Custom fee data
  customFees: CustomFeeDto[];
  customFeeLoading: boolean;
  customFeeError: string | null;

  // Actions
  refetchCustomFees: () => void;
}

/**
 * Custom fee list context type (for list page)
 */
export interface CustomFeeListContextType {
  // Custom fee data
  customFees: CustomFeeDto[];
  customFeeLoading: boolean;
  customFeeError: string | null;

  // Pricing context
  pricingId: number;

  // Actions
  refetchCustomFees: () => void;
}

/**
 * Custom fee statistics interface
 */
export interface CustomFeeStats {
  total: number;
  active: number;
  draft: number;
  pending: number;
  archived: number;
  totalAmount: number;
  averageAmount: number;
  byType: Record<string, number>;
}
