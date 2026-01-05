"use client";

import React from "react";
import { useRFQsContext } from "../../../contexts";

/**
 * 🔲 VIEW MODE TOGGLE
 * Görünüm modu değiştirme bileşeni
 */
export const ViewModeToggle: React.FC = () => {
  const { viewMode, setViewMode } = useRFQsContext();

  return (
    <>
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
              e.currentTarget.style.backgroundColor = "hsl(var(--neutral-100))";
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
              e.currentTarget.style.backgroundColor = "hsl(var(--neutral-100))";
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
    </>
  );
};
