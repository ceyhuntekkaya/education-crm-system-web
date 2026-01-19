"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSnackbar } from "@/contexts";
import { useRFQDetail } from "../context";

/**
 * RFQ detay sayfası için minimal düzenle butonu
 * Yalnızca DRAFT durumundaki RFQ'lar düzenlenebilir
 */
export const RFQEditButton: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { showSnackbar } = useSnackbar();
  const { rfq } = useRFQDetail();

  const handleEdit = () => {
    // Sadece DRAFT durumundaki RFQ'lar düzenlenebilir
    if (rfq?.status !== "DRAFT") {
      showSnackbar(
        "Yalnızca taslak durumundaki alım ilanları düzenlenebilir.",
        "warning"
      );
      return;
    }

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
