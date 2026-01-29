"use client";

import React from "react";
import {
  LeftInfo,
  SearchInput,
  ViewModeToggle,
  SortDropdown,
  StatusFilter,
  DateFilter,
} from "./sections";
import { ResetFiltersButton } from "./components/reset-filters-button";
import { useRFQQuotationsContext } from "../../contexts";
import { Divider } from "@/components";

/**
 * 📋 HEADER COMPONENT
 * Gelen teklifler header - info, arama, filtreleme, sıralama ve görünüm kontrolü
 */
export const Header: React.FC = () => {
  const { activeFilterCount, filterHandlers } = useRFQQuotationsContext();

  return (
    <div
      className="bg-white rounded-16 mb-24 transition-all"
      style={{
        border: "1.5px solid hsl(var(--neutral-40))",
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        padding: "16px",
      }}
    >
      {/* Row 1: Başlık Bilgisi */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-16 mb-16">
        <LeftInfo />
      </div>

      {/* Divider */}
      <Divider size="xs" />

      {/* Row 2: Arama, Filtreler, Sıralama, Görünüm */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-8">
        {/* Left: Arama & Filtreler */}
        <div className="d-flex align-items-center gap-6 flex-wrap">
          <SearchInput />
          <StatusFilter />
          <DateFilter />
          <ResetFiltersButton
            activeCount={activeFilterCount}
            onReset={filterHandlers.resetFilters}
          />
        </div>

        {/* Right: Sıralama & Görünüm */}
        <div className="d-flex align-items-center gap-6 flex-wrap">
          <SortDropdown />
          <ViewModeToggle />
        </div>
      </div>
    </div>
  );
};
