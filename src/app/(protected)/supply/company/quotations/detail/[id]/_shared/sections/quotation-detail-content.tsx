"use client";

import React from "react";
import { formatDate } from "@/utils";
import type { QuotationDto } from "@/types";
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
import { Badge } from "@/components";

interface QuotationDetailContentProps {
  quotation: QuotationDto;
}

export const QuotationDetailContent: React.FC<QuotationDetailContentProps> = ({
  quotation,
}) => {
  const isExpired = isQuotationExpired(quotation.validUntil);
  const daysUntilExpiry = calculateDaysUntilExpiry(quotation.validUntil);
  const isExpiringSoon = isQuotationExpiringSoon(quotation.validUntil);
  const statusConfig = getQuotationStatusConfig(quotation.status);

  return (
    <div className="bg-white rounded-16 p-24">
      {/* Header Section */}
      <div className="d-flex align-items-start justify-content-between mb-24 pb-24 border-bottom">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-12 mb-12">
            <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
              <i className="ph-bold ph-hash text-xs"></i>#
              {quotation.rfqId || "N/A"}
            </span>
            <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-500">
              <i className="ph-bold ph-clock-clockwise text-xs"></i>v
              {quotation.versionNumber || 1}
            </span>
            <Badge
              variant={getQuotationStatusBadgeVariant(quotation.status)}
              size="sm"
            >
              {statusConfig.text}
            </Badge>
          </div>
          <h3 className="mb-0 fw-semibold text-neutral-900">
            {quotation.rfqTitle || "İlan Başlığı"}
          </h3>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="row g-4">
        {/* Left Column - Main Info */}
        <div className="col-12 col-lg-8">
          {/* Supplier Info */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-16">Tedarikçi Bilgileri</h5>
              <div className="d-flex align-items-center gap-12">
                <div
                  className="d-flex align-items-center justify-content-center bg-primary-100 text-primary-700"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className="ph-bold ph-storefront"
                    style={{ fontSize: "24px" }}
                  ></i>
                </div>
                <div className="flex-grow-1">
                  <div className="fw-semibold text-neutral-900 mb-2">
                    {quotation.supplierCompanyName || "Tedarikçi Yok"}
                  </div>
                  {quotation.averageRating !== undefined &&
                    quotation.averageRating !== null && (
                      <div className="d-flex align-items-center gap-4">
                        <i
                          className="ph-fill ph-star text-warning-600"
                          style={{ fontSize: "16px" }}
                        ></i>
                        <span className="text-sm text-neutral-600 fw-medium">
                          {quotation.averageRating.toFixed(1)}
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Amount Section */}
          {quotation.totalAmount !== undefined &&
            quotation.totalAmount !== null && (
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title mb-16">Tutar Bilgileri</h5>
                  <div
                    className="amount-box"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(72, 127, 238, 0.06) 0%, rgba(72, 127, 238, 0.04) 100%)",
                      border: "1px solid rgba(72, 127, 238, 0.1)",
                      padding: "20px",
                      borderRadius: "12px",
                    }}
                  >
                    <p className="text-neutral-500 amount-label mb-2">
                      Toplam Tutar
                    </p>
                    <div className="fw-bold text-main-600 amount-value fs-4 mb-2">
                      {formatAmount(quotation.totalAmount, quotation.currency)}
                    </div>
                    {quotation.itemCount !== undefined &&
                      quotation.itemCount !== null && (
                        <p className="text-neutral-500 text-sm mb-0">
                          {quotation.itemCount} kalem
                        </p>
                      )}
                  </div>
                </div>
              </div>
            )}

          {/* Additional Info */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-16">Ek Bilgiler</h5>
              <div className="row g-3">
                {quotation.itemCount !== undefined &&
                  quotation.itemCount !== null && (
                    <div className="col-6">
                      <div className="d-flex align-items-center gap-8">
                        <div className="meta-icon bg-primary-100 text-primary-700">
                          <i className="ph-bold ph-list-bullets"></i>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 mb-1">
                            Kalem Sayısı
                          </p>
                          <p className="fw-semibold text-neutral-900 mb-0">
                            {quotation.itemCount} kalem
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                {quotation.deliveryDays !== undefined &&
                  quotation.deliveryDays !== null && (
                    <div className="col-6">
                      <div className="d-flex align-items-center gap-8">
                        <div className="meta-icon bg-primary-100 text-primary-700">
                          <i className="ph-bold ph-truck"></i>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 mb-1">
                            Teslimat Süresi
                          </p>
                          <p className="fw-semibold text-neutral-900 mb-0">
                            {quotation.deliveryDays} gün
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Notes */}
          {quotation.notes && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-12">Notlar</h5>
                <p className="text-neutral-700 mb-0">{quotation.notes}</p>
              </div>
            </div>
          )}

          {/* Payment Terms */}
          {quotation.paymentTerms && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-12">Ödeme Koşulları</h5>
                <p className="text-neutral-700 mb-0">
                  {quotation.paymentTerms}
                </p>
              </div>
            </div>
          )}

          {/* Warranty Terms */}
          {quotation.warrantyTerms && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-12">Garanti Koşulları</h5>
                <p className="text-neutral-700 mb-0">
                  {quotation.warrantyTerms}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="col-12 col-lg-4">
          {/* Valid Until Card */}
          {quotation.validUntil && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-12">Geçerlilik Tarihi</h5>
                <div className="d-flex align-items-center gap-12">
                  <div
                    className={`status-icon ${getExpiryIconBoxColor(
                      isExpired,
                      isExpiringSoon
                    )}`}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      flexShrink: 0,
                    }}
                  >
                    <i className="ph-bold ph-calendar-check"></i>
                  </div>
                  <div className="status-info flex-grow-1">
                    <div
                      className={`fw-bold ${getExpiryColorClass(
                        isExpired,
                        isExpiringSoon
                      )} status-value mb-1`}
                      style={{ fontSize: "1.1rem" }}
                    >
                      {formatDate(quotation.validUntil)}
                    </div>
                    <div className="text-neutral-600 status-text">
                      {isExpired
                        ? "Süresi Doldu"
                        : isExpiringSoon
                        ? `${daysUntilExpiry} gün kaldı`
                        : "Aktif"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dates Card */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-12">Tarih Bilgileri</h5>
              <div className="d-flex flex-column gap-12">
                {quotation.createdAt && (
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">
                      Oluşturulma Tarihi
                    </p>
                    <p className="fw-medium text-neutral-900 mb-0">
                      {formatDate(quotation.createdAt)}
                    </p>
                  </div>
                )}
                {quotation.updatedAt && (
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">
                      Güncellenme Tarihi
                    </p>
                    <p className="fw-medium text-neutral-900 mb-0">
                      {formatDate(quotation.updatedAt)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
