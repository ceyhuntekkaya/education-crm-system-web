import React from "react";
import { formatCurrency, formatDate } from "@/utils";
import { formatDeliveryDays } from "../../../utils";

interface QuotationCardMetaProps {
  totalAmount?: number | null;
  currency?: string;
  averageRating?: number | null;
  deliveryDays?: number | null;
  itemsCount?: number;
  validUntil?: string;
  statusColor: string;
  onItemsClick?: () => void;
}

export const QuotationCardMeta: React.FC<QuotationCardMetaProps> = ({
  totalAmount,
  currency,
  averageRating,
  deliveryDays,
  itemsCount,
  validUntil,
  statusColor,
  onItemsClick,
}) => {
  const hasRatingOrDelivery =
    (averageRating !== undefined && averageRating !== null) ||
    (deliveryDays !== undefined && deliveryDays !== null);

  const hasItems = itemsCount && itemsCount > 0;
  const hasValidUntil = validUntil && validUntil.trim() !== "";

  return (
    <div className="soft-card rounded-16 mb-0 mt-auto">
      {/* Total Amount */}
      <div className="meta-container">
        <div className="meta-item">
          <div className="meta-content">
            <p className="meta-label" style={{ fontSize: "0.6875rem" }}>
              Toplam Tutar
            </p>
            <div className="meta-value-wrapper">
              <div className="meta-icon-wrapper">
                <div
                  className="meta-icon text-white"
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: statusColor,
                  }}
                >
                  <i
                    className="ph-bold ph-currency-circle-dollar"
                    style={{ fontSize: "16px" }}
                  />
                </div>
              </div>
              <span
                className="meta-value fw-bold"
                style={{ fontSize: "1.25rem", color: statusColor }}
              >
                {totalAmount !== undefined && totalAmount !== null && currency
                  ? formatCurrency(totalAmount, currency)
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      {hasRatingOrDelivery && (
        <div
          style={{
            height: "1px",
            backgroundColor: "hsl(var(--neutral-40))",
          }}
        />
      )}

      {/* Second Row: Rating and Delivery */}
      {hasRatingOrDelivery && (
        <div className="meta-container">
          {/* Rating */}
          {averageRating !== undefined && averageRating !== null && (
            <>
              <div className="meta-item">
                <div className="meta-content">
                  <p className="meta-label" style={{ fontSize: "0.6875rem" }}>
                    Değerlendirme
                  </p>
                  <div className="meta-value-wrapper">
                    <div className="meta-icon-wrapper">
                      <div
                        className="meta-icon bg-warning-100 text-warning-700"
                        style={{ width: "28px", height: "28px" }}
                      >
                        <i
                          className="ph-bold ph-star"
                          style={{ fontSize: "14px" }}
                        />
                      </div>
                    </div>
                    <span
                      className="meta-value"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {typeof averageRating === "number"
                        ? averageRating.toFixed(1)
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>

              {deliveryDays !== undefined && deliveryDays !== null && (
                <div className="meta-item-divider"></div>
              )}
            </>
          )}

          {/* Delivery */}
          {deliveryDays !== undefined && deliveryDays !== null && (
            <div className="meta-item">
              <div className="meta-content">
                <p className="meta-label" style={{ fontSize: "0.6875rem" }}>
                  Teslimat
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
                      />
                    </div>
                  </div>
                  <span
                    className="meta-value"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    {formatDeliveryDays(deliveryDays)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      {hasItems && (
        <div
          style={{
            height: "1px",
            backgroundColor: "hsl(var(--neutral-40))",
          }}
        />
      )}

      {/* Third Row: Items Count */}
      {hasItems && (
        <div className="meta-container">
          <div
            className="meta-item"
            onClick={onItemsClick}
            style={{
              cursor: "pointer",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onItemsClick?.();
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
                    />
                  </div>
                </div>
                <span className="meta-value" style={{ fontSize: "0.8125rem" }}>
                  {itemsCount} kalem
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      {hasValidUntil && (
        <div
          style={{
            height: "1px",
            backgroundColor: "hsl(var(--neutral-40))",
          }}
        />
      )}

      {/* Valid Until Date */}
      {hasValidUntil && (
        <div className="meta-container">
          <div className="meta-item">
            <div className="meta-content">
              <p className="meta-label" style={{ fontSize: "0.6875rem" }}>
                Geçerlilik
              </p>
              <div className="meta-value-wrapper">
                <div className="meta-icon-wrapper">
                  <div
                    className="meta-icon bg-purple-100 text-purple-700"
                    style={{ width: "28px", height: "28px" }}
                  >
                    <i
                      className="ph-bold ph-calendar-check"
                      style={{ fontSize: "14px" }}
                    />
                  </div>
                </div>
                <span className="meta-value" style={{ fontSize: "0.8125rem" }}>
                  {formatDate(validUntil!)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
