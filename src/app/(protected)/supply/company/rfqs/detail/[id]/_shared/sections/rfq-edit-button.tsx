"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";

/**
 * RFQ detay sayfası için minimal düzenle butonu
 */
export const RFQEditButton: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const handleEdit = () => {
    router.push(`/supply/company/rfqs/add-edit/${id}`);
  };

  return (
    <button
      className="rfq-detail-page__edit-button"
      onClick={handleEdit}
      aria-label="Alım ilanını düzenle"
    >
      <i className="ph ph-pencil-simple"></i>
      <span>Düzenle</span>
    </button>
  );
};
