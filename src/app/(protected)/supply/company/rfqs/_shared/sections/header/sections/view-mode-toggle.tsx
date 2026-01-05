"use client";

import React from "react";
import { useRFQsContext } from "../../../contexts";
import { ToggleButton } from "../components";

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
        style={{ padding: "4px", gap: "4px" }}
        role="group"
        aria-label="Görünüm Modu"
      >
        <ToggleButton
          icon="ph-squares-four"
          isActive={viewMode === "grid"}
          onClick={() => setViewMode("grid")}
          title="Grid Görünümü"
        />
        <ToggleButton
          icon="ph-list"
          isActive={viewMode === "list"}
          onClick={() => setViewMode("list")}
          title="Liste Görünümü"
        />
      </div>
    </>
  );
};
