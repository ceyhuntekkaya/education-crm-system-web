"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "../button";

// Column definition types
export interface GridColDef<T = any> {
  field: keyof T | string;
  headerName: string;
  width?: number;
  minWidth?: number;
  editable?: boolean;
  sortable?: boolean;
  type?: "string" | "number" | "boolean" | "date";
  description?: string;
  valueGetter?: (value: any, row: T) => any;
  renderCell?: (params: {
    value: any;
    row: T;
    field: string;
  }) => React.ReactNode;
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
  hideOnMobile?: boolean; // Hide this column on mobile devices
  priority?: number; // Column priority for responsive hiding (1 = highest priority, shown first on mobile)
}

// Loading state types
export type LoadingState =
  | boolean
  | {
      type: "skeleton" | "overlay" | "spinner";
      message?: string;
      showProgress?: boolean;
    };

// Empty state configuration
export interface EmptyStateConfig {
  icon?: string;
  title?: string;
  description?: string;
  showActions?: boolean;
  onAddNew?: () => void;
  onRefresh?: () => void;
  addButtonText?: string;
  refreshButtonText?: string;
}

// DataGrid props interface
export interface DataGridProps<T = any> {
  rows: T[];
  columns: GridColDef<T>[];
  pageSize?: number;
  pageSizeOptions?: number[];
  checkboxSelection?: boolean;
  disableRowSelectionOnClick?: boolean;
  onRowSelectionChange?: (selectedRows: T[]) => void;
  onRowClick?: (params: {
    row: T;
    field: string;
    event: React.MouseEvent;
  }) => void;
  loading?: LoadingState;
  emptyState?: EmptyStateConfig;
  className?: string;
  height?: number | string;
  rowClassName?: (row: T, index: number) => string;
  initialState?: {
    pagination?: {
      paginationModel?: {
        pageSize?: number;
        page?: number;
      };
    };
  };
}

// Pagination state interface
interface PaginationState {
  page: number;
  pageSize: number;
}

// Sort state interface
interface SortState {
  field: string;
  direction: "asc" | "desc" | null;
}

