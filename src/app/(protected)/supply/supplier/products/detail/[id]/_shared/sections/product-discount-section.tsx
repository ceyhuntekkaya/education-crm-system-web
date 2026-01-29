import React from "react";
import {
  formatDiscountValue,
  formatDateRange,
  getDiscountTypeLabel,
  getDiscountTypeIcon,
  getDiscountStatus,
} from "../utils";
import { useProductDetail } from "../context";
import { useProductsContext } from "../../../../_shared/contexts";

export const ProductDiscountSection: React.FC = () => {
  // ProductsContext'ten discount data al
  const {
    currentProduct: product,
    currentProductActiveDiscounts: activeDiscounts,
    currentProductDiscountsLoading: isLoading,
    currentProductHasActiveDiscount: hasActiveDiscount,
  } = useProductsContext();

  // ProductDetail context'ten sadece gerekirse computed values al (şu an yok)
  const currency = product?.currency || "TRY";

  // Eğer yükleniyor veya aktif indirim yoksa gösterme
  if (isLoading) {
    return null;
  }

  if (!hasActiveDiscount) {
    return null;
  }

  return (
    <div className="product-detail-page__discount-section">
      <div className="product-detail-page__discount-header">
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-tag text-lg text-success-600"></i>
          <h3 className="text-md fw-semibold text-neutral-900 mb-0">
            Aktif İndirimler
          </h3>
        </div>
        <span className="badge text-sm bg-success-50 text-success-600 radius-8 px-12 py-6">
          {activeDiscounts.length} İndirim
        </span>
      </div>

      <div className="product-detail-page__discount-list">
        {activeDiscounts.map((discount) => {
          const status = getDiscountStatus(
            discount.startDate,
            discount.endDate,
          );

          return (
            <div
              key={discount.id}
              className="product-detail-page__discount-card"
            >
              <div className="product-detail-page__discount-card-header">
                <div className="d-flex align-items-center gap-10">
                  <div className="product-detail-page__discount-icon">
                    <i
                      className={`${getDiscountTypeIcon(
                        discount.discountType,
                      )} text-lg`}
                    ></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-8 mb-2">
                      <h4 className="text-sm fw-semibold text-neutral-900 mb-0">
                        {discount.discountName || "İndirim"}
                      </h4>
                      <span
                        className={`badge text-xs radius-8 px-8 py-4 ${status.class}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-600">
                      {getDiscountTypeLabel(discount.discountType)}
                    </span>
                  </div>
                </div>
                <div className="product-detail-page__discount-value">
                  {formatDiscountValue(
                    discount.discountType,
                    discount.discountValue,
                    currency,
                  )}
                </div>
              </div>

              {/* İndirim Detayları */}
              <div className="product-detail-page__discount-details">
                {(discount.minQuantity || discount.maxQuantity) && (
                  <div className="product-detail-page__discount-detail-item">
                    <i className="ph-bold ph-package text-xs text-neutral-500"></i>
                    <span className="text-xs text-neutral-700">
                      {discount.minQuantity && discount.maxQuantity
                        ? `${discount.minQuantity} - ${discount.maxQuantity} adet`
                        : discount.minQuantity
                          ? `Min ${discount.minQuantity} adet`
                          : `Max ${discount.maxQuantity} adet`}
                    </span>
                  </div>
                )}

                {formatDateRange(discount.startDate, discount.endDate) && (
                  <div className="product-detail-page__discount-detail-item">
                    <i className="ph-bold ph-calendar text-xs text-neutral-500"></i>
                    <span className="text-xs text-neutral-700">
                      {formatDateRange(discount.startDate, discount.endDate)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
