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
        <div className="rfq-detail-page__badges">
          <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
            <i className="ph-bold ph-hash text-xs"></i>#{rfq.id || "N/A"}
          </span>
          <Badge variant={getRFQTypeBadgeVariant(rfq.rfqType)} size="sm">
            {getRFQTypeDisplay(rfq.rfqType)}
          </Badge>
          <Badge variant={getRFQStatusBadgeVariant(rfq.status)} size="sm">
            {statusConfig.text}
          </Badge>
        </div>
        <h1 className="rfq-detail-page__title mb-0">
          {rfq.title || "Alım İlanı Başlığı"}
        </h1>
      </div>

      {/* Şirket Bilgisi */}
      {rfq.companyName && (
        <div className="soft-card rounded-16">
          <div className="d-flex align-items-center gap-12 p-12">
            <div
              className="status-icon bg-primary-100 text-primary-700"
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
              <i className="ph-bold ph-buildings"></i>
            </div>
            <div className="status-info flex-grow-1">
              <span
                className="fw-bold text-neutral-900 status-value"
                style={{ fontSize: "1rem" }}
              >
                {rfq.companyName}
              </span>
              <span
                className="text-neutral-600 status-text"
                style={{
                  fontSize: "0.75rem",
                  display: "block",
                  marginTop: "2px",
                }}
              >
                ID: {rfq.companyId}
              </span>
            </div>
          </div>
        </div>
      )}

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

        {/* Davet Sayısı (sadece INVITED tipinde) */}
        {rfq.rfqType === "INVITED" && (
          <>
            <div className="meta-item-divider"></div>
            <div className="meta-item">
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-info-100 text-info-700">
                  <i className="ph-bold ph-users"></i>
                </div>
              </div>
              <div className="meta-content">
                <p className="meta-label">Davet Sayısı</p>
                <span className="meta-value">{rfq.invitationCount || 0}</span>
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
                rfq.submissionDeadline
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
                  rfq.submissionDeadline
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
