"use client";

import React, { useState, useMemo } from "react";
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
  loading?: LoadingState;
  emptyState?: EmptyStateConfig;
  className?: string;
  height?: number | string;
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
  loading = false,
  emptyState,
  className = "",
  height = "auto",
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

  if (showSkeletonLoading) {
    return (
      <div className="card">
        <div className="card-body">
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
          <div className="table-responsive">
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
          <div className="d-flex align-items-center justify-content-end gap-4 pt-3 border-top">
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
      <div className="card">
        <div className="card-body text-center py-5">
          <div className="mb-4">
            <i
              className={`ph-bold ${emptyConfig.icon} text-neutral-400`}
              style={{ fontSize: "48px" }}
            ></i>
          </div>
          <h5 className="text-neutral-600 mb-2">{emptyConfig.title}</h5>
          <p className="text-neutral-500 mb-4">{emptyConfig.description}</p>
          {emptyConfig.showActions && (
            <div className="d-flex justify-content-center gap-2">
              {emptyConfig.onAddNew && (
                <Button
                  leftIcon="ph-plus"
                  size="sm"
                  className="btn-main"
                  onClick={emptyConfig.onAddNew}
                >
                  {emptyConfig.addButtonText}
                </Button>
              )}
              {emptyConfig.onRefresh && (
                <Button
                  variant="outline"
                  leftIcon="ph-arrow-clockwise"
                  size="sm"
                  onClick={emptyConfig.onRefresh}
                >
                  {emptyConfig.refreshButtonText}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`data-grid card ${className} ${isLoading ? "loading" : ""}`}
      style={{
        height,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        border: "1px solid #e9ecef",
        position: "relative",
      }}
    >
      {/* Table Container */}
      <div
        className="table-responsive"
        style={{
          borderRadius: "8px",
          overflow: "auto",
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
            {processedData.data.map((row, index) => (
              <tr
                key={row.id || index}
                className={`${selectedRows.has(row.id) ? "table-active" : ""}`}
                onClick={() => {
                  if (!disableRowSelectionOnClick && checkboxSelection) {
                    handleRowSelection(row.id, !selectedRows.has(row.id));
                  }
                }}
                style={{
                  cursor:
                    !disableRowSelectionOnClick && checkboxSelection
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
                    Math.max(80, Math.ceil(column.headerName.length * 8) + 40);

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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination positioned at bottom right - Based on attachment */}
      <div className="data-grid-pagination">
        <div className="pagination-controls">
          <div className="page-size-control">
            <span className="pagination-label">Rows per page:</span>
            <select
              className="pagination-select"
              value={pagination.pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="pagination-info">
            {pagination.page * pagination.pageSize + 1}–
            {Math.min(
              (pagination.page + 1) * pagination.pageSize,
              processedData.total
            )}{" "}
            of {processedData.total}
          </div>

          <div className="pagination-buttons">
            <button
              className="pagination-nav-btn"
              disabled={pagination.page === 0}
              onClick={() => handlePageChange(pagination.page - 1)}
              title="Previous page"
            >
              <i className="ph ph-caret-left"></i>
            </button>

            <button
              className="pagination-nav-btn"
              disabled={pagination.page >= processedData.totalPages - 1}
              onClick={() => handlePageChange(pagination.page + 1)}
              title="Next page"
            >
              <i className="ph ph-caret-right"></i>
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
