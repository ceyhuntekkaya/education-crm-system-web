"use client";

import React from "react";
import { useWishlistContext } from "../contexts";
import { Button } from "@/components/ui";

export const Header: React.FC = () => {
  const {
    totalCount,
    viewMode,
    setViewMode,
    isSelectionMode,
    selectedCount,
    enableSelectionMode,
    disableSelectionMode,
    submitToProposal,
    isSubmitting,
    selectAll,
    clearSelection,
  } = useWishlistContext();

  return (
    <div
      className="bg-white rounded-16 mb-24 d-flex flex-column gap-16 overflow-hidden transition-all"
      style={{
        border: "1.5px solid hsl(var(--neutral-40))",
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        padding: "16px",
      }}
    >
      {/* Main Header Row */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-12">
        {/* Left Side - Info */}
        <div className="d-flex align-items-center gap-12 flex-grow-1">
          <div
            className="d-flex align-items-center justify-content-center rounded-8 bg-danger-100 text-danger-700 flex-shrink-0"
            style={{
              width: "48px",
              height: "48px",
              transition: "all 0.2s ease",
            }}
          >
            <i className="ph-fill ph-heart" style={{ fontSize: "24px" }}></i>
          </div>
          <div className="flex-grow-1 min-w-0">
            <h5 className="mb-4 fw-semibold text-neutral-900">
              Favori Ürünlerim
            </h5>
            <div className="d-flex align-items-center gap-8 flex-wrap">
              <span className="text-neutral-600 text-xs fw-medium">Toplam</span>
              <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
                <i className="ph-fill ph-heart text-xs"></i>
                {totalCount} favori ürün
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="d-flex align-items-center gap-12 flex-shrink-0 flex-wrap">
          {!isSelectionMode ? (
            <>
              {/* View Toggle */}
              <div className="d-flex align-items-center gap-8">
                <span className="text-neutral-600 text-xs fw-medium d-none d-md-inline">
                  Görünüm:
                </span>
                <div
                  className="soft-card rounded-16 d-flex align-items-center overflow-hidden"
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
                      } ph-rows`}
                      style={{ fontSize: "18px" }}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Add to RFQ Button */}
              <Button
                variant="success"
                size="sm"
                leftIcon="ph-bold ph-file-text"
                onClick={enableSelectionMode}
                disabled={totalCount === 0}
              >
                RFQ Oluştur
              </Button>
            </>
          ) : (
            <>
              {/* Selection Mode Actions */}
              <div className="d-flex align-items-center gap-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAll}
                  disabled={isSubmitting}
                >
                  Tümünü Seç
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSelection}
                  disabled={selectedCount === 0 || isSubmitting}
                >
                  Seçimi Temizle
                </Button>
              </div>

              <Button
                variant="error"
                size="sm"
                leftIcon="ph-bold ph-x"
                onClick={disableSelectionMode}
                disabled={isSubmitting}
              >
                İptal
              </Button>

              <Button
                variant="success"
                size="sm"
                leftIcon="ph-bold ph-check"
                onClick={submitToProposal}
                disabled={selectedCount === 0 || isSubmitting}
                loading={isSubmitting}
              >
                RFQ Oluştur ({selectedCount})
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Selection Mode Info Bar */}
      {isSelectionMode && (
        <div
          className="d-flex align-items-center justify-content-between p-12 rounded-12"
          style={{
            backgroundColor: "hsl(var(--primary-50))",
            border: "1px solid hsl(var(--primary-200))",
          }}
        >
          <div className="d-flex align-items-center gap-8">
            <i
              className="ph-fill ph-info text-primary-600"
              style={{ fontSize: "20px" }}
            ></i>
            <span className="text-sm fw-medium text-primary-700">
              Seçim modu aktif - RFQ için ürün seçin
            </span>
          </div>
          <div className="d-flex align-items-center gap-8">
            <span className="text-xs text-primary-600">Seçilen:</span>
            <span className="d-inline-flex align-items-center gap-6 text-xs text-white bg-primary-600 px-10 py-6 rounded-8 fw-semibold">
              {selectedCount} / {totalCount}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
