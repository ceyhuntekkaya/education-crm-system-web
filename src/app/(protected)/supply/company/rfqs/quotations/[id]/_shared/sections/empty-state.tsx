"use client";

import React from "react";
import { useRFQQuotationsContext } from "../contexts";

export const EmptyState: React.FC = () => {
  const { searchQuery } = useRFQQuotationsContext();

  // Arama aktif mi kontrol et
  const hasActiveSearch = searchQuery.trim().length > 0;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-48">
      <div
        className="d-flex align-items-center justify-content-center bg-neutral-100 rounded-circle mb-16"
        style={{ width: "80px", height: "80px" }}
      >
        <i
          className="ph-duotone ph-receipt text-neutral-400"
          style={{ fontSize: "40px" }}
        />
      </div>
      {hasActiveSearch ? (
        <>
          <h5 className="mb-8 text-neutral-900">Sonuç Bulunamadı</h5>
          <p className="text-neutral-600 text-center mb-0">
            Aradığınız kriterlere uygun teklif bulunamadı.
            <br />
            Lütfen arama teriminizi değiştirin.
          </p>
        </>
      ) : (
        <>
          <h5 className="mb-8 text-neutral-900">Henüz Teklif Yok</h5>
          <p className="text-neutral-600 text-center mb-0">
            Bu alım ilanı için henüz teklif gelmemiş.
            <br />
            Tedarikçiler teklif gönderdiğinde burada görünecektir.
          </p>
        </>
      )}
    </div>
  );
};
