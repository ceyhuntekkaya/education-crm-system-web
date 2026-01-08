"use client";

import React from "react";
import type { RFQInvitationDto } from "@/types";
import {
  getInvitationCardSummary,
  formatInvitationDate,
  getSupplierColor,
} from "../utils";

interface InvitationCardProps {
  invitation: RFQInvitationDto;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  invitation,
}) => {
  const summary = getInvitationCardSummary(invitation);
  const supplierColor = getSupplierColor(summary.supplierCompanyName);

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
          minHeight: "240px",
        }}
      >
        {/* Header */}
        <div
          className="position-relative overflow-hidden"
          style={{ height: "100px" }}
        >
          <div
            className="w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              background: `linear-gradient(135deg, ${supplierColor}15 0%, ${supplierColor}30 100%)`,
            }}
          >
            <i
              className="ph-duotone ph-buildings"
              style={{
                fontSize: "48px",
                opacity: 0.4,
                color: supplierColor,
              }}
            ></i>
          </div>

          {/* Supplier ID Badge */}
          {summary.supplierId && (
            <div
              className="position-absolute"
              style={{
                top: "12px",
                right: "12px",
                zIndex: 2,
              }}
            >
              <span
                className="d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold bg-white"
                style={{
                  color: supplierColor,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
              >
                <i
                  className="ph-bold ph-identification-badge"
                  style={{ fontSize: "12px" }}
                ></i>
                Tedarikçi #{summary.supplierId}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
          {/* Supplier Name */}
          <h3
            className="mb-8 fw-bold"
            style={{
              fontSize: "1.125rem",
              lineHeight: "1.4",
              color: "hsl(var(--neutral-900))",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "2.8rem",
            }}
            title={summary.supplierCompanyName}
          >
            {summary.supplierCompanyName}
          </h3>

          {/* RFQ Title */}
          <div className="mb-12 d-flex align-items-center justify-content-between gap-12">
            <div className="d-flex align-items-center gap-8 flex-shrink-0">
              <i
                className="ph-bold ph-file-text"
                style={{ fontSize: "16px", color: "hsl(var(--neutral-500))" }}
              ></i>
              <span
                className="text-neutral-500 fw-medium"
                style={{ fontSize: "0.75rem" }}
              >
                RFQ Başlığı
              </span>
            </div>
            <span
              className="text-neutral-700 fw-medium text-end"
              style={{
                fontSize: "0.875rem",
                lineHeight: "1.5",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={summary.rfqTitle}
            >
              {summary.rfqTitle}
            </span>
          </div>

          {/* Invited Date */}
          <div className="mt-auto pt-12 border-top">
            <div className="d-flex flex-column gap-6">
              <div className="d-flex align-items-center gap-8">
                <i
                  className="ph-bold ph-calendar"
                  style={{ fontSize: "16px", color: supplierColor }}
                ></i>
                <span
                  className="text-neutral-600 fw-medium"
                  style={{ fontSize: "0.75rem" }}
                >
                  Davet Tarihi
                </span>
              </div>
              <span
                className="fw-semibold text-neutral-900"
                style={{ fontSize: "0.875rem" }}
              >
                {formatInvitationDate(summary.invitedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
