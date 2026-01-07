"use client";

import React from "react";
import type { QuotationComparisonDto } from "@/types/supply/quotation";
import { useModal } from "@/hooks";
import { getStatusColor } from "../../utils";
import {
  QuotationCardHeader,
  QuotationCardMeta,
  QuotationCardActions,
} from "./sections/index";
import { QuotationCardItemsModal } from "./quotation-card-items-modal";

interface QuotationCardProps {
  quotation: QuotationComparisonDto;
  onAccept?: (quotationId?: number) => void;
}

export const QuotationCard: React.FC<QuotationCardProps> = ({
  quotation,
  onAccept,
}) => {
  const itemsModal = useModal();
  const statusConfig = getStatusColor(quotation.status);
  const statusColor = statusConfig.color || "#10b981";
  const hasItems =
    quotation.items &&
    Array.isArray(quotation.items) &&
    quotation.items.length > 0;

  const handleAccept = (quotationId?: number) => {
    console.log("Teklif kabul edildi:", quotationId);
    onAccept?.(quotationId);
  };

  return (
    <div className="col-4">
      <div
        className="bg-white rounded-16 h-100 overflow-hidden transition-all d-flex flex-column"
        style={{
          boxShadow:
            "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
          border: "1.5px solid hsl(var(--neutral-40))",
          position: "relative",
          zIndex: 1,
          minHeight: "320px",
        }}
      >
        {/* Header */}
        <QuotationCardHeader
          status={quotation.status}
          quotationId={quotation.quotationId}
        />

        {/* Content */}
        <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
          {/* Supplier Name */}
          <div className="mb-12">
            <h5 className="mb-0 fw-semibold line-height-1-3 text-md text-lg-lg text-neutral-900">
              {quotation.supplierCompanyName || "Tedarikçi Adı Yok"}
            </h5>
          </div>

          {/* Meta Container */}
          <QuotationCardMeta
            totalAmount={quotation.totalAmount}
            currency={quotation.currency}
            averageRating={quotation.averageRating}
            deliveryDays={quotation.deliveryDays}
            itemsCount={hasItems ? quotation.items!.length : undefined}
            validUntil={quotation.validUntil}
            statusColor={statusColor}
            onItemsClick={hasItems ? itemsModal.open : undefined}
          />

          {/* Accept Quotation Button */}
          <QuotationCardActions
            quotationId={quotation.quotationId}
            status={quotation.status}
            onAccept={handleAccept}
          />
        </div>
      </div>

      {/* Items Modal */}
      {hasItems && (
        <QuotationCardItemsModal
          isOpen={itemsModal.isOpen}
          onClose={itemsModal.close}
          items={quotation.items!}
          currency={quotation.currency}
          status={quotation.status}
        />
      )}
    </div>
  );
};
