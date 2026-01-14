import { QuotationComparisonDto } from "@/types/dto/supply/quotation.dto";
import type {
  QuotationSortBy,
  SortOrder,
  SortOption,
} from "../hooks/use-quotations-sort";
import type { QuotationFilters } from "../hooks/use-quotations-filter";

export interface RFQQuotationsContextValue {
  // Data
  quotations: QuotationComparisonDto[];
  filteredQuotations: QuotationComparisonDto[];
  isLoading: boolean;
  error: Error | null;
  rfqId: string;

  // View
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Sort
  sortBy: QuotationSortBy;
  sortOrder: SortOrder;
  sortOptions: SortOption[];
  currentSortOption?: SortOption;
  onSortChange: (value: QuotationSortBy) => void;
  toggleSortOrder: () => void;
  resetSort: () => void;

  // Filter
  filters: QuotationFilters;
  filterHandlers: {
    setStatus: (status: any) => void;
    setMinAmount: (amount?: number) => void;
    setMaxAmount: (amount?: number) => void;
    setMinRating: (rating?: number) => void;
    setValidFrom: (date?: string) => void;
    setValidTo: (date?: string) => void;
    resetFilters: () => void;
  };
  activeFilterCount: number;

  // Actions
  refetch: () => void;
}
