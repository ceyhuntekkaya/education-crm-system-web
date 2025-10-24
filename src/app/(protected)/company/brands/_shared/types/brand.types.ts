import { BrandSummaryDto } from "@/types";
import { ReactNode } from "react";

/**
 * Brand column handlers interface
 * Defines the callback functions for brand table actions
 */
export interface BrandColumnHandlers {
  onViewDetails: (brand: BrandSummaryDto) => void;
  onEdit: (brand: BrandSummaryDto) => void;
  onDelete?: (brand: BrandSummaryDto) => void;
}

/**
 * Badge variant types for brand status display
 */
export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "secondary"
  | "info";

/**
 * Brand action buttons component props
 */
export interface BrandActionButtonsProps {
  brand: BrandSummaryDto;
  onViewDetails?: (brand: BrandSummaryDto) => void;
  onEdit?: (brand: BrandSummaryDto) => void;
  onDelete?: (brand: BrandSummaryDto) => void;
}

/**
 * Brand table component props
 */
export interface BrandTableProps {
  brands?: BrandSummaryDto[];
  loading?: boolean;
}

/**
 * Brand list context type
 */
export interface BrandListContextType {
  // Brand data
  brands: BrandSummaryDto[];
  brandLoading: boolean;
  brandError: string | null;

  // Actions
  refetchBrands: () => void;
}

/**
 * Brand statistics interface
 */
export interface BrandStats {
  total: number;
  totalCampuses: number;
  totalSchools: number;
  averageRating: number;
}
