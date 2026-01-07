"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";

/**
 * RFQ detay sayfası için ihtiyaç listesi ve gelen teklifler butonları
 */
export const RFQItemsButton: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const handleViewItems = () => {
    router.push(`/supply/company/rfqs/items/${id}`);
  };

  const handleViewQuotations = () => {
    router.push(`/supply/company/rfqs/quotations/${id}`);
  };

  return (
    <>
      <button
        className="rfq-detail-page__items-button"
        onClick={handleViewItems}
        aria-label="İhtiyaç listesini görüntüle"
      >
        <i className="ph ph-list-bullets"></i>
        <span>İhtiyaç Listesi</span>
      </button>
      <button
        className="rfq-detail-page__items-button"
        onClick={handleViewQuotations}
        aria-label="Gelen teklifleri görüntüle"
      >
        <i className="ph ph-file-text"></i>
        <span>Gelen Teklifler</span>
      </button>
    </>
  );
};
