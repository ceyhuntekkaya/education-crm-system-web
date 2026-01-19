"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { formatDate } from "@/utils";
import type { RFQDto } from "@/types";
import {
  getRFQStatusDisplay,
  isRFQExpired,
  calculateDaysUntilDeadline,
  isRFQDeadlineApproaching,
  getRFQStatusConfig,
  getDeadlineColorClass,
  getDeadlineIconBoxColor,
  getRFQTypeDisplay,
  getDeadlineBadgeInfo,
  getRFQCardSummary,
} from "../utils";

interface RFQCardProps {
  rfq: RFQDto;
}

export const RFQCard: React.FC<RFQCardProps> = ({ rfq }) => {
  const router = useRouter();

  const isExpired = isRFQExpired(rfq.submissionDeadline);
  const daysUntilDeadline = calculateDaysUntilDeadline(rfq.submissionDeadline);
  const isApproaching = isRFQDeadlineApproaching(rfq.submissionDeadline);
  const statusConfig = getRFQStatusConfig(rfq.status);
  const deadlineBadge = getDeadlineBadgeInfo(rfq.submissionDeadline);
  const summary = getRFQCardSummary(rfq);

  const handleItemsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/supply/company/rfqs/items/${rfq.id}`);
  };

  const handleQuotationsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/supply/company/rfqs/quotations/${rfq.id}`);
  };

  return (
    <div
      className="bg-white rounded-16 h-100 overflow-hidden transition-all d-flex flex-column"
      style={{
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        border: "1.5px solid hsl(var(--neutral-40))",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* RFQ Header Image */}
      <div
        className="position-relative overflow-hidden"
        style={{ height: "200px" }}
      >
        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-main-25">
          <i
            className="ph-duotone ph-file-text text-main-600"
            style={{ fontSize: "64px", opacity: 0.3 }}
          ></i>
        </div>

        {/* Deadline Badge - Overlay on Image */}
        {rfq.submissionDeadline && (
          <div
            className="position-absolute"
            style={{
              top: "12px",
              left: "12px",
              zIndex: 2,
            }}
          >
            <span
              className="d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold"
              style={{
                backgroundColor: deadlineBadge.bgColor,
                color: deadlineBadge.textColor,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              <i
                className={deadlineBadge.icon}
                style={{ fontSize: "12px" }}
              ></i>
              {deadlineBadge.text}
            </span>
          </div>
        )}

        {/* Status Badge - Overlay on Image */}
        <div
          className="position-absolute"
          style={{ top: "12px", right: "12px", zIndex: 2 }}
        >
          <span
            className={`d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold ${statusConfig.bgClass} ${statusConfig.textClass}`}
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <span className="w-4 h-4 rounded-circle bg-white"></span>
            {statusConfig.text}
          </span>
        </div>

        {/* Expired Overlay */}
        {isExpired && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.9)",
              backdropFilter: "blur(2px)",
              zIndex: 3,
            }}
          >
            <span className="text-white fw-bold fs-5">Süresi Doldu</span>
          </div>
        )}
      </div>

      {/* RFQ Content */}
      <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
        {/* RFQ ID */}
        {/* {rfq.id && (
            <div className="mb-12">
              <span className="text-xs text-neutral-500 fw-medium">
                #{rfq.id}
              </span>
            </div>
          )} */}

        {/* RFQ Başlığı ve Type Badge */}
        <div className="d-flex align-items-center justify-content-between gap-12 mb-12">
          <h5 className="mb-0 fw-semibold line-height-1-3 text-md text-lg-lg text-neutral-900 flex-grow-1">
            {rfq.title || "Başlık Yok"}
          </h5>

          {/* RFQ Type Badge */}
          <span
            className="d-inline-flex align-items-center gap-6 text-xs text-info-700 bg-info-50 px-10 py-6 rounded-8 fw-medium"
            style={{ flexShrink: 0 }}
          >
            <i className="ph-bold ph-info text-xs"></i>
            {getRFQTypeDisplay(rfq.rfqType)}
          </span>
        </div>

        {/* Description */}
        <div
          style={{
            minHeight: "63px",
            marginBottom: "12px",
          }}
        >
          {rfq.description && (
            <p
              className="text-sm text-neutral-600 mb-0"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1.5",
              }}
            >
              {rfq.description}
            </p>
          )}
        </div>

        {/* Meta Container - Active Orders Card Style */}
        <div className="soft-card rounded-16 mb-12">
          {/* İlk satır: Kalem ve Teklif Sayısı */}
          <div className="meta-container">
            {/* Item Count */}
            <div
              className="meta-item"
              onClick={handleItemsClick}
              style={{ cursor: "pointer" }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleItemsClick(e as any);
                }
              }}
            >
              <div className="meta-content">
                <p className="meta-label" style={{ fontSize: "0.6875rem" }}>
                  Kalem Sayısı
                </p>
                <div className="meta-value-wrapper">
                  <div className="meta-icon-wrapper">
                    <div
                      className="meta-icon bg-primary-100 text-primary-700"
                      style={{ width: "28px", height: "28px" }}
                    >
                      <i
                        className="ph-bold ph-package"
                        style={{ fontSize: "14px" }}
                      ></i>
                    </div>
                  </div>
                  <span
                    className="meta-value"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    {summary.itemCount > 0
                      ? `${summary.itemCount} kalem`
                      : "Henüz kalem yok"}
                  </span>
                </div>
              </div>
            </div>

            <div className="meta-item-divider"></div>

            {/* Quotation Count */}
            <div
              className="meta-item"
              onClick={handleQuotationsClick}
              style={{ cursor: "pointer" }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleQuotationsClick(e as any);
                }
              }}
            >
              <div className="meta-content">
                <p className="meta-label" style={{ fontSize: "0.6875rem" }}>
                  Teklif Sayısı
                </p>
                <div className="meta-value-wrapper">
                  <div className="meta-icon-wrapper">
                    <div
                      className="meta-icon bg-success-100 text-success-700"
                      style={{ width: "28px", height: "28px" }}
                    >
                      <i
                        className="ph-bold ph-file-text"
                        style={{ fontSize: "14px" }}
                      ></i>
                    </div>
                  </div>
                  <span
                    className="meta-value"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    {summary.quotationCount > 0
                      ? `${summary.quotationCount} teklif`
                      : "Henüz teklif yok"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* İkinci satır: Davet Sayısı */}
          <div
            style={{
              height: "1px",
              backgroundColor: "hsl(var(--neutral-40))",
            }}
          ></div>

          <div className="meta-container">
            {/* Invitation Count - Tıklanabilir */}
            <div
              className="meta-item"
              onClick={(e) => {
                if (summary.invitationCount > 0) {
                  e.stopPropagation();
                  router.push(
                    `/supply/company/rfqs/invited-suppliers/${rfq.id}`
                  );
                }
              }}
              style={{
                cursor: summary.invitationCount > 0 ? "pointer" : "default",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (summary.invitationCount > 0) {
                  e.currentTarget.style.backgroundColor = "hsl(var(--info-50))";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div className="meta-content">
                <p className="meta-label" style={{ fontSize: "0.6875rem" }}>
                  Davet Sayısı
                </p>
                <div className="meta-value-wrapper">
                  <div className="meta-icon-wrapper">
                    <div
                      className="meta-icon bg-info-100 text-info-700"
                      style={{ width: "28px", height: "28px" }}
                    >
                      <i
                        className="ph-bold ph-users"
                        style={{ fontSize: "14px" }}
                      ></i>
                    </div>
                  </div>
                  <span
                    className="meta-value"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    {summary.invitationCount > 0
                      ? `${summary.invitationCount} davet`
                      : "Henüz davet yok"}
                  </span>
                  {/* {summary.invitationCount > 0 && (
                      <i
                        className="ph-bold ph-arrow-right"
                        style={{
                          fontSize: "12px",
                          marginLeft: "6px",
                          color: "hsl(var(--info-700))",
                        }}
                      ></i>
                    )} */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submission Deadline Card */}
        {rfq.submissionDeadline && (
          <div className="soft-card rounded-16 mb-12">
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
                <i className="ph-bold ph-clock"></i>
              </div>
              <div className="status-info flex-grow-1">
                <span
                  className={`fw-bold ${getDeadlineColorClass(
                    rfq.submissionDeadline
                  )} status-value`}
                  style={{ fontSize: "0.875rem" }}
                >
                  {formatDate(rfq.submissionDeadline)}
                </span>
                <span
                  className="text-neutral-600 status-text"
                  style={{ fontSize: "0.7rem", marginLeft: "6px" }}
                >
                  Son Başvuru
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Expected Delivery Date */}
        {rfq.expectedDeliveryDate && (
          <div className="soft-card rounded-16 mb-12">
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
                <i className="ph-bold ph-truck"></i>
              </div>
              <div className="status-info flex-grow-1">
                <span
                  className="fw-bold text-neutral-900 status-value"
                  style={{ fontSize: "0.875rem" }}
                >
                  {formatDate(rfq.expectedDeliveryDate)}
                </span>
                <span
                  className="text-neutral-600 status-text"
                  style={{ fontSize: "0.7rem", marginLeft: "6px" }}
                >
                  Beklenen Teslimat
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Created Date with Detail Button */}
        {rfq.createdAt && (
          <div className="d-flex align-items-center justify-content-between gap-12 mb-12">
            <div className="d-flex align-items-center gap-6">
              <i className="ph-bold ph-clock text-neutral-400 text-sm"></i>
              <span className="text-xs text-neutral-500 fw-medium">
                Oluşturulma: {formatDate(rfq.createdAt)}
              </span>
            </div>
            <Button
              variant="outline"
              size="xs"
              rightIcon="ph-bold ph-eye"
              onClick={() =>
                router.push(`/supply/company/rfqs/detail/${rfq.id}`)
              }
            >
              Detay
            </Button>
          </div>
        )}

        {/* Deadline Approaching Warning */}
        {isApproaching && !isExpired && (
          <div className="mt-auto pt-12 border-top border-neutral-30">
            <div className="d-flex align-items-center gap-8 bg-warning-50 px-12 py-8 rounded-8">
              <i className="ph-fill ph-warning text-warning-600"></i>
              <span className="text-xs text-warning-700 fw-medium">
                Son başvuru tarihi yaklaşıyor! ({daysUntilDeadline} gün kaldı)
              </span>
            </div>
          </div>
        )}

        {/* Expired Warning */}
        {isExpired && (
          <div className="mt-auto pt-12 border-top border-neutral-30">
            <div className="d-flex align-items-center gap-8 bg-danger-50 px-12 py-8 rounded-8">
              <i className="ph-fill ph-x-circle text-danger-600"></i>
              <span className="text-xs text-danger-700 fw-medium">
                Bu alım ilanının süresi dolmuştur
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
