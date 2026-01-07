import { QuotationComparisonDto, ComparisonViewMode } from "./comparison-types";

/**
 * Comparison Context State Interface
 */
export interface ComparisonContextState {
  // Data
  comparisons: QuotationComparisonDto[];
  isLoading: boolean;
  error: string | null;

  // View mode
  viewMode: ComparisonViewMode;

  // Selected comparison
  selectedComparison: QuotationComparisonDto | null;

  // RFQ ID
  rfqId: number;
}

/**
 * Comparison Context Actions Interface
 */
export interface ComparisonContextActions {
  // View mode
  setViewMode: (mode: ComparisonViewMode) => void;

  // Selection
  selectComparison: (comparison: QuotationComparisonDto | null) => void;

  // Refresh
  refetchComparisons: () => void;
}

/**
 * Complete Comparison Context Interface
 */
export interface ComparisonContextType
  extends ComparisonContextState,
    ComparisonContextActions {}
