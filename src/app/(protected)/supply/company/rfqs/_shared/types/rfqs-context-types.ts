import type { RFQDto } from "@/types";
import type { RefObject } from "react";

export type SortField =
  | "none"
  | "createdAt"
  | "submissionDeadline"
  | "expectedDeliveryDate"
  | "itemCount"
  | "quotationCount";
export type SortOrder = "asc" | "desc";

export interface SortOption {
  value: SortField;
  label: string;
  icon: string;
}

export interface RFQsContextValue {
  // View
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;

  // Sorting State
  sortBy: SortField;
  sortOrder: SortOrder;
  showSortDropdown: boolean;

  // Sorting Refs
  dropdownRef: RefObject<HTMLDivElement>;

  // Sorting Data
  sortOptions: SortOption[];
  currentSortOption: SortOption | undefined;

  // Sorting Setters
  setSortBy: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  setShowSortDropdown: (show: boolean) => void;

  // Sorting Handlers
  handleSortChange: (field: SortField) => void;
  toggleSortOrder: () => void;
  onSortChange: (field: SortField) => void;
  toggleSortDropdown: () => void;
  resetSort: () => void;

  // API State
  rfqsListLoading: boolean;
  rfqsListError: Error | null;
  rfqsListRefetch: () => void;

  // Data
  rfqs: RFQDto[];
  totalElements: number;
  rfqsListIsEmpty: boolean;
}

export interface RFQsProviderProps {
  children: React.ReactNode;
  companyId: number;
}
