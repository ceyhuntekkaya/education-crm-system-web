"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import type { ViewMode, SortOrder } from "../types";

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface DataCollectionLayoutContextValue {
  // View Mode
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;

  // Sort
  sortBy: string;
  sortOrder: SortOrder;
  setSortBy: (field: string) => void;
  setSortOrder: (order: SortOrder) => void;
  toggleSortOrder: () => void;
  handleSortChange: (field: string) => void;
  resetSort: () => void;
  showSortDropdown: boolean;
  setShowSortDropdown: (show: boolean) => void;
  toggleSortDropdown: () => void;
  sortDropdownRef: React.RefObject<HTMLDivElement>;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Active Filters Count
  activeFiltersCount: number;
  setActiveFiltersCount: (count: number) => void;
}

interface DataCollectionLayoutProviderProps {
  children: React.ReactNode;
  defaultViewMode?: ViewMode;
  defaultSortBy?: string;
  defaultSortOrder?: SortOrder;
  onSortChange?: (sortBy: string, sortOrder: SortOrder) => void;
  onSearchChange?: (query: string) => void;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════════════════

const DataCollectionLayoutContext = createContext<DataCollectionLayoutContextValue | undefined>(
  undefined
);

// ═══════════════════════════════════════════════════════════════════════════
// PROVIDER
// ═══════════════════════════════════════════════════════════════════════════

export function DataCollectionLayoutProvider({
  children,
  defaultViewMode = "grid",
  defaultSortBy = "none",
  defaultSortOrder = "desc",
  onSortChange,
  onSearchChange,
}: DataCollectionLayoutProviderProps) {
  // View Mode
  const [viewMode, setViewMode] = useState<ViewMode>(defaultViewMode);

  // Sort
  const [sortBy, setSortBy] = useState<string>(defaultSortBy);
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSortOrder);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Store defaults for reset using useRef
  const defaultSortByRef = useRef(defaultSortBy);
  const defaultSortOrderRef = useRef(defaultSortOrder);

  // Update refs when props change - use stable refs to prevent unnecessary re-renders
  useEffect(() => {
    if (defaultSortByRef.current !== defaultSortBy) {
      defaultSortByRef.current = defaultSortBy;
    }
    if (defaultSortOrderRef.current !== defaultSortOrder) {
      defaultSortOrderRef.current = defaultSortOrder;
    }
  }, [defaultSortBy, defaultSortOrder]);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Active Filters
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // ─────────────────────────────────────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────────────────────────────────────

  const toggleViewMode = useCallback(() => {
    setViewMode((prev: ViewMode) => (prev === "grid" ? "list" : "grid"));
  }, []);

  const toggleSortOrder = useCallback(() => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onSortChange?.(sortBy, newOrder);
  }, [sortOrder, sortBy, onSortChange]);

  const handleSortChange = useCallback(
    (field: string) => {
      setSortBy(field);
      onSortChange?.(field, sortOrder);
      setShowSortDropdown(false);
    },
    [sortOrder, onSortChange]
  );

  const resetSort = useCallback(() => {
    setSortBy(defaultSortByRef.current);
    setSortOrder(defaultSortOrderRef.current);
    onSortChange?.(defaultSortByRef.current, defaultSortOrderRef.current);
  }, [onSortChange]);

  const toggleSortDropdown = useCallback(() => {
    setShowSortDropdown((prev) => !prev);
  }, []);

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      onSearchChange?.(query);
    },
    [onSearchChange]
  );

  // ─────────────────────────────────────────────────────────────────────────
  // CONTEXT VALUE
  // ─────────────────────────────────────────────────────────────────────────

  const value = useMemo(
    () => ({
      viewMode,
      setViewMode,
      toggleViewMode,
      sortBy,
      sortOrder,
      setSortBy,
      setSortOrder,
      toggleSortOrder,
      handleSortChange,
      resetSort,
      showSortDropdown,
      setShowSortDropdown,
      toggleSortDropdown,
      sortDropdownRef,
      searchQuery,
      setSearchQuery: handleSearchChange,
      activeFiltersCount,
      setActiveFiltersCount,
    }),
    [
      viewMode,
      sortBy,
      sortOrder,
      showSortDropdown,
      searchQuery,
      activeFiltersCount,
      toggleViewMode,
      toggleSortOrder,
      handleSortChange,
      resetSort,
      toggleSortDropdown,
      handleSearchChange,
    ]
  );

  return (
    <DataCollectionLayoutContext.Provider value={value}>
      {children}
    </DataCollectionLayoutContext.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════════════

export function useDataCollectionLayoutContext() {
  const context = useContext(DataCollectionLayoutContext);
  if (!context) {
    throw new Error(
      "useDataCollectionLayoutContext must be used within a DataCollectionLayoutProvider"
    );
  }
  return context;
}
