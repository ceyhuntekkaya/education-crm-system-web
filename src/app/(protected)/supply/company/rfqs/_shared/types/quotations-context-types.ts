import type { QuotationDto } from "@/types";
import type { RefObject } from "react";

export type SortField =
  | "none"
  | "createdAt"
  | "totalAmount"
  | "validUntil"
  | "deliveryDays"
  | "averageRating";
export type SortOrder = "asc" | "desc";

export interface SortOption {
  value: SortField;
  label: string;
  icon: string;
}

export interface QuotationsContextValue {
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
  quotationsListLoading: boolean;
  quotationsListError: Error | null;
  quotationsListRefetch: () => void;

  // Data
  quotations: QuotationDto[];
  totalElements: number;
  quotationsListIsEmpty: boolean;
}

export interface QuotationsProviderProps {
  children: React.ReactNode;
  companyId: number;
}
