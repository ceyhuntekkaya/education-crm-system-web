import React from "react";
import { QuotationComparisonDtoStatus } from "@/types/supply/quotation";
import { getStatusColor, getStatusLabel } from "../../../utils";

interface QuotationCardHeaderProps {
  status?: QuotationComparisonDtoStatus;
  quotationId?: number;
}

export const QuotationCardHeader: React.FC<QuotationCardHeaderProps> = ({
  status,
  quotationId,
}) => {
  const statusConfig = getStatusColor(status);
  const statusColor = statusConfig.color || "#10b981";

  return (
    <div
      className="position-relative overflow-hidden"
      style={{ height: "140px" }}
    >
      <div
        className="w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
          background: `linear-gradient(135deg, ${statusColor}15 0%, ${statusColor}30 100%)`,
        }}
      >
        <i
          className="ph-duotone ph-file-text"
          style={{
            fontSize: "56px",
            opacity: 0.4,
            color: statusColor,
          }}
        />
      </div>

      {/* Status Badge - Overlay on Image */}
      <div
        className="position-absolute"
        style={{ top: "12px", right: "12px", zIndex: 2 }}
      >
        <span
          className="d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold bg-white"
          style={{
            color: statusColor,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <span
            className="w-4 h-4 rounded-circle"
            style={{ backgroundColor: statusColor }}
          ></span>
          {getStatusLabel(status)}
        </span>
      </div>

      {/* Quotation ID Badge */}
      {quotationId && (
        <div
          className="position-absolute"
          style={{
            top: "12px",
            left: "12px",
            zIndex: 2,
          }}
        >
          <span className="d-inline-flex align-items-center px-10 py-6 rounded-8 text-xs fw-medium bg-white text-neutral-700">
            #{quotationId}
          </span>
        </div>
      )}
    </div>
  );
};
