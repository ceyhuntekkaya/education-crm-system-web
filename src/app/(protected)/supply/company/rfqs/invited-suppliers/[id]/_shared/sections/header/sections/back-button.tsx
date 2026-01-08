"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useRFQInvitationsContext } from "../../../contexts";

/**
 * ⬅️ BACK BUTTON COMPONENT
 * RFQ detay sayfasına geri dönüş butonu
 */
export const BackButton: React.FC = () => {
  const router = useRouter();
  const { rfqId } = useRFQInvitationsContext();

  const handleBack = () => {
    router.push(`/supply/company/rfqs/detail/${rfqId}`);
  };

  return (
    <button
      onClick={handleBack}
      className="d-flex align-items-center gap-8 px-16 py-10 rounded-12 transition-all"
      style={{
        background: "hsl(var(--neutral-50))",
        border: "1px solid hsl(var(--neutral-200))",
        color: "hsl(var(--neutral-700))",
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "hsl(var(--neutral-100))";
        e.currentTarget.style.borderColor = "hsl(var(--neutral-300))";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "hsl(var(--neutral-50))";
        e.currentTarget.style.borderColor = "hsl(var(--neutral-200))";
      }}
    >
      <i className="ph-bold ph-arrow-left" style={{ fontSize: "16px" }} />
      <span>Geri Dön</span>
    </button>
  );
};
