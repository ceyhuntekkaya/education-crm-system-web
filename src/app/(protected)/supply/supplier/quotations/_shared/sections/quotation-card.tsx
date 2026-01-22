import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import type { QuotationDto } from "@/types";
import { getStatusConfig, formatCurrency, formatQuotationDate } from "../utils";

interface QuotationCardProps {
  quotation: QuotationDto;
  url?: string;
}

export const QuotationCard: React.FC<QuotationCardProps> = ({
  quotation,
  url,
}) => {
  const router = useRouter();
  const statusConfig = getStatusConfig(quotation.status);

  const isExpired = quotation.status === "EXPIRED";
  const isRejected = quotation.status === "REJECTED";

  const content = (
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
      {/* Quotation Header Image */}
      <div
        className="position-relative overflow-hidden"
        style={{ height: "200px" }}
      >
        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-main-25">
          <i
            className="ph-duotone ph-clipboard-text text-main-600"
            style={{ fontSize: "64px", opacity: 0.3 }}
          ></i>
        </div>

        {/* Version Badge - Overlay on Image */}
        {quotation.versionNumber && (
          <div
            className="position-absolute"
            style={{
              top: "12px",
              left: "12px",
              zIndex: 2,
            }}
          >
            <span
              className="d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold bg-white text-main-600"
              style={{
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              <i className="ph-bold ph-tag" style={{ fontSize: "12px" }}></i>v
              {quotation.versionNumber}
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

        {/* Expired/Rejected Overlay */}
        {(isExpired || isRejected) && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: isRejected
                ? "rgba(239, 68, 68, 0.9)"
                : "rgba(107, 114, 128, 0.9)",
              backdropFilter: "blur(2px)",
              zIndex: 3,
            }}
          >
            <span className="text-white fw-bold fs-5">
              {isRejected ? "Reddedildi" : "Süresi Doldu"}
            </span>
          </div>
        )}
      </div>

      {/* Quotation Content */}
      <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
        {/* RFQ Başlığı */}
        <h5 className="mb-12 fw-semibold line-height-1-3 text-md text-lg-lg text-neutral-900">
          {quotation.rfqTitle || "Başlık Yok"}
        </h5>

        {/* Supplier Name */}
        {quotation.supplierCompanyName && (
          <div
            style={{
              minHeight: "40px",
              marginBottom: "12px",
            }}
          >
            <div className="d-flex align-items-center gap-6 text-sm text-neutral-600">
              <i className="ph-bold ph-building"></i>
              <span>{quotation.supplierCompanyName}</span>
            </div>
          </div>
        )}

        {/* Meta Container - Total Amount */}
        <div className="soft-card rounded-16 mb-12">
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
              <i className="ph-bold ph-currency-dollar"></i>
            </div>
            <div className="status-info flex-grow-1">
              <span
                className="fw-bold text-success-700 status-value"
                style={{ fontSize: "0.875rem" }}
              >
                {formatCurrency(quotation.totalAmount, quotation.currency)}
              </span>
              <span
                className="text-neutral-600 status-text"
                style={{ fontSize: "0.7rem", marginLeft: "6px" }}
              >
                Toplam Tutar
              </span>
            </div>
          </div>
        </div>

        {/* Meta Container - Item Count & Delivery */}
        <div className="soft-card rounded-16 mb-12">
          <div className="meta-container">
            {/* Item Count */}
            <div className="meta-item">
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
                    {quotation.itemCount || 0} kalem
                  </span>
                </div>
              </div>
            </div>

            <div className="meta-item-divider"></div>

            {/* Delivery Days */}
            <div className="meta-item">
              <div className="meta-content">
                <p className="meta-label" style={{ fontSize: "0.6875rem" }}>
                  Teslimat Süresi
                </p>
                <div className="meta-value-wrapper">
                  <div className="meta-icon-wrapper">
                    <div
                      className="meta-icon bg-info-100 text-info-700"
                      style={{ width: "28px", height: "28px" }}
                    >
                      <i
                        className="ph-bold ph-truck"
                        style={{ fontSize: "14px" }}
                      ></i>
                    </div>
                  </div>
                  <span
                    className="meta-value"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    {quotation.deliveryDays || 0} gün
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating */}
        {quotation.averageRating !== undefined &&
          quotation.averageRating > 0 && (
            <div className="soft-card rounded-16 mb-12">
              <div className="d-flex align-items-center gap-12 p-12">
                <div
                  className="status-icon bg-warning-100 text-warning-700"
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
                  <i className="ph-fill ph-star"></i>
                </div>
                <div className="status-info flex-grow-1">
                  <span
                    className="fw-bold text-neutral-900 status-value"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {quotation.averageRating.toFixed(1)}
                  </span>
                  <span
                    className="text-neutral-600 status-text"
                    style={{ fontSize: "0.7rem", marginLeft: "6px" }}
                  >
                    Değerlendirme
                  </span>
                </div>
              </div>
            </div>
          )}

        {/* Valid Until */}
        {quotation.validUntil && (
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
                <i className="ph-bold ph-calendar"></i>
              </div>
              <div className="status-info flex-grow-1">
                <span
                  className="fw-bold text-neutral-900 status-value"
                  style={{ fontSize: "0.875rem" }}
                >
                  {formatQuotationDate(quotation.validUntil)}
                </span>
                <span
                  className="text-neutral-600 status-text"
                  style={{ fontSize: "0.7rem", marginLeft: "6px" }}
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
                Oluşturulma: {formatQuotationDate(quotation.createdAt)}
              </span>
            </div>
            {url && (
              <Button
                variant="outline"
                size="xs"
                rightIcon="ph-bold ph-eye"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(url);
                }}
              >
                Detay
              </Button>
            )}
          </div>
        )}

        {/* Expired Warning */}
        {isExpired && (
          <div className="mt-auto pt-12 border-top border-neutral-30">
            <div className="d-flex align-items-center gap-8 bg-neutral-50 px-12 py-8 rounded-8">
              <i className="ph-fill ph-clock text-neutral-600"></i>
              <span className="text-xs text-neutral-700 fw-medium">
                Bu teklifin geçerlilik süresi dolmuştur
              </span>
            </div>
          </div>
        )}

        {/* Rejected Warning */}
        {isRejected && (
          <div className="mt-auto pt-12 border-top border-neutral-30">
            <div className="d-flex align-items-center gap-8 bg-danger-50 px-12 py-8 rounded-8">
              <i className="ph-fill ph-x-circle text-danger-600"></i>
              <span className="text-xs text-danger-700 fw-medium">
                Bu teklif reddedilmiştir
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return content;
};
