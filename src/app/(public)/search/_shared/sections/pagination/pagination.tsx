"use client";

import React from "react";
import { PaginationProps, PAGE_SIZE_OPTIONS } from "../../types";

/**
 * 📄 PAGINATION COMPONENT
 * Sayfalama bileşeni - API destekli sayfalama için
 * Projedeki custom-card tasarımıyla uyumlu
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  onPageChange,
  onPageSizeChange,
  loading = false,
  pageSizeOptions = PAGE_SIZE_OPTIONS as unknown as number[],
  showPageSizeSelector = true,
  showPageInfo = true,
  compact = false,
  className = "",
}) => {
  // Gösterilecek yeterli veri yoksa render etme
  if (totalElements === 0) {
    return null;
  }

  // Sayfa numaralarını hesapla
  const getVisiblePages = (): number[] => {
    const maxVisible = compact ? 3 : 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const halfVisible = Math.floor(maxVisible / 2);
    let startPage = Math.max(0, currentPage - halfVisible);
    let endPage = Math.min(totalPages - 1, currentPage + halfVisible);

    if (startPage === 0) {
      endPage = Math.min(maxVisible - 1, totalPages - 1);
    }
    if (endPage === totalPages - 1) {
      startPage = Math.max(0, totalPages - maxVisible);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const visiblePages = getVisiblePages();
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage >= totalPages - 1;

  // Mevcut sayfadaki öğe aralığı (1-indexed görüntüleme için)
  const startItem = totalElements > 0 ? currentPage * pageSize + 1 : 0;
  const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

  // Sayfa değişikliği handler'ı
  const handlePageChange = (page: number) => {
    if (loading || page < 0 || page >= totalPages || page === currentPage) {
      return;
    }
    onPageChange(page);
  };

  // Nav buton class'ı
  const getNavBtnClass = (disabled: boolean) =>
    `search-pagination__nav-btn ${disabled ? "disabled" : ""}`;

  // Page buton class'ı
  const getPageBtnClass = (isActive: boolean) =>
    `search-pagination__page-btn ${isActive ? "active" : ""}`;

  return (
    <div
      className={`search-pagination bg-white border border-neutral-30 rounded-12 p-24 mt-24 ${className}`}
    >
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-16">
        {/* Sol: Sayfa boyutu seçici */}
        {showPageSizeSelector && onPageSizeChange && (
          <div className="search-pagination__size-control d-flex align-items-center gap-12">
            <span className="text-neutral-600 text-sm fw-medium">
              Sayfa başına:
            </span>
            <div className="position-relative">
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                disabled={loading}
                className="form-control h-36 w-auto py-0 ps-12 pe-32 text-sm fw-medium appearance-none"
                style={{ cursor: "pointer" }}
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <i
                className="ph ph-caret-down position-absolute text-neutral-500"
                style={{
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>
        )}

        {/* Orta: Sayfa numaraları */}
        <nav
          aria-label="Sayfalama"
          className="search-pagination__nav d-flex align-items-center gap-8"
        >
          {/* İlk sayfa butonu */}
          {!compact && (
            <button
              type="button"
              onClick={() => handlePageChange(0)}
              disabled={isFirstPage || loading}
              className={getNavBtnClass(isFirstPage || loading)}
              aria-label="İlk sayfa"
              title="İlk sayfa"
            >
              <i className="ph ph-caret-double-left" />
            </button>
          )}

          {/* Önceki sayfa butonu */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={isFirstPage || loading}
            className={getNavBtnClass(isFirstPage || loading)}
            aria-label="Önceki sayfa"
            title="Önceki sayfa"
          >
            <i className="ph ph-caret-left" />
          </button>

          {/* Sayfa numaraları */}
          <div className="search-pagination__pages d-flex align-items-center gap-4">
            {/* İlk sayfa göstergesi */}
            {visiblePages[0] > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => handlePageChange(0)}
                  disabled={loading}
                  className={getPageBtnClass(false)}
                >
                  1
                </button>
                {visiblePages[0] > 1 && (
                  <span className="search-pagination__ellipsis">...</span>
                )}
              </>
            )}

            {/* Görünür sayfa numaraları */}
            {visiblePages.map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageChange(pageNum)}
                disabled={loading}
                className={getPageBtnClass(pageNum === currentPage)}
                aria-label={`Sayfa ${pageNum + 1}`}
                aria-current={pageNum === currentPage ? "page" : undefined}
              >
                {pageNum + 1}
              </button>
            ))}

            {/* Son sayfa göstergesi */}
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <>
                {visiblePages[visiblePages.length - 1] < totalPages - 2 && (
                  <span className="search-pagination__ellipsis">...</span>
                )}
                <button
                  type="button"
                  onClick={() => handlePageChange(totalPages - 1)}
                  disabled={loading}
                  className={getPageBtnClass(false)}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Sonraki sayfa butonu */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={isLastPage || loading}
            className={getNavBtnClass(isLastPage || loading)}
            aria-label="Sonraki sayfa"
            title="Sonraki sayfa"
          >
            <i className="ph ph-caret-right" />
          </button>

          {/* Son sayfa butonu */}
          {!compact && (
            <button
              type="button"
              onClick={() => handlePageChange(totalPages - 1)}
              disabled={isLastPage || loading}
              className={getNavBtnClass(isLastPage || loading)}
              aria-label="Son sayfa"
              title="Son sayfa"
            >
              <i className="ph ph-caret-double-right" />
            </button>
          )}
        </nav>

        {/* Sağ: Sayfa bilgisi */}
        {showPageInfo && (
          <div className="search-pagination__info text-neutral-600 text-sm fw-medium">
            <span className="text-neutral-900 fw-semibold">
              {startItem} - {endItem}
            </span>
            <span className="mx-4">/</span>
            <span className="text-neutral-900 fw-semibold">
              {totalElements}
            </span>
            <span className="ms-4">sonuç</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
