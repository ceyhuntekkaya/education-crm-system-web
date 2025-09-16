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

// DataGrid props interface
export interface DataGridProps<T = any> {
  rows: T[];
  columns: GridColDef<T>[];
  pageSize?: number;
  pageSizeOptions?: number[];
  checkboxSelection?: boolean;
  disableRowSelectionOnClick?: boolean;
  onRowSelectionChange?: (selectedRows: T[]) => void;
  loading?: boolean;
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
    return total;
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

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 mb-0">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`data-grid card ${className}`} style={{ height }}>
      {/* Table Container */}
      <div className="table-responsive">
        <table
          className="table table-hover mb-0"
          style={{
            tableLayout: "fixed",
            width: `${totalWidth}px`,
            minWidth: "100%",
          }}
        >
          <thead className="table-light">
            <tr>
              {checkboxSelection && (
                <th
                  className="data-grid-checkbox-cell"
                  style={{
                    width: "50px",
                    minWidth: "50px",
                    maxWidth: "50px",
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
                      padding: "8px 12px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
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
                }}
              >
                {checkboxSelection && (
                  <td
                    className="data-grid-checkbox-cell"
                    style={{
                      width: "50px",
                      minWidth: "50px",
                      maxWidth: "50px",
                      padding: "8px 12px",
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
                        padding: "8px 12px",
                        overflow: "hidden",
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
    </div>
  );
}

export default DataGrid;
