import React from "react";
import { QuotationComparisonDtoStatus } from "@/types/supply/quotation";
import { canAcceptQuotation } from "../../../utils";

interface QuotationCardActionsProps {
  quotationId?: number;
  status?: QuotationComparisonDtoStatus;
  onAccept?: (quotationId?: number) => void;
}

export const QuotationCardActions: React.FC<QuotationCardActionsProps> = ({
  quotationId,
  status,
  onAccept,
}) => {
  const isAcceptable = canAcceptQuotation(status);

  const handleAccept = () => {
    if (isAcceptable && onAccept) {
      onAccept(quotationId);
    }
  };

  return (
    <div className="mt-16">
      <button
        className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-8 py-12"
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          borderRadius: "12px",
          opacity: !isAcceptable ? 0.5 : 1,
          cursor: !isAcceptable ? "not-allowed" : "pointer",
          pointerEvents: !isAcceptable ? "none" : "auto",
        }}
        disabled={!isAcceptable}
        onClick={handleAccept}
      >
        <i className="ph-bold ph-check-circle" style={{ fontSize: "18px" }} />
        <span>Teklifi Kabul Et</span>
      </button>
    </div>
  );
};
