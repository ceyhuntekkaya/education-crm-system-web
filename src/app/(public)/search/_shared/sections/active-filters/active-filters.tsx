"use client";

import React from "react";
import { Button } from "@/components";
import { SearchResultsInfo, GroupedFiltersContainer } from "./components";
import { useActiveFilters } from "./hooks";

const ActiveFilters: React.FC = () => {
  const { totalActiveFilters, resultCount, hasActiveFilters, resetForm } =
    useActiveFilters();

  // Aktif filter yoksa sadece sonuç sayısını göster
  if (!hasActiveFilters) {
    return <SearchResultsInfo />;
  }

  return (
    <div className="active-filters bg-white rounded-12 p-20 mb-24 box-shadow-sm border border-neutral-30">
      <div className="d-flex flex-between align-items-center mb-16">
        <div className="d-flex align-items-center gap-12">
          <div className="filter-icon-wrapper bg-warning-50 rounded-circle p-8 d-flex align-items-center justify-content-center">
            <i className="ph ph-funnel text-warning-600 text-xl"></i>
          </div>
          <div>
            <h6 className="mb-4 text-neutral-800 font-weight-600">
              Aktif Filtreler ({totalActiveFilters})
            </h6>
            <div className="d-flex align-items-center gap-8">
              <span className="text-neutral-600 text-sm">
                <strong className="text-primary-600">{resultCount}</strong> okul
                bulundu
              </span>
              <span className="text-neutral-300">•</span>
              <span className="result-badge bg-info-50 text-info-600 px-8 py-2 rounded-6 text-xs font-weight-500">
                <i className="ph ph-check-circle me-4"></i>
                Filtrelenmiş
              </span>
            </div>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="xxs"
          leftIcon="ph-trash"
          onClick={resetForm}
          className="text-neutral-500 hover-text-danger-600"
        >
          Temizle
        </Button>
      </div>

      <GroupedFiltersContainer />
    </div>
  );
};

export default ActiveFilters;
