"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useRFQDetail } from "../context";

/**
 * Davet edilen tedarikçiler butonu
 * Yalnızca INVITED tipindeki RFQ'larda görünür
 */
export const RFQInvitedSuppliersButton: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { rfq } = useRFQDetail();

  // Sadece INVITED tipindeki RFQ'larda görünür
  if (rfq?.rfqType !== "INVITED") {
    return null;
  }

  const handleClick = () => {
    // Route şimdilik boş, ileride eklenecek
    router.push(`/supply/company/rfqs/invited-suppliers/${id}`);
  };

  return (
    <button
      className="rfq-detail-page__edit-button"
      onClick={handleClick}
      aria-label="Davet edilen tedarikçiler"
    >
      <i className="ph ph-users"></i>
      <span>Davet Edilen Tedarikçiler</span>
    </button>
  );
};
