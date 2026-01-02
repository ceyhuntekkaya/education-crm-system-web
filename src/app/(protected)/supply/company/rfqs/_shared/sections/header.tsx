"use client";

import React from "react";
import { useQuotationsContext } from "../contexts";

export const Header: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    totalElements,
    sortBy,
    sortOrder,
    showSortDropdown,
    dropdownRef,
    sortOptions,
    currentSortOption,
    onSortChange,
    toggleSortDropdown,
    toggleSortOrder,
    resetSort,
  } = useQuotationsContext();

  return (
    <div
      className="bg-white rounded-16 mb-24 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center transition-all"
      style={{
        border: "1.5px solid hsl(var(--neutral-40))",
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        padding: "16px",
        overflow: "visible",
        position: "relative",
        zIndex: showSortDropdown ? 10000 : "auto",
      }}
    >
      {/* Left Side - Info */}
      <div className="d-flex align-items-center gap-12 flex-grow-1">
        <div
          className="d-flex align-items-center justify-content-center rounded-8 bg-primary-100 text-primary-700 flex-shrink-0"
          style={{
            width: "48px",
            height: "48px",
            transition: "all 0.2s ease",
          }}
        >
          <i className="ph-bold ph-file-text" style={{ fontSize: "24px" }}></i>
        </div>
        <div className="flex-grow-1 min-w-0">
          <h5 className="mb-4 fw-semibold text-neutral-900">
            Fiyat Teklifleri
          </h5>
          <div className="d-flex align-items-center gap-8 flex-wrap">
            <span className="text-neutral-600 text-xs fw-medium">Toplam</span>
            <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
              <i className="ph-bold ph-file-text text-xs"></i>
              {totalElements} teklif
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Sort & View Controls */}
      <div 
        className="d-flex align-items-center gap-12 flex-shrink-0"
        style={{ overflow: "visible" }}
      >
        {/* Sort Dropdown - Label */}
        <span className="text-neutral-600 text-xs fw-medium d-none d-md-inline">
          Sıralama:
        </span>
        
        {/* Sort Dropdown */}
        <div 
          className="position-relative" 
          ref={dropdownRef}
          style={{
            zIndex: showSortDropdown ? 9999 : 1,
          }}
        >
          {/* Sort Controls Container */}
          <div
            className="rounded-16 d-flex align-items-center"
            style={{
              padding: "4px",
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid rgba(17, 24, 39, 0.06)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              transition: "all 0.2s ease",
              gap: "4px",
            }}
          >
            {/* Field Selection Button */}
            <button
              type="button"
              className="d-flex align-items-center gap-8 border-0 transition-all rounded-12 bg-transparent text-neutral-700 fw-medium"
              onClick={toggleSortDropdown}
              style={{
                fontSize: "13px",
                cursor: "pointer",
                height: "40px",
                padding: "0 12px",
                flex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(var(--neutral-100))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <i
                className={`ph-duotone ${currentSortOption?.icon}`}
                style={{ fontSize: "16px" }}
              ></i>
              <span className="d-none d-lg-inline flex-grow-1 text-start">
                {currentSortOption?.label}
              </span>
              <i
                className="ph-bold ph-caret-down text-neutral-500"
                style={{
                  fontSize: "12px",
                  transform: showSortDropdown ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              ></i>
            </button>

            {/* Sort Order Toggle Button */}
            {sortBy !== "none" && (
              <button
                type="button"
                className="d-flex align-items-center justify-content-center border-0 transition-all rounded-12 bg-primary-600 text-white"
                onClick={toggleSortOrder}
                title={sortOrder === "asc" ? "Artan Sıralama" : "Azalan Sıralama"}
                style={{
                  cursor: "pointer",
                  height: "40px",
                  width: "40px",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "hsl(var(--primary-700))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "hsl(var(--primary-600))";
                }}
              >
                <i
                  className={`ph-bold ${
                  sortOrder === "asc"
                    ? "ph-sort-ascending"
                    : "ph-sort-descending"
                }`}
                style={{ fontSize: "18px" }}
              ></i>
            </button>
          )}

          {/* Reset Sort Button */}
          {sortBy !== "none" && (
            <button
              type="button"
              className="d-flex align-items-center justify-content-center border-0 transition-all rounded-12 bg-neutral-100 text-neutral-700"
              onClick={resetSort}
              title="Sıralamayı Sıfırla"
              style={{
                cursor: "pointer",
                height: "40px",
                width: "40px",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "hsl(var(--neutral-200))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "hsl(var(--neutral-100))";
              }}
            >
              <i className="ph-bold ph-x" style={{ fontSize: "18px" }}></i>
              </button>
            )}
          </div>

          {/* Dropdown Menu - Field Selection */}
          {showSortDropdown && (
            <div
              className="position-absolute bg-white rounded-12 shadow-lg overflow-hidden"
              style={{
                top: "calc(100% + 6px)",
                right: "0",
                minWidth: "240px",
                border: "1.5px solid hsl(var(--neutral-40))",
                zIndex: 9999,
                boxShadow:
                  "0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)",
                padding: "6px",
              }}
            >
              {/* Header */}
              <div
                className="d-flex align-items-center justify-content-between px-10 py-6 mb-2"
                style={{
                  borderBottom: "1px solid hsl(var(--neutral-40))",
                }}
              >
                <span className="fw-semibold text-neutral-700" style={{ fontSize: "10px" }}>
                  Sıralama Kriteri
                </span>
                <span
                  className="px-6 py-2 rounded-6 fw-semibold"
                  style={{
                    fontSize: "10px",
                    backgroundColor:
                      sortOrder === "asc"
                        ? "hsl(var(--success-50))"
                        : "hsl(var(--primary-50))",
                    color:
                      sortOrder === "asc"
                        ? "hsl(var(--success-700))"
                        : "hsl(var(--primary-700))",
                  }}
                >
                  {sortOrder === "asc" ? "↑ Artan" : "↓ Azalan"}
                </span>
              </div>

              {/* Options */}
              {sortOptions.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  className={`d-flex align-items-center justify-content-between w-100 border-0 transition-all rounded-10 ${
                    sortBy === option.value
                      ? "bg-primary-600 text-white"
                      : "bg-transparent text-neutral-700"
                  }`}
                onClick={() => onSortChange(option.value)}
                style={{
                  cursor: "pointer",
                  fontSize: "11px",
                  padding: "8px 10px",
                  marginBottom: index < sortOptions.length - 1 ? "3px" : "0",
                }}
                  onMouseEnter={(e) => {
                    if (sortBy !== option.value) {
                      e.currentTarget.style.backgroundColor =
                        "hsl(var(--neutral-100))";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (sortBy !== option.value) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <div className="d-flex align-items-center gap-8">
                    <div
                      className={`d-flex align-items-center justify-content-center rounded-6`}
                      style={{
                        width: "28px",
                        height: "28px",
                        flexShrink: 0,
                        backgroundColor:
                          sortBy === option.value
                            ? "rgba(255, 255, 255, 0.25)"
                            : "hsl(var(--primary-100))",
                      }}
                    >
                      <i
                        className={`${
                          sortBy === option.value ? "ph-fill" : "ph-duotone"
                        } ${option.icon}`}
                        style={{
                          fontSize: "14px",
                          color:
                            sortBy === option.value
                              ? "#ffffff"
                              : "hsl(var(--primary-700))",
                        }}
                      ></i>
                    </div>
                    <span className="fw-semibold">{option.label}</span>
                  </div>
                  {sortBy === option.value && (
                    <i
                      className="ph-bold ph-check-circle"
                      style={{ fontSize: "15px", opacity: 0.9 }}
                    ></i>
                  )}
                </button>
              ))}

              {/* Info Footer */}
              <div
                className="mt-4 pt-4 px-6"
                style={{
                  borderTop: "1px solid hsl(var(--neutral-40))",
                }}
              >
                <div className="d-flex align-items-start gap-6 bg-primary-50 px-8 py-6 rounded-6">
                  <i
                    className="ph-bold ph-info text-primary-600"
                    style={{ fontSize: "12px", marginTop: "1px" }}
                  ></i>
                  <span className="text-primary-700 lh-sm" style={{ fontSize: "10px" }}>
                    Yönü değiştirmek için <i className="ph-bold ph-sort-ascending"></i> butonunu kullanın
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View Mode Toggle */}
        <span className="text-neutral-600 text-xs fw-medium d-none d-md-inline">
          Görünüm:
        </span>
        <div
          className="soft-card rounded-16 d-flex align-items-center"
          style={{
            padding: "4px",
            gap: "4px",
          }}
          role="group"
          aria-label="Görünüm Modu"
        >
          <button
            type="button"
            className={`d-flex align-items-center justify-content-center border-0 transition-all rounded-12 ${
              viewMode === "grid"
                ? "bg-primary-600 text-white"
                : "bg-transparent text-neutral-600"
            }`}
            onClick={() => setViewMode("grid")}
            title="Grid Görünümü"
            style={{
              minWidth: "40px",
              height: "40px",
              padding: "8px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (viewMode !== "grid") {
                e.currentTarget.style.backgroundColor =
                  "hsl(var(--neutral-100))";
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== "grid") {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <i
              className={`ph ${
                viewMode === "grid" ? "ph-fill" : "ph-duotone"
              } ph-squares-four`}
              style={{ fontSize: "18px" }}
            ></i>
          </button>
          <button
            type="button"
            className={`d-flex align-items-center justify-content-center border-0 transition-all rounded-12 ${
              viewMode === "list"
                ? "bg-primary-600 text-white"
                : "bg-transparent text-neutral-600"
            }`}
            onClick={() => setViewMode("list")}
            title="Liste Görünümü"
            style={{
              minWidth: "40px",
              height: "40px",
              padding: "8px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (viewMode !== "list") {
                e.currentTarget.style.backgroundColor =
                  "hsl(var(--neutral-100))";
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== "list") {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <i
              className={`ph ${
                viewMode === "list" ? "ph-fill" : "ph-duotone"
              } ph-list`}
              style={{ fontSize: "18px" }}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};
