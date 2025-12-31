"use client";

import React from "react";
import { formatDate } from "@/utils";
import { Badge } from "@/components";
import { useQuotationDetail } from "../context";
import {
  formatAmount,
  isQuotationExpired,
  calculateDaysUntilExpiry,
  isQuotationExpiringSoon,
  getQuotationStatusConfig,
  getExpiryColorClass,
  getExpiryIconBoxColor,
  getQuotationStatusBadgeVariant,
} from "../../../../_shared/utils";

export const QuotationInfoSection: React.FC = () => {
  const { quotation } = useQuotationDetail();

  if (!quotation) return null;

  const isExpired = isQuotationExpired(quotation.validUntil);
  const daysUntilExpiry = calculateDaysUntilExpiry(quotation.validUntil);
  const isExpiringSoon = isQuotationExpiringSoon(quotation.validUntil);
  const statusConfig = getQuotationStatusConfig(quotation.status);

  return (
    <div className="quotation-detail-page__info-section">
      {/* Başlık ve Durum */}
      <div className="quotation-detail-page__title-section">
        <div className="quotation-detail-page__badges">
          <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
            <i className="ph-bold ph-hash text-xs"></i>
            RFQ #{quotation.rfqId || "N/A"}
          </span>
          <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-500">
            <i className="ph-bold ph-clock-clockwise text-xs"></i>
            v{quotation.versionNumber || 1}
          </span>
          <Badge
            variant={getQuotationStatusBadgeVariant(quotation.status)}
            size="sm"
          >
            {statusConfig.text}
          </Badge>
        </div>
        <h1 className="quotation-detail-page__title mb-0">
          {quotation.rfqTitle || "Teklif Başlığı"}
        </h1>
      </div>

      {/* Tutar Bilgisi - Product Card Style (Amount Box) */}
      {quotation.totalAmount !== undefined && (
        <div
          className="amount-box"
          style={{
            background:
              "linear-gradient(135deg, rgba(72, 127, 238, 0.06) 0%, rgba(72, 127, 238, 0.04) 100%)",
            border: "1px solid rgba(72, 127, 238, 0.1)",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
        >
          <p className="text-neutral-500 amount-label mb-0">Toplam Tutar</p>
          <div className="fw-bold text-main-600 amount-value fs-4">
            {formatAmount(quotation.totalAmount, quotation.currency)}
          </div>
          {quotation.itemCount !== undefined &&
            quotation.itemCount !== null && (
              <p className="text-neutral-500 text-sm mb-0 mt-2">
                {quotation.itemCount} kalem
              </p>
            )}
        </div>
      )}

      {/* Tedarikçi Bilgisi */}
      {quotation.supplierCompanyName && (
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
              <i className="ph-bold ph-storefront"></i>
            </div>
            <div className="status-info flex-grow-1">
              <span
                className="fw-bold text-neutral-900 status-value"
                style={{ fontSize: "1rem" }}
              >
                {quotation.supplierCompanyName}
              </span>
              {quotation.averageRating !== undefined &&
                quotation.averageRating !== null && (
                  <div className="d-flex align-items-center gap-4 mt-1">
                    <i
                      className="ph-fill ph-star text-warning-600"
                      style={{ fontSize: "14px" }}
                    ></i>
                    <span className="text-xs text-neutral-600 fw-medium">
                      {quotation.averageRating.toFixed(1)}
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Meta Container - Product Card Style */}
      <div className="meta-container soft-card rounded-16">
        {/* Teslimat Süresi */}
        {quotation.deliveryDays !== undefined && (
          <div className="meta-item">
            <div className="meta-icon-wrapper">
              <div className="meta-icon bg-primary-100 text-primary-700">
                <i className="ph-bold ph-truck"></i>
              </div>
            </div>
            <div className="meta-content">
              <p className="meta-label">Teslimat Süresi</p>
              <span className="meta-value">{quotation.deliveryDays} gün</span>
            </div>
          </div>
        )}

        {/* Divider */}
        {quotation.deliveryDays !== undefined &&
          quotation.itemCount !== undefined &&
          quotation.itemCount !== null && <div className="meta-item-divider"></div>}

        {/* Kalem Sayısı */}
        {quotation.itemCount !== undefined && quotation.itemCount !== null && (
          <div className="meta-item">
            <div className="meta-icon-wrapper">
              <div className="meta-icon bg-primary-100 text-primary-700">
                <i className="ph-bold ph-list-bullets"></i>
              </div>
            </div>
            <div className="meta-content">
              <p className="meta-label">Kalem Sayısı</p>
              <span className="meta-value">{quotation.itemCount} kalem</span>
            </div>
          </div>
        )}
      </div>

      {/* Geçerlilik Tarihi - Product Card Style (Soft Card) */}
      {quotation.validUntil && (
        <div className="soft-card rounded-16">
          <div className="d-flex align-items-center gap-12 p-12">
            <div
              className={`status-icon ${getExpiryIconBoxColor(
                isExpired,
                isExpiringSoon
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
              <span
                className={`fw-bold ${getExpiryColorClass(
                  isExpired,
                  isExpiringSoon
                )} status-value`}
                style={{ fontSize: "1rem" }}
              >
                {formatDate(quotation.validUntil)}
              </span>
              <span
                className="text-neutral-600 status-text"
                style={{ fontSize: "0.75rem", marginLeft: "6px" }}
              >
                {isExpired
                  ? "Süresi Doldu"
                  : isExpiringSoon
                  ? `${daysUntilExpiry} gün kaldı`
                  : "Aktif"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

