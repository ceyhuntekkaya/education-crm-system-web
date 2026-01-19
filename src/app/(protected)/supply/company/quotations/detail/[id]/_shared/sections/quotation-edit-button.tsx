"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";

/**
 * Teklif detay sayfası için minimal düzenle butonu
 * QuotationBackButton ile eşdeğer tasarım
 */
export const QuotationEditButton: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const handleEdit = () => {
    router.push(`/supply/company/quotations/add-edit/${id}`);
  };

  return (
    <button
      className="quotation-detail-page__edit-button"
      onClick={handleEdit}
      aria-label="Teklifi düzenle"
    >
      <i className="ph ph-pencil-simple"></i>
      <span>Düzenle</span>
    </button>
  );
};
