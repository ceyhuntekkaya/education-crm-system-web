"use client";

import React from "react";
import { useWishlistContext } from "../../../contexts";

/**
 * 🎬 HEADER ACTIONS
 * Normal mod: Toplu Alım İlanı Oluştur butonu
 * Seçim modu: Tümünü Seç, Seçimi Temizle, İptal, Toplu Alım İlanı Oluştur butonları
 */
export const HeaderActions: React.FC = () => {
  const {
    totalCount,
    isSelectionMode,
    selectedCount,
    enableSelectionMode,
    disableSelectionMode,
    openRFQModal,
    isCreateLoadingRFQ,
    selectAll,
    clearSelection,
  } = useWishlistContext();

  if (!isSelectionMode) {
    return (
      <div className="d-flex align-items-center gap-8">
        <button
          className="d-flex align-items-center gap-8 transition-all rounded-12 bg-success-600 text-white fw-semibold border-0"
          style={{
            fontSize: "13px",
            height: "40px",
            padding: "0 16px",
            boxShadow: "0 2px 8px rgba(16, 185, 129, 0.25)",
            cursor: totalCount === 0 ? "not-allowed" : "pointer",
            opacity: totalCount === 0 ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            if (totalCount > 0) {
              e.currentTarget.style.backgroundColor = "hsl(var(--success-700))";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(16, 185, 129, 0.3)";
            }
          }}
          onMouseLeave={(e) => {
            if (totalCount > 0) {
              e.currentTarget.style.backgroundColor = "hsl(var(--success-600))";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(16, 185, 129, 0.25)";
            }
          }}
          onClick={enableSelectionMode}
          disabled={totalCount === 0}
          aria-label="Toplu Alım İlanı Oluştur"
        >
          <i className="ph-bold ph-file-text" style={{ fontSize: "18px" }} />
          <span className="d-none d-lg-inline">Toplu Alım İlanı Oluştur</span>
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center gap-6 flex-wrap">
      {/* Compact Action Buttons */}
      <button
        className="d-flex align-items-center gap-6 transition-all rounded-12 bg-white text-neutral-700 fw-medium border-0"
        style={{
          fontSize: "12px",
          height: "36px",
          padding: "0 12px",
          border: "1px solid hsl(var(--neutral-200))",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          cursor: isCreateLoadingRFQ ? "not-allowed" : "pointer",
          opacity: isCreateLoadingRFQ ? 0.6 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isCreateLoadingRFQ) {
            e.currentTarget.style.backgroundColor = "hsl(var(--neutral-50))";
            e.currentTarget.style.borderColor = "hsl(var(--neutral-300))";
          }
        }}
        onMouseLeave={(e) => {
          if (!isCreateLoadingRFQ) {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.borderColor = "hsl(var(--neutral-200))";
          }
        }}
        onClick={selectAll}
        disabled={isCreateLoadingRFQ}
        aria-label="Tümünü Seç"
      >
        <i className="ph-bold ph-check-square" style={{ fontSize: "16px" }} />
        <span className="d-none d-sm-inline">Tümünü Seç</span>
      </button>

      <button
        className="d-flex align-items-center gap-6 transition-all rounded-12 bg-white text-neutral-700 fw-medium border-0"
        style={{
          fontSize: "12px",
          height: "36px",
          padding: "0 12px",
          border: "1px solid hsl(var(--neutral-200))",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          cursor:
            selectedCount === 0 || isCreateLoadingRFQ
              ? "not-allowed"
              : "pointer",
          opacity: selectedCount === 0 || isCreateLoadingRFQ ? 0.6 : 1,
        }}
        onMouseEnter={(e) => {
          if (selectedCount > 0 && !isCreateLoadingRFQ) {
            e.currentTarget.style.backgroundColor = "hsl(var(--neutral-50))";
            e.currentTarget.style.borderColor = "hsl(var(--neutral-300))";
          }
        }}
        onMouseLeave={(e) => {
          if (selectedCount > 0 && !isCreateLoadingRFQ) {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.borderColor = "hsl(var(--neutral-200))";
          }
        }}
        onClick={clearSelection}
        disabled={selectedCount === 0 || isCreateLoadingRFQ}
        aria-label="Seçimi Temizle"
      >
        <i className="ph-bold ph-x-square" style={{ fontSize: "16px" }} />
        <span className="d-none d-sm-inline">Temizle</span>
      </button>

      <button
        className="d-flex align-items-center gap-6 transition-all rounded-12 bg-danger-600 text-white fw-semibold border-0"
        style={{
          fontSize: "12px",
          height: "36px",
          padding: "0 12px",
          boxShadow: "0 2px 8px rgba(239, 68, 68, 0.25)",
          cursor: isCreateLoadingRFQ ? "not-allowed" : "pointer",
          opacity: isCreateLoadingRFQ ? 0.6 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isCreateLoadingRFQ) {
            e.currentTarget.style.backgroundColor = "hsl(var(--danger-700))";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 4px 12px rgba(239, 68, 68, 0.3)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isCreateLoadingRFQ) {
            e.currentTarget.style.backgroundColor = "hsl(var(--danger-600))";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 2px 8px rgba(239, 68, 68, 0.25)";
          }
        }}
        onClick={disableSelectionMode}
        disabled={isCreateLoadingRFQ}
        aria-label="İptal"
      >
        <i className="ph-bold ph-x" style={{ fontSize: "16px" }} />
        <span className="d-none d-md-inline">İptal</span>
      </button>

      <button
        className="d-flex align-items-center gap-6 transition-all rounded-12 bg-success-600 text-white fw-semibold border-0"
        style={{
          fontSize: "12px",
          height: "36px",
          padding: "0 12px",
          boxShadow: "0 2px 8px rgba(16, 185, 129, 0.25)",
          cursor:
            selectedCount === 0 || isCreateLoadingRFQ
              ? "not-allowed"
              : "pointer",
          opacity: selectedCount === 0 || isCreateLoadingRFQ ? 0.6 : 1,
        }}
        onMouseEnter={(e) => {
          if (selectedCount > 0 && !isCreateLoadingRFQ) {
            e.currentTarget.style.backgroundColor = "hsl(var(--success-700))";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 4px 12px rgba(16, 185, 129, 0.3)";
          }
        }}
        onMouseLeave={(e) => {
          if (selectedCount > 0 && !isCreateLoadingRFQ) {
            e.currentTarget.style.backgroundColor = "hsl(var(--success-600))";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 2px 8px rgba(16, 185, 129, 0.25)";
          }
        }}
        onClick={openRFQModal}
        disabled={selectedCount === 0 || isCreateLoadingRFQ}
        aria-label="Toplu Alım İlanı Oluştur"
      >
        {isCreateLoadingRFQ ? (
          <>
            <i
              className="ph-bold ph-circle-notch rotating"
              style={{ fontSize: "16px" }}
            />
            <span className="d-none d-md-inline">Oluşturuluyor...</span>
          </>
        ) : (
          <>
            <i className="ph-bold ph-check" style={{ fontSize: "16px" }} />
            <span className="d-none d-md-inline">
              İlan Oluştur ({selectedCount})
            </span>
          </>
        )}
      </button>
    </div>
  );
};
