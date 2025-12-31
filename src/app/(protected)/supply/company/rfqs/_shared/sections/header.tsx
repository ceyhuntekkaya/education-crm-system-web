"use client";

import React from "react";
import { useQuotationsContext } from "../contexts";

export const Header: React.FC = () => {
  const { quotations, viewMode, setViewMode, totalElements } =
    useQuotationsContext();

  return (
    <div
      className="bg-white rounded-16 mb-24 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center overflow-hidden transition-all"
      style={{
        border: "1.5px solid hsl(var(--neutral-40))",
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        padding: "16px",
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

      {/* Right Side - View Toggle */}
      <div className="d-flex align-items-center gap-12 flex-shrink-0">
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
              } ph-list`}
              style={{ fontSize: "18px" }}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};
