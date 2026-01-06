"use client";

import React from "react";
import { useRFQItemsContext } from "../contexts";

export const EmptyState: React.FC = () => {
  const { activeFilterCount, sortBy } = useRFQItemsContext();

  // Filtreleme veya sıralama aktif mi kontrol et
  const hasActiveFiltersOrSort = activeFilterCount > 0 || sortBy !== "none";

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-48">
      <div
        className="d-flex align-items-center justify-content-center bg-neutral-100 rounded-circle mb-16"
        style={{ width: "80px", height: "80px" }}
      >
        <i
          className="ph-duotone ph-package text-neutral-400"
          style={{ fontSize: "40px" }}
        ></i>
      </div>
      {hasActiveFiltersOrSort ? (
        <>
          <h5 className="mb-8 text-neutral-900">Sonuç Bulunamadı</h5>
          <p className="text-neutral-600 text-center mb-0">
            Aradığınız kriterlere uygun kalem bulunamadı.
            <br />
            Lütfen filtreleme veya sıralama seçeneklerinizi değiştirin.
          </p>
        </>
      ) : (
        <>
          <h5 className="mb-8 text-neutral-900">Henüz Kalem Yok</h5>
          <p className="text-neutral-600 text-center mb-0">
            Bu teklif talebinde henüz kalem bulunmamaktadır.
          </p>
        </>
      )}
    </div>
  );
};