export function DataGrid<T extends Record<string, any>>({
  rows,
  columns,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  checkboxSelection = false,
  disableRowSelectionOnClick = false,
  onRowSelectionChange,
  onRowClick,
  loading = false,
  emptyState,
  className = "",
  height = 600,
  rowClassName,
  initialState,
}: DataGridProps<T>) {
  // State management
  const [pagination, setPagination] = useState<PaginationState>({
    page: initialState?.pagination?.paginationModel?.page || 0,
    pageSize: initialState?.pagination?.paginationModel?.pageSize || pageSize,
  });

  const [sortState, setSortState] = useState<SortState>({
    field: "",
    direction: null,
  });

  const [selectedRows, setSelectedRows] = useState<Set<any>>(new Set());
  
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Loading state helpers
  const isLoading = useMemo(() => {
    return typeof loading === "boolean" ? loading : !!loading;
  }, [loading]);

  const loadingConfig = useMemo(() => {
    if (typeof loading === "boolean") {
      return { type: "skeleton" as const, message: "Veriler yükleniyor..." };
    }
    return (
      loading || { type: "skeleton" as const, message: "Veriler yükleniyor..." }
    );
  }, [loading]);

  const showSkeletonLoading = isLoading && loadingConfig.type === "skeleton";
  const showOverlayLoading = isLoading && loadingConfig.type === "overlay";
  const showSpinnerLoading = isLoading && loadingConfig.type === "spinner";

  // Empty state helper
  const isEmpty = !isLoading && rows.length === 0;

  // Memoized sorted and paginated data
  const processedData = useMemo(() => {
    let sortedData = [...rows];

    // Apply sorting
    if (sortState.field && sortState.direction) {
      sortedData.sort((a, b) => {
        const aValue = a[sortState.field];
        const bValue = b[sortState.field];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        let comparison = 0;
        if (typeof aValue === "number" && typeof bValue === "number") {
          comparison = aValue - bValue;
        } else {
          comparison = String(aValue).localeCompare(String(bValue));
        }

        return sortState.direction === "asc" ? comparison : -comparison;
      });
    }

    // Apply pagination
    const startIndex = pagination.page * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;

    return {
      data: sortedData.slice(startIndex, endIndex),
      total: rows.length,
      totalPages: Math.ceil(rows.length / pagination.pageSize),
    };
  }, [rows, sortState, pagination]);

  // Filter columns for responsive views
  const visibleColumns = useMemo(() => {
    if (!isMobile) return columns;
    
    // On mobile, show only columns without hideOnMobile flag
    // Or show columns based on priority
    return columns
      .filter((col) => !col.hideOnMobile)
      .sort((a, b) => {
        const priorityA = a.priority || 999;
        const priorityB = b.priority || 999;
        return priorityA - priorityB;
      })
      .slice(0, isMobile ? 2 : columns.length); // Show max 2 columns on mobile
  }, [columns, isMobile]);

  // Calculate total table width
  const totalWidth = useMemo(() => {
    let total = 0;
    if (checkboxSelection) {
      total += 50; // Checkbox column width
    }
    columns.forEach((column) => {
      if (column.width) {
        total += column.width;
      } else if (column.minWidth) {
        total += column.minWidth;
      } else {
        total += 120; // Default minimum width
      }
    });
    return Math.max(total, 800); // Minimum table width to ensure scroll when needed
  }, [columns, checkboxSelection]);

  // Handle sorting
  const handleSort = (field: string) => {
    const column = columns.find((col) => col.field === field);
    if (column?.sortable === false) return;

    setSortState((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc"
          ? "desc"
          : prev.field === field && prev.direction === "desc"
          ? null
          : "asc",
    }));
  };

  // Handle row selection
  const handleRowSelection = (rowId: any, selected: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    if (selected) {
      newSelectedRows.add(rowId);
    } else {
      newSelectedRows.delete(rowId);
    }
    setSelectedRows(newSelectedRows);

    if (onRowSelectionChange) {
      const selectedRowData = rows.filter((row) => newSelectedRows.has(row.id));
      onRowSelectionChange(selectedRowData);
    }
  };

  // Handle select all
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allIds = new Set(rows.map((row) => row.id));
      setSelectedRows(allIds);
      if (onRowSelectionChange) {
        onRowSelectionChange(rows);
      }
    } else {
      setSelectedRows(new Set());
      if (onRowSelectionChange) {
        onRowSelectionChange([]);
      }
    }
  };

  // Handle pagination change
  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination({ page: 0, pageSize: newPageSize });
  };

  // Get cell value
  const getCellValue = (row: T, column: GridColDef<T>) => {
    if (column.valueGetter) {
      return column.valueGetter(row[column.field as keyof T], row);
    }
    return row[column.field as keyof T];
  };

  // Render cell content
  const renderCellContent = (row: T, column: GridColDef<T>) => {
    const value = getCellValue(row, column);

    if (column.renderCell) {
      return column.renderCell({
        value,
        row,
        field: column.field as string,
      });
    }

    return value?.toString() || "";
  };

  // Get sort icon
  const getSortIcon = (field: string) => {
    if (sortState.field !== field || !sortState.direction) return null;
    return sortState.direction === "asc" ? "↑" : "↓";
  };

  // Mobile Card View Renderer
  const renderMobileCard = (row: T, index: number) => {
    const customRowClass = rowClassName ? rowClassName(row, index) : "";
    const isSelected = selectedRows.has(row.id);

    // Get first column as main title
    const mainColumn = columns[0];
    const mainValue = getCellValue(row, mainColumn);
    const otherColumns = columns.slice(1);

    return (
      <div
        key={row.id || index}
        className={`data-grid-mobile-card ${isSelected ? "selected" : ""} ${customRowClass}`}
        style={{
          backgroundColor: "#FFFFFF",
          border: `2px solid ${isSelected ? "#487FFF" : "#E5E7EB"}`,
          borderRadius: "20px",
          padding: "0",
          marginBottom: "12px",
          boxShadow: isSelected
            ? "0 8px 20px rgba(72, 127, 255, 0.15), 0 2px 8px rgba(72, 127, 255, 0.1)"
            : "0 4px 12px rgba(15, 23, 42, 0.08), 0 1px 4px rgba(15, 23, 42, 0.04)",
          cursor: onRowClick || checkboxSelection ? "pointer" : "default",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
        onClick={(event) => {
          if (!disableRowSelectionOnClick && checkboxSelection) {
            handleRowSelection(row.id, !isSelected);
          }
          if (onRowClick) {
            onRowClick({ row, field: "", event });
          }
        }}
      >
        {/* Header Section with gradient background */}
        <div
          style={{
            padding: "18px",
            background: isSelected 
              ? "linear-gradient(135deg, #487FFF 0%, #6B9FFF 100%)"
              : "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
            borderBottom: isSelected ? "none" : "2px solid #E5E7EB",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div style={{ flex: 1 }}>
            {mainColumn.renderCell ? (
              <div style={{ 
                fontSize: "17px", 
                fontWeight: 700, 
                color: isSelected ? "#FFFFFF" : "#0F172A",
                lineHeight: "1.4",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
              }}>
                {renderCellContent(row, mainColumn)}
              </div>
            ) : (
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: isSelected ? "#FFFFFF" : "#0F172A",
                  lineHeight: "1.4",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {mainValue?.toString() || "-"}
              </div>
            )}
            <div
              style={{
                fontSize: "11px",
                color: isSelected ? "rgba(255, 255, 255, 0.85)" : "#64748B",
                marginTop: "6px",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                fontWeight: 600,
                lineHeight: "1.2",
              }}
            >
              {mainColumn.headerName}
            </div>
          </div>

          {checkboxSelection && (
            <div className="form-check" style={{ margin: 0, flexShrink: 0 }}>
              <input
                type="checkbox"
                className="form-check-input"
                checked={isSelected}
                onChange={(e) => handleRowSelection(row.id, e.target.checked)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "22px",
                  height: "22px",
                  marginTop: "2px",
                  border: isSelected ? "2px solid #FFFFFF" : "2px solid #CBD5E1",
                  backgroundColor: isSelected ? "#FFFFFF" : "transparent",
                  flexShrink: 0,
                }}
              />
            </div>
          )}
        </div>

        {/* Content Section with distinct styling */}
        <div
          style={{
            padding: "20px 18px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "18px",
            backgroundColor: "#FAFBFC",
          }}
        >
          {otherColumns.map((column, colIndex) => {
            const value = getCellValue(row, column);

            return (
              <div
                key={column.field as string}
                className="data-grid-mobile-field"
                style={{
                  padding: "14px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#64748B",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    marginBottom: "8px",
                  }}
                >
                  {column.headerName}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#1E293B",
                    lineHeight: "1.5",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {column.renderCell
                    ? renderCellContent(row, column)
                    : value?.toString() || "-"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (showSkeletonLoading) {
    return (
      <div
        className="card"
        style={{
          height,
          minHeight: typeof height === "number" ? `${height}px` : "400px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid #e9ecef",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="card-body"
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          {/* Header skeleton */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="skeleton-loader skeleton-circle"
                style={{ width: "24px", height: "24px" }}
              ></div>
              <div
                className="skeleton-loader"
                style={{ width: "120px", height: "20px" }}
              ></div>
            </div>
            <div
              className="skeleton-loader"
              style={{ width: "80px", height: "32px" }}
            ></div>
          </div>

          {/* Table skeleton */}
          <div className="table-responsive" style={{ flex: 1 }}>
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  {checkboxSelection && (
                    <th style={{ width: "50px", padding: "16px 20px" }}>
                      <div
                        className="skeleton-loader skeleton-circle"
                        style={{ width: "16px", height: "16px" }}
                      ></div>
                    </th>
                  )}
                  {columns.map((column, index) => (
                    <th key={index} style={{ padding: "16px 20px" }}>
                      <div
                        className="skeleton-loader"
                        style={{
                          width: `${Math.min(
                            column.headerName.length * 8 + 40,
                            150
                          )}px`,
                          height: "16px",
                        }}
                      ></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(Math.min(pageSize, 5))].map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {checkboxSelection && (
                      <td style={{ padding: "16px 20px" }}>
                        <div
                          className="skeleton-loader skeleton-circle"
                          style={{ width: "16px", height: "16px" }}
                        ></div>
                      </td>
                    )}
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} style={{ padding: "16px 20px" }}>
                        <div
                          className="skeleton-loader"
                          style={{
                            width: `${Math.floor(Math.random() * 80) + 60}px`,
                            height: "16px",
                            animationDelay: `${
                              (rowIndex * columns.length + colIndex) * 0.1
                            }s`,
                          }}
                        ></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Loading indicator */}
          <div className="d-flex align-items-center justify-content-center py-4">
            <div className="d-flex align-items-center gap-3">
              <i
                className="ph-bold ph-spinner-gap animate-spin text-main-600"
                style={{ fontSize: "20px" }}
              ></i>
              <span className="text-neutral-600 fw-medium">
                Veriler yükleniyor...
              </span>
            </div>
          </div>

          {/* Pagination skeleton */}
          <div
            className="d-flex align-items-center justify-content-end gap-4 border-top"
            style={{
              flexShrink: 0,
              padding: "16px 20px",
              marginTop: "auto",
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <div
                className="skeleton-loader"
                style={{ width: "100px", height: "16px" }}
              ></div>
              <div
                className="skeleton-loader"
                style={{ width: "60px", height: "32px" }}
              ></div>
            </div>
            <div
              className="skeleton-loader"
              style={{ width: "120px", height: "16px" }}
            ></div>
            <div className="d-flex gap-1">
              <div
                className="skeleton-loader skeleton-circle"
                style={{ width: "32px", height: "32px" }}
              ></div>
              <div
                className="skeleton-loader skeleton-circle"
                style={{ width: "32px", height: "32px" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state render
  if (isEmpty) {
    const emptyConfig = {
      icon: "ph-database",
      title: "Veri Bulunamadı",
      description:
        "Henüz görüntülenecek veri bulunmuyor. Filtreleri kontrol edin veya yeni veri ekleyin.",
      showActions: true,
      addButtonText: "Yeni Ekle",
      refreshButtonText: "Yenile",
      ...emptyState,
    };

    return (
      <div
        className={`data-grid card ${isMobile ? "mobile-view" : ""}`}
        style={{
          height: isMobile ? "auto" : height,
          minHeight: typeof height === "number" ? `${height}px` : "400px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid #e9ecef",
          borderRadius: "12px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Table header for consistency - hide on mobile */}
        {!isMobile && (
          <div
            className="table-responsive"
            style={{ borderRadius: "12px 12px 0 0" }}
          >
            <table className="table mb-0">
              <thead className="table-light">
                <tr style={{ height: "56px" }}>
                  {checkboxSelection && (
                    <th
                      className="data-grid-checkbox-cell"
                      style={{
                        width: "50px",
                        backgroundColor: "#f8f9fa",
                        borderBottom: "1px solid #e9ecef",
                      }}
                    ></th>
                  )}
                  {columns.map((column, index) => (
                    <th
                      key={String(column.field)}
                      style={{
                        width: column.width || column.minWidth || 120,
                        backgroundColor: "#f8f9fa",
                        borderBottom: "1px solid #e9ecef",
                        padding: "16px 12px",
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#798090",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {column.headerName}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
        )}

        {/* Empty state content */}
        <div
          className="data-grid-empty-state"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: isMobile ? "300px" : "400px",
            backgroundColor: "#ffffff",
          }}
        >
          <div className="text-center" style={{ padding: isMobile ? "40px 20px" : "60px 40px" }}>
            <div className="mb-4">
            <div
              style={{
                width: isMobile ? "64px" : "80px",
                height: isMobile ? "64px" : "80px",
                borderRadius: "50%",
                backgroundColor: "#f8f9fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                border: "1px solid #e9ecef",
              }}
            >
              <i
                className={`ph-bold ${emptyConfig.icon}`}
                style={{
                  fontSize: isMobile ? "28px" : "32px",
                  color: "#9ca3af",
                }}
              ></i>
            </div>
          </div>
          <h5
            style={{
              color: "#343e56",
              marginBottom: "12px",
              fontWeight: 600,
              fontSize: isMobile ? "16px" : "18px",
            }}
          >
            {emptyConfig.title}
          </h5>
          <p
            style={{
              color: "#798090",
              marginBottom: "32px",
              fontSize: isMobile ? "13px" : "14px",
              lineHeight: "1.5",
              maxWidth: "400px",
              margin: "0 auto 32px",
            }}
          >
            {emptyConfig.description}
          </p>
          {emptyConfig.showActions && (
            <div className={`d-flex ${isMobile ? "flex-column" : ""} justify-content-center gap-3`}>
                {emptyConfig.onAddNew && (
                  <Button
                    leftIcon="ph-plus"
                    size="md"
                    className="btn-main"
                    onClick={emptyConfig.onAddNew}
                    style={{
                      padding: "12px 24px",
                      fontWeight: 500,
                    }}
                  >
                    {emptyConfig.addButtonText}
                  </Button>
                )}
                {emptyConfig.onRefresh && (
                  <Button
                    variant="outline"
                    leftIcon="ph-arrow-clockwise"
                    size="md"
                    onClick={emptyConfig.onRefresh}
                    style={{
                      padding: "12px 24px",
                      fontWeight: 500,
                    }}
                  >
                    {emptyConfig.refreshButtonText}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`data-grid card ${className} ${isLoading ? "loading" : ""} ${isMobile ? "mobile-view" : ""}`}
      style={{
        height: isMobile ? "auto" : height,
        minHeight: isMobile ? "auto" : (typeof height === "number" ? `${height}px` : "400px"),
        boxShadow: isMobile ? "none" : "0 2px 8px rgba(0,0,0,0.1)",
        border: isMobile ? "none" : "1px solid #e9ecef",
        borderRadius: isMobile ? "0" : "12px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        backgroundColor: isMobile ? "transparent" : "#FFFFFF",
        overflow: isMobile ? "visible" : "hidden",
      }}
    >
      {/* Mobile Card View */}
      {isMobile ? (
        <div
          className="data-grid-mobile-container"
          style={{
            flex: 1,
            overflow: "auto",
            padding: "12px",
            backgroundColor: "#F8FAFC",
            marginTop: 0,
          }}
        >
          {checkboxSelection && processedData.data.length > 0 && (
            <div
              className="form-check"
              style={{
                padding: "16px",
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "2px solid #E5E7EB",
                boxShadow: "0 2px 6px rgba(15, 23, 42, 0.06)",
                marginBottom: "12px",
              }}
            >
              <input
                type="checkbox"
                className="form-check-input"
                checked={selectedRows.size === rows.length && rows.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
                style={{
                  width: "20px",
                  height: "20px",
                  border: "2px solid #CBD5E1",
                }}
              />
              <label className="form-check-label ms-2" style={{ 
                fontSize: "14px", 
                fontWeight: 700,
                color: "#1E293B",
                wordBreak: "break-word",
                lineHeight: "1.4",
              }}>
                Tümünü Seç <span style={{ color: "#64748B", fontWeight: 600 }}>({selectedRows.size}/{rows.length})</span>
              </label>
            </div>
          )}
          {processedData.data.map((row, index) => renderMobileCard(row, index))}
        </div>
      ) : (
        /* Desktop Table View */
        <div
          className="table-responsive"
          style={{
            borderRadius: "8px",
            overflow: "auto",
            flex: 1,
            maxHeight:
              typeof height === "number"
                ? `${height - 80}px`
                : "calc(100% - 80px)",
          }}
        >
          <table
            className="table table-hover mb-0"
            style={{
              tableLayout: "fixed",
              width: `${totalWidth}px`,
              minWidth: "100%",
              borderCollapse: "separate",
              borderSpacing: "0",
            }}
          >
            <thead className="table-light">
              <tr style={{ height: "56px" }}>
                {checkboxSelection && (
                  <th
                    className="data-grid-checkbox-cell"
                    style={{
                      width: "50px",
                      minWidth: "50px",
                      maxWidth: "50px",
                      padding: "16px 20px",
                      backgroundColor: "#f8f9fa",
                      borderBottom: "2px solid #e9ecef",
                    }}
                  >
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={
                          selectedRows.size === rows.length && rows.length > 0
                        }
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </div>
                  </th>
                )}
                {columns.map((column) => {
                const columnWidth = column.width || column.minWidth || 120;
                const columnMinWidth =
                  column.minWidth ||
                  Math.max(80, Math.ceil(column.headerName.length * 8) + 40); // Dynamic min width based on header text

                return (
                  <th
                    key={column.field as string}
                    className={`${column.sortable !== false ? "sortable" : ""}`}
                    style={{
                      width: `${columnWidth}px`,
                      minWidth: `${columnMinWidth}px`,
                      maxWidth: column.width ? `${column.width}px` : undefined,
                      textAlign: column.headerAlign || "left",
                      cursor: column.sortable !== false ? "pointer" : "default",
                      padding: "16px 20px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: "14px",
                      fontWeight: "600",
                      backgroundColor: "#f8f9fa",
                      borderBottom: "2px solid #e9ecef",
                    }}
                    onClick={() =>
                      column.sortable !== false &&
                      handleSort(column.field as string)
                    }
                    title={column.description || column.headerName}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flexGrow: 1,
                        }}
                      >
                        {column.headerName}
                      </span>
                      {column.sortable !== false && (
                        <span className="text-muted small ms-1 flex-shrink-0">
                          {getSortIcon(column.field as string) || "⇅"}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {processedData.data.map((row, index) => {
              const customRowClass = rowClassName
                ? rowClassName(row, index)
                : "";
              const baseRowClass = selectedRows.has(row.id)
                ? "table-active"
                : "";
              const finalRowClass = `${baseRowClass} ${customRowClass}`.trim();

              return (
                <tr
                  key={row.id || index}
                  className={finalRowClass}
                  onClick={(event) => {
                    // Handle row selection for checkbox mode
                    if (!disableRowSelectionOnClick && checkboxSelection) {
                      handleRowSelection(row.id, !selectedRows.has(row.id));
                    }

                    // Handle custom row click
                    if (onRowClick) {
                      onRowClick({
                        row,
                        field: "",
                        event,
                      });
                    }
                  }}
                  style={{
                    cursor:
                      (!disableRowSelectionOnClick && checkboxSelection) ||
                      onRowClick
                        ? "pointer"
                        : "default",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!selectedRows.has(row.id)) {
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selectedRows.has(row.id)) {
                      e.currentTarget.style.backgroundColor = "";
                    }
                  }}
                >
                  {checkboxSelection && (
                    <td
                      className="data-grid-checkbox-cell"
                      style={{
                        width: "50px",
                        minWidth: "50px",
                        maxWidth: "50px",
                        padding: "16px 20px",
                        borderBottom: "1px solid #e9ecef",
                      }}
                    >
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedRows.has(row.id)}
                          onChange={(e) =>
                            handleRowSelection(row.id, e.target.checked)
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                  )}
                  {columns.map((column) => {
                    const columnWidth = column.width || column.minWidth || 120;
                    const columnMinWidth =
                      column.minWidth ||
                      Math.max(
                        80,
                        Math.ceil(column.headerName.length * 8) + 40
                      );

                    return (
                      <td
                        key={column.field as string}
                        style={{
                          width: `${columnWidth}px`,
                          minWidth: `${columnMinWidth}px`,
                          maxWidth: column.width
                            ? `${column.width}px`
                            : undefined,
                          textAlign: column.align || "left",
                          padding: "16px 20px",
                          overflow: "hidden",
                          borderBottom: "1px solid #e9ecef",
                          fontSize: "14px",
                          lineHeight: "1.5",
                        }}
                      >
                        {column.renderCell ? (
                          <div className="custom-cell-content">
                            {renderCellContent(row, column)}
                          </div>
                        ) : (
                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {renderCellContent(row, column)}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      )}

      {/* Custom Pagination Footer - Clean Modern Design */}
      <div
        className="data-grid-pagination"
        style={{
          flexShrink: 0,
          padding: isMobile ? "16px" : "16px 24px",
          borderTop: isMobile ? "2px solid #E5E7EB" : "1px solid #f3f4f6",
          backgroundColor: isMobile ? "#FFFFFF" : "#fafbfc",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: "space-between",
          gap: isMobile ? "12px" : "20px",
          boxShadow: isMobile ? "0 -4px 12px rgba(15, 23, 42, 0.06)" : "none",
        }}
      >
        {/* Left side - Rows per page */}
        <div
          className="page-size-control"
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px",
            justifyContent: isMobile ? "space-between" : "flex-start",
            padding: isMobile ? "14px 16px" : "0",
            backgroundColor: isMobile ? "#F8FAFC" : "transparent",
            borderRadius: isMobile ? "16px" : "0",
            border: isMobile ? "2px solid #E5E7EB" : "none",
          }}
        >
          <span
            className="pagination-label"
            style={{
              fontSize: isMobile ? "13px" : "14px",
              color: isMobile ? "#64748B" : "#6b7280",
              fontWeight: 700,
              whiteSpace: "nowrap",
              textTransform: isMobile ? "uppercase" : "none",
              letterSpacing: isMobile ? "0.5px" : "normal",
            }}
          >
            Göster:
          </span>
          <div style={{ position: "relative", display: "inline-flex" }}>
            <select
              className="pagination-select"
              value={pagination.pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              style={{
                padding: isMobile ? "11px 50px 11px 18px" : "6px 32px 6px 12px",
                border: isMobile ? "2px solid #CBD5E1" : "none",
                borderRadius: isMobile ? "14px" : "8px",
                fontSize: isMobile ? "15px" : "14px",
                fontWeight: 700,
                backgroundColor: "#FFFFFF",
                color: isMobile ? "#1E293B" : "#374151",
                cursor: "pointer",
                boxShadow: isMobile ? "0 2px 6px rgba(15, 23, 42, 0.08)" : "0 1px 3px rgba(0, 0, 0, 0.08)",
                appearance: "none",
                outline: "none",
                transition: "all 0.2s ease",
                minWidth: isMobile ? "70px" : "auto",
              }}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <i
              className="ph ph-caret-down"
              style={{
                position: "absolute",
                right: isMobile ? "16px" : "10px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: isMobile ? "18px" : "14px",
                color: isMobile ? "#64748B" : "#9ca3af",
                pointerEvents: "none",
              }}
            ></i>
          </div>
          {/* <span
            style={{
              fontSize: "14px",
              color: "#9ca3af",
              whiteSpace: "nowrap",
            }}
          >
            satır
          </span> */}
        </div>

        {/* Right side - Navigation and info */}
        <div
          className="pagination-controls"
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: isMobile ? "12px" : "24px",
            justifyContent: isMobile ? "space-between" : "flex-end",
            padding: isMobile ? "14px 16px" : "0",
            backgroundColor: isMobile ? "#F8FAFC" : "transparent",
            borderRadius: isMobile ? "16px" : "0",
            border: isMobile ? "2px solid #E5E7EB" : "none",
          }}
        >
          <div
            className="pagination-info"
            style={{
              fontSize: isMobile ? "15px" : "14px",
              color: isMobile ? "#1E293B" : "#374151",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: isMobile ? "#1E293B" : "#374151" }}>
              {pagination.page * pagination.pageSize + 1}–
              {Math.min(
                (pagination.page + 1) * pagination.pageSize,
                processedData.total
              )}
            </span>
            {" "}
            <span style={{ color: "#64748B", fontWeight: 600 }}>/ {processedData.total}</span>
          </div>

          <div
            className="pagination-buttons"
            style={{ display: "flex", alignItems: "center", gap: isMobile ? "10px" : "8px" }}
          >
            <button
              className="pagination-nav-btn"
              disabled={pagination.page === 0}
              onClick={() => handlePageChange(pagination.page - 1)}
              title="Önceki sayfa"
              style={{
                width: isMobile ? "46px" : "36px",
                height: isMobile ? "46px" : "36px",
                border: isMobile 
                  ? pagination.page === 0 
                    ? "2px solid #E5E7EB" 
                    : "2px solid #CBD5E1"
                  : "none",
                borderRadius: isMobile ? "16px" : "8px",
                backgroundColor: pagination.page === 0 
                  ? (isMobile ? "#F1F5F9" : "#f3f4f6")
                  : (isMobile ? "#FFFFFF" : "#fff"),
                color: pagination.page === 0 
                  ? (isMobile ? "#CBD5E1" : "#d1d5db")
                  : (isMobile ? "#1E293B" : "#374151"),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: pagination.page === 0 ? "not-allowed" : "pointer",
                boxShadow:
                  pagination.page === 0
                    ? "none"
                    : isMobile 
                    ? "0 2px 6px rgba(15, 23, 42, 0.08)"
                    : "0 1px 3px rgba(0, 0, 0, 0.08)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (pagination.page !== 0) {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 6px rgba(0, 0, 0, 0.12)";
                }
              }}
              onMouseLeave={(e) => {
                if (pagination.page !== 0) {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(0, 0, 0, 0.08)";
                }
              }}
            >
              <i
                className="ph-bold ph-caret-left"
                style={{ fontSize: isMobile ? "20px" : "18px" }}
              ></i>
            </button>

            <button
              className="pagination-nav-btn"
              disabled={pagination.page >= processedData.totalPages - 1}
              onClick={() => handlePageChange(pagination.page + 1)}
              title="Sonraki sayfa"
              style={{
                width: isMobile ? "46px" : "36px",
                height: isMobile ? "46px" : "36px",
                border: isMobile 
                  ? pagination.page >= processedData.totalPages - 1
                    ? "2px solid #E5E7EB" 
                    : "2px solid #CBD5E1"
                  : "none",
                borderRadius: isMobile ? "16px" : "8px",
                backgroundColor:
                  pagination.page >= processedData.totalPages - 1
                    ? (isMobile ? "#F1F5F9" : "#f3f4f6")
                    : (isMobile ? "#FFFFFF" : "#fff"),
                color:
                  pagination.page >= processedData.totalPages - 1
                    ? (isMobile ? "#CBD5E1" : "#d1d5db")
                    : (isMobile ? "#1E293B" : "#374151"),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor:
                  pagination.page >= processedData.totalPages - 1
                    ? "not-allowed"
                    : "pointer",
                boxShadow:
                  pagination.page >= processedData.totalPages - 1
                    ? "none"
                    : isMobile 
                    ? "0 2px 6px rgba(15, 23, 42, 0.08)"
                    : "0 1px 3px rgba(0, 0, 0, 0.08)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (pagination.page < processedData.totalPages - 1) {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 6px rgba(0, 0, 0, 0.12)";
                }
              }}
              onMouseLeave={(e) => {
                if (pagination.page < processedData.totalPages - 1) {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(0, 0, 0, 0.08)";
                }
              }}
            >
              <i
                className="ph-bold ph-caret-right"
                style={{ fontSize: isMobile ? "20px" : "18px" }}
              ></i>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Loading */}
      {showOverlayLoading && (
        <div
          className="data-grid-overlay-loading"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            borderRadius: "12px",
          }}
        >
          <div className="d-flex flex-column align-items-center gap-3">
            <i
              className="ph-bold ph-spinner-gap animate-spin text-main-600"
              style={{ fontSize: "32px" }}
            ></i>
            <div className="text-center">
              <p className="mb-1 fw-medium text-neutral-700">
                {loadingConfig.message}
              </p>
              {loadingConfig.showProgress && (
                <div
                  className="progress"
                  style={{ width: "200px", height: "4px" }}
                >
                  <div
                    className="progress-bar bg-main-600"
                    role="progressbar"
                    style={{
                      width: "60%",
                      animation: "progress-indeterminate 1.5s infinite linear",
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spinner Loading (minimal) */}
      {showSpinnerLoading && (
        <div
          className="data-grid-spinner-loading"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 10,
          }}
        >
          <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-pill shadow-sm border">
            <i
              className="ph-bold ph-circle-notch animate-spin text-main-600"
              style={{ fontSize: "16px" }}
            ></i>
            <span className="text-sm text-neutral-600">
              {loadingConfig.message}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataGrid;
