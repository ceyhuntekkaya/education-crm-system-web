import React from "react";
import { useActiveFilters } from "../hooks";

const SearchResultsInfo: React.FC = () => {
  const { resultCount } = useActiveFilters();

  return (
    <div className="search-results-info bg-white rounded-12 p-20 mb-24 box-shadow-sm border border-neutral-30">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-12">
          <div className="search-icon-wrapper bg-primary-50 rounded-circle p-8 d-flex align-items-center justify-content-center">
            <i className="ph ph-buildings text-primary-600 text-xl"></i>
          </div>
          <div>
            <h6 className="mb-4 text-neutral-800 font-weight-600">
              Arama Sonuçları
            </h6>
            <p className="mb-0 text-neutral-600 text-sm">
              <strong className="text-primary-600">{resultCount}</strong> Kurum
              bulundu
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center gap-8">
          <div className="result-badge bg-success-50 text-success-600 px-12 py-6 rounded-8 text-xs font-weight-500">
            <i className="ph ph-check-circle me-4"></i>
            Aktif
          </div>
          <div className="text-neutral-400 text-xs">
            <i className="ph ph-clock me-4"></i>
            Güncel
          </div>
        </div>
      </div>

      {resultCount > 0 && (
        <div className="mt-16 pt-16 border-top border-neutral-100">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-16 text-xs text-neutral-500">
              <span className="d-flex align-items-center gap-4">
                <i className="ph ph-funnel"></i>
                Filtre yok
              </span>
              <span className="d-flex align-items-center gap-4">
                <i className="ph ph-list"></i>
                Tüm sonuçlar
              </span>
            </div>
            <div className="text-xs text-neutral-400">
              {resultCount > 1 ? "Birden fazla seçenek mevcut" : "Tek sonuç"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsInfo;
