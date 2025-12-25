import React from "react";
import { CustomImage } from "@/components/ui";
import { useProductDetail } from "../context";

export const ProductImageSection: React.FC = () => {
  const { product, statusInfo, isLowStock, isOutOfStock } = useProductDetail();

  if (!product) return null;

  return (
    <div className="product-detail-page__image-section">
      <div className="product-detail-page__image-container">
        {product.mainImageUrl ? (
          <div className="product-detail-page__main-image">
            <CustomImage
              src={product.mainImageUrl}
              alt={product.name || "Ürün görseli"}
              fill
              className="rounded-12"
              style={{ objectFit: "contain" }}
            />
            {/* Low Stock Badge */}
            {isLowStock && !isOutOfStock && (
              <div
                className="position-absolute"
                style={{ top: "12px", left: "12px" }}
              >
                <span
                  className="d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold text-white"
                  style={{
                    backgroundColor: "hsl(var(--warning-600))",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <i
                    className="ph-fill ph-warning-circle"
                    style={{ fontSize: "12px" }}
                  ></i>
                  Düşük Stok
                </span>
              </div>
            )}
            {/* Status Badge */}
            <div
              className="position-absolute"
              style={{ top: "12px", right: "12px" }}
            >
              <span
                className={`d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold ${statusInfo.bgClass} ${statusInfo.textClass}`}
                style={{
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
              >
                <span className="w-4 h-4 rounded-circle bg-white"></span>
                {statusInfo.label}
              </span>
            </div>
            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.9)",
                  backdropFilter: "blur(2px)",
                }}
              >
                <span className="text-white fw-bold fs-5">Stokta Yok</span>
              </div>
            )}
          </div>
        ) : (
          <div className="product-detail-page__image-placeholder">
            <i className="ph-duotone ph-package"></i>
            <p className="mt-3">Görsel bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
};
