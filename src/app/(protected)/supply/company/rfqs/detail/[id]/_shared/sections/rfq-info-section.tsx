"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils";
import { Badge } from "@/components";
import { useRFQDetail } from "../context";
import {
  isRFQExpired,
  calculateDaysUntilDeadline,
  isRFQDeadlineApproaching,
  getRFQStatusConfig,
  getDeadlineColorClass,
  getDeadlineIconBoxColor,
  getRFQStatusBadgeVariant,
  getRFQTypeDisplay,
  getRFQTypeBadgeVariant,
} from "../../../../_shared/utils";
import { RFQActionButtons } from "./rfq-action-buttons";

export const RFQInfoSection: React.FC = () => {
  const { rfq } = useRFQDetail();
  const router = useRouter();

  if (!rfq) return null;

  const isExpired = isRFQExpired(rfq.submissionDeadline);
  const daysUntilDeadline = calculateDaysUntilDeadline(rfq.submissionDeadline);
  const isApproaching = isRFQDeadlineApproaching(rfq.submissionDeadline);
  const statusConfig = getRFQStatusConfig(rfq.status);

  const handleItemsClick = () => {
    router.push(`/supply/company/rfqs/items/${rfq.id}`);
  };

  const handleQuotationsClick = () => {
    router.push(`/supply/company/rfqs/quotations/${rfq.id}`);
  };

  return (
    <div className="rfq-detail-page__info-section">
      {/* Başlık ve Durum */}
      <div className="rfq-detail-page__title-section">
        <div
          className="rfq-detail-page__badges"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {/* <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
              <i className="ph-bold ph-hash text-xs"></i>#{rfq.id || "N/A"}
            </span> */}
            <Badge variant={getRFQTypeBadgeVariant(rfq.rfqType)} size="sm">
              {getRFQTypeDisplay(rfq.rfqType)}
            </Badge>
            <Badge variant={getRFQStatusBadgeVariant(rfq.status)} size="sm">
              {statusConfig.text}
            </Badge>
          </div>
          <div className="d-flex gap-8">
            <RFQActionButtons />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <h1 className="rfq-detail-page__title mb-0">
            {rfq.title || "Alım İlanı Başlığı"}
          </h1>
        </div>
      </div>

      {/* Meta Container - İstatistikler */}
      <div className="meta-container soft-card rounded-16">
        {/* Kalem Sayısı */}
        <div
          className="meta-item"
          onClick={handleItemsClick}
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleItemsClick();
            }
          }}
        >
          <div className="meta-icon-wrapper">
            <div className="meta-icon bg-primary-100 text-primary-700">
              <i className="ph-bold ph-package"></i>
            </div>
          </div>
          <div className="meta-content">
            <p className="meta-label">Kalem Sayısı</p>
            <span className="meta-value">{rfq.itemCount || 0}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="meta-item-divider"></div>

        {/* Teklif Sayısı */}
        <div
          className="meta-item"
          onClick={handleQuotationsClick}
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleQuotationsClick();
            }
          }}
        >
          <div className="meta-icon-wrapper">
            <div className="meta-icon bg-success-100 text-success-700">
              <i className="ph-bold ph-file-text"></i>
            </div>
          </div>
          <div className="meta-content">
            <p className="meta-label">Teklif Sayısı</p>
            <span className="meta-value">{rfq.quotationCount || 0}</span>
          </div>
        </div>

        {/* Davet Sayısı (sadece INVITED tipinde) - Tıklanabilir */}
        {rfq.rfqType === "INVITED" && (
          <>
            <div className="meta-item-divider"></div>
            <div
              className="meta-item"
              onClick={() => {
                if (rfq.invitationCount && rfq.invitationCount > 0) {
                  router.push(
                    `/supply/company/rfqs/invited-suppliers/${rfq.id}`,
                  );
                }
              }}
              style={{
                cursor:
                  rfq.invitationCount && rfq.invitationCount > 0
                    ? "pointer"
                    : "default",
                transition: "all 0.2s ease",
                borderRadius: "8px",
                padding: "4px",
                margin: "-4px",
              }}
              onMouseEnter={(e) => {
                if (rfq.invitationCount && rfq.invitationCount > 0) {
                  e.currentTarget.style.backgroundColor = "hsl(var(--info-50))";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-info-100 text-info-700">
                  <i className="ph-bold ph-users"></i>
                </div>
              </div>
              <div className="meta-content">
                <p className="meta-label">Davet Sayısı</p>
                <div className="d-flex align-items-center gap-2">
                  <span className="meta-value">{rfq.invitationCount || 0}</span>
                  {/* {rfq.invitationCount && rfq.invitationCount > 0 && (
                    <i
                      className="ph-bold ph-arrow-right"
                      style={{
                        fontSize: "14px",
                        color: "hsl(var(--info-700))",
                      }}
                    ></i>
                  )} */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Son Başvuru Tarihi */}
      {rfq.submissionDeadline && (
        <div className="soft-card rounded-16">
          <div className="d-flex align-items-center gap-12 p-12">
            <div
              className={`status-icon ${getDeadlineIconBoxColor(
                rfq.submissionDeadline,
              )}`}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                flexShrink: 0,
              }}
            >
              <i className="ph-bold ph-calendar-check"></i>
            </div>
            <div className="status-info flex-grow-1">
              <p className="meta-label mb-1">Son Başvuru Tarihi</p>
              <span
                className={`fw-bold ${getDeadlineColorClass(
                  rfq.submissionDeadline,
                )} status-value`}
                style={{ fontSize: "1rem" }}
              >
                {formatDate(rfq.submissionDeadline)}
              </span>
              <span
                className="text-neutral-600 status-text"
                style={{ fontSize: "0.75rem", marginLeft: "6px" }}
              >
                {isExpired
                  ? "Süresi Doldu"
                  : isApproaching
                    ? `${daysUntilDeadline} gün kaldı`
                    : "Aktif"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Beklenen Teslimat Tarihi */}
      {rfq.expectedDeliveryDate && (
        <div className="soft-card rounded-16">
          <div className="d-flex align-items-center gap-12 p-12">
            <div
              className="status-icon bg-success-100 text-success-700"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                flexShrink: 0,
              }}
            >
              <i className="ph-bold ph-truck"></i>
            </div>
            <div className="status-info flex-grow-1">
              <p className="meta-label mb-1">Beklenen Teslimat</p>
              <span
                className="fw-bold text-neutral-900 status-value"
                style={{ fontSize: "1rem" }}
              >
                {formatDate(rfq.expectedDeliveryDate)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
