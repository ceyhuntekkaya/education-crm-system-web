"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { formatDate } from "@/utils";
import type { QuotationDto } from "@/types";
import {
  getQuotationStatusDisplay,
  formatAmount,
  isQuotationExpired,
  calculateDaysUntilExpiry,
  isQuotationExpiringSoon,
  getQuotationStatusConfig,
  getExpiryColorClass,
  getExpiryIconBoxColor,
} from "../utils";

interface QuotationCardProps {
  quotation: QuotationDto;
}

export const QuotationCard: React.FC<QuotationCardProps> = ({ quotation }) => {
  const router = useRouter();

  const isExpired = isQuotationExpired(quotation.validUntil);
  const daysUntilExpiry = calculateDaysUntilExpiry(quotation.validUntil);
  const isExpiringSoon = isQuotationExpiringSoon(quotation.validUntil);
  const statusConfig = getQuotationStatusConfig(quotation.status);

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
        }}
      >
        {/* Quotation Header Image - Campaign Card Style */}
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

          {/* Expiry Badge - Overlay on Image - Always Visible */}
          {quotation.validUntil && (
            <div
              className="position-absolute"
              style={{
                top: "12px",
                left: "12px",
                zIndex: 2,
              }}
            >
              {isExpired ? (
                <span
                  className="d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold text-white"
                  style={{
                    backgroundColor: "#DC2626",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <i
                    className="ph-fill ph-x-circle"
                    style={{ fontSize: "12px", color: "#FFFFFF" }}
                  ></i>
                  Süresi Doldu
                </span>
              ) : isExpiringSoon ? (
                <span
                  className="d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold text-white"
                  style={{
                    backgroundColor: "#F97316",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <i
                    className="ph-fill ph-warning"
                    style={{ fontSize: "12px", color: "#FFFFFF" }}
                  ></i>
                  {daysUntilExpiry} Gün
                </span>
              ) : (
                <span
                  className="d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold text-white"
                  style={{
                    backgroundColor: "#059669",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <i
                    className="ph-fill ph-check-circle"
                    style={{ fontSize: "12px", color: "#FFFFFF" }}
                  ></i>
                  {daysUntilExpiry !== null && daysUntilExpiry > 7
                    ? `${daysUntilExpiry} Gün`
                    : "Aktif"}
                </span>
              )}
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

        {/* Quotation Content - Campaign Card Style */}
        <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
          {/* Top Meta Row - Campaign Card Style */}
          <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-12 mb-12">
            {/* ID Badge */}
            <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
              <i className="ph-bold ph-hash text-xs"></i>#
              {quotation.rfqId || "N/A"}
            </span>

            {/* Version Badge */}
            <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-500">
              <i className="ph-bold ph-clock-clockwise text-xs"></i>v
              {quotation.versionNumber || 1}
            </span>
          </div>

          {/* Teklif Başlığı - Campaign Card Style */}
          <h5 className="mb-12 fw-semibold line-height-1-3 text-md text-lg-lg text-neutral-900">
            {quotation.rfqTitle || "Başlık Yok"}
          </h5>

          {/* Supplier Info - Campaign Card Style */}
          <div className="d-flex align-items-center gap-8 mb-12">
            <div
              className="d-flex align-items-center justify-content-center bg-primary-100 text-primary-700"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                flexShrink: 0,
              }}
            >
              <i
                className="ph-bold ph-storefront"
                style={{ fontSize: "16px" }}
              ></i>
            </div>
            <div className="flex-grow-1 min-w-0">
              <div className="text-sm fw-medium text-truncate text-neutral-900">
                {quotation.supplierCompanyName || "Tedarikçi Yok"}
              </div>
              {quotation.averageRating !== undefined &&
                quotation.averageRating !== null && (
                  <div className="d-flex align-items-center gap-4 mt-2">
                    <i
                      className="ph-fill ph-star text-warning-600"
                      style={{ fontSize: "12px" }}
                    ></i>
                    <span className="text-xs text-neutral-600 fw-medium">
                      {quotation.averageRating.toFixed(1)}
                    </span>
                  </div>
                )}
            </div>
          </div>

          {/* Total Amount Section - Active Orders Card Style (Amount Box) */}
          {quotation.totalAmount !== undefined &&
            quotation.totalAmount !== null && (
              <div
                className="amount-box mb-16"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(72, 127, 238, 0.06) 0%, rgba(72, 127, 238, 0.04) 100%)",
                  border: "1px solid rgba(72, 127, 238, 0.1)",
                  padding: "12px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              >
                <p className="text-neutral-500 amount-label mb-4">
                  Toplam Tutar
                </p>
                <div className="fw-bold text-main-600 amount-value">
                  {formatAmount(quotation.totalAmount, quotation.currency)}
                </div>
                {quotation.itemCount !== undefined &&
                  quotation.itemCount !== null && (
                    <p className="text-neutral-500 text-xs mb-0 mt-2">
                      {quotation.itemCount} kalem
                    </p>
                  )}
              </div>
            )}

          {/* Meta Container - Active Orders Card Style */}
          <div className="meta-container soft-card rounded-16 mb-12">
            {/* Item Count */}
            {quotation.itemCount !== undefined &&
              quotation.itemCount !== null && (
                <>
                  <div className="meta-item">
                    <div className="meta-content">
                      <p className="meta-label">Kalem Sayısı</p>
                      <div className="meta-value-wrapper">
                        <div className="meta-icon-wrapper">
                          <div className="meta-icon bg-primary-100 text-primary-700">
                            <i className="ph-bold ph-list-bullets"></i>
                          </div>
                        </div>
                        <span className="meta-value">
                          {quotation.itemCount} kalem
                        </span>
                      </div>
                    </div>
                  </div>

                  {quotation.deliveryDays !== undefined &&
                    quotation.deliveryDays !== null && (
                      <>
                        <div className="meta-item-divider"></div>
                      </>
                    )}
                </>
              )}

            {/* Delivery Days */}
            {quotation.deliveryDays !== undefined &&
              quotation.deliveryDays !== null && (
                <div className="meta-item">
                  <div className="meta-content">
                    <p className="meta-label">Teslimat Süresi</p>
                    <div className="meta-value-wrapper">
                      <div className="meta-icon-wrapper">
                        <div className="meta-icon bg-primary-100 text-primary-700">
                          <i className="ph-bold ph-truck"></i>
                        </div>
                      </div>
                      <span className="meta-value">
                        {quotation.deliveryDays} gün
                      </span>
                    </div>
                  </div>
                </div>
              )}
          </div>

          {/* Valid Until Card - Institution Card Style (Soft Card) */}
          {quotation.validUntil && (
            <div className="soft-card rounded-16 mb-12">
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
                    Geçerlilik Tarihi
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Created Date with Detail Button */}
          {quotation.createdAt && (
            <div className="d-flex align-items-center justify-content-between gap-12 mb-12">
              <div className="d-flex align-items-center gap-6">
                <i className="ph-bold ph-clock text-neutral-400 text-sm"></i>
                <span className="text-xs text-neutral-500 fw-medium">
                  Oluşturulma: {formatDate(quotation.createdAt)}
                </span>
              </div>
              <Button
                variant="outline"
                size="xs"
                rightIcon="ph-bold ph-eye"
                onClick={() =>
                  router.push(
                    `/supply/company/quotations/detail/${quotation.id}`
                  )
                }
              >
                Detay
              </Button>
            </div>
          )}

          {/* Expiring Soon Warning - Institution Card Style */}
          {isExpiringSoon && !isExpired && (
            <div className="mt-auto pt-12 border-top border-neutral-30">
              <div className="d-flex align-items-center gap-8 bg-warning-50 px-12 py-8 rounded-8">
                <i className="ph-fill ph-warning text-warning-600"></i>
                <span className="text-xs text-warning-700 fw-medium">
                  Geçerlilik süresi yakında doluyor! ({daysUntilExpiry} gün
                  kaldı)
                </span>
              </div>
            </div>
          )}

          {/* Expired Warning - Institution Card Style */}
          {isExpired && (
            <div className="mt-auto pt-12 border-top border-neutral-30">
              <div className="d-flex align-items-center gap-8 bg-danger-50 px-12 py-8 rounded-8">
                <i className="ph-fill ph-x-circle text-danger-600"></i>
                <span className="text-xs text-danger-700 fw-medium">
                  Bu teklifin geçerlilik süresi dolmuştur
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
