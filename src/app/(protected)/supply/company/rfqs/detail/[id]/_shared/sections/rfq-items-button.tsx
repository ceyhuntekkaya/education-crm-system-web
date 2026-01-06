"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";

/**
 * RFQ detay sayfası için ihtiyaç listesi butonu
 * İhtiyaç listesini görüntülemek için items sayfasına yönlendirir
 */
export const RFQItemsButton: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const handleViewItems = () => {
    router.push(`/supply/company/rfqs/items/${id}`);
  };

  return (
    <button
      className="rfq-detail-page__items-button"
      onClick={handleViewItems}
      aria-label="İhtiyaç listesini görüntüle"
    >
      <i className="ph ph-list-bullets"></i>
      <span>İhtiyaç Listesi</span>
    </button>
  );
};
