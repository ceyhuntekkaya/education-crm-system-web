import React from "react";
import { Badge } from "@/components/ui";
import type { ProductVariantCardProps } from "../../../types";

export const ProductVariantCard: React.FC<ProductVariantCardProps> = ({
  variant,
  showDetails = true,
}) => {
  const formatPrice = (price?: number) => {
    if (price === undefined || price === null) return "0";
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="product-detail-page__variant-card">
      <div className="product-detail-page__variant-card__content">
        {/* Header */}
        <div className="product-detail-page__variant-card__header">
          <div className="d-flex align-items-center gap-10">
            <div className="product-detail-page__variant-card__icon">
              <i className="ph-bold ph-package text-lg"></i>
            </div>
            <div className="product-detail-page__variant-card__name">
              <h6 className="product-detail-page__variant-card__title">
                {variant.variantName || "Varyant"}
              </h6>
              {variant.sku && (
                <span className="product-detail-page__variant-card__sku">
                  {variant.sku}
                </span>
              )}
            </div>
          </div>

          {variant.isActive ? (
            <Badge
              variant="success"
              size="sm"
              className="product-detail-page__variant-card__status"
            >
              Aktif
            </Badge>
          ) : (
            <Badge
              variant="danger"
              size="sm"
              className="product-detail-page__variant-card__status"
            >
              Pasif
            </Badge>
          )}
        </div>

        {showDetails && (
          <>
            {/* Price Info */}
            <div className="product-detail-page__variant-card__price-info">
              <div className="product-detail-page__variant-card__price">
                <span className="product-detail-page__variant-card__price-label">
                  Fiyat Farkı
                </span>
                <span
                  className={`product-detail-page__variant-card__price-value ${
                    (variant.priceAdjustment || 0) >= 0
                      ? "text-success-600"
                      : "text-danger-600"
                  }`}
                >
                  {(variant.priceAdjustment || 0) >= 0 ? "+" : ""}
                  {formatPrice(variant.priceAdjustment)}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="product-detail-page__variant-card__details">
              {/* Stock Info */}
              <div className="product-detail-page__variant-card__detail-item">
                <i className="ph-bold ph-warehouse text-xs text-neutral-500"></i>
                <span className="text-xs text-neutral-700">
                  <span className="fw-medium">Stok: </span>
                  <span
                    className={
                      (variant.stockQuantity || 0) > 0
                        ? "text-success-600 fw-semibold"
                        : "text-danger-600 fw-semibold"
                    }
                  >
                    {variant.stockQuantity || 0} adet
                  </span>
                </span>
              </div>

              {/* Footer */}
              {variant.productName && (
                <div className="product-detail-page__variant-card__detail-item">
                  <i className="ph-bold ph-box text-xs text-neutral-500"></i>
                  <span className="text-xs text-neutral-700">
                    <span className="fw-medium">Ürün: </span>
                    {variant.productName}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
