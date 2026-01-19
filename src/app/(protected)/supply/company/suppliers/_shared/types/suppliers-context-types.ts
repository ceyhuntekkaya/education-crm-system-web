import type { SupplierDto } from "@/types";
import type { RefObject } from "react";

export type SortField = "none" | "createdAt" | "companyName" | "averageRating";
export type SortOrder = "asc" | "desc";

export interface SortOption {
  value: SortField;
  label: string;
  icon: string;
}

// Filter Types
export interface FilterState {
  isActive: "ALL" | "true" | "false";
  dateFrom: string | null;
  dateTo: string | null;
  searchQuery: string;
  minRating: number | null;
}

export interface FilterHandlers {
  setIsActive: (isActive: "ALL" | "true" | "false") => void;
  setDateFrom: (date: string | null) => void;
  setDateTo: (date: string | null) => void;
  setSearchQuery: (query: string) => void;
  setMinRating: (rating: number | null) => void;
  resetFilters: () => void;
  clearDateRange: () => void;
}

export interface SuppliersContextValue {
  // Company ID
  companyId: number;

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

  // Filter State
  filters: FilterState;

  // Filter Handlers
  filterHandlers: FilterHandlers;

  // Active Filter Count
  activeFilterCount: number;

  // API State
  suppliersListLoading: boolean;
  suppliersListError: string | null;
  suppliersListRefetch: () => void;

  // Data
  suppliers: SupplierDto[];
  totalElements: number;
  suppliersListIsEmpty: boolean;
}

export interface SuppliersProviderProps {
  children: React.ReactNode;
  companyId: number;
}
