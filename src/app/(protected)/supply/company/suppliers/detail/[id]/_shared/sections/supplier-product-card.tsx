"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomImage, Button } from "@/components/ui";
import { ProductSummaryDto, ProductSummaryDtoStatus } from "@/types";
import {
  getStatusConfig,
  getStockColorClass as utilsGetStockColorClass,
  getStockIconBoxColor as utilsGetStockIconBoxColor,
} from "@/app/(protected)/supply/company/products/_shared/utils";

interface SupplierProductCardProps {
  product: ProductSummaryDto;
}

/**
 * Tedarikçi ürün kartı componenti
 * Product Card tasarımından esinlenilmiştir
 */
export const SupplierProductCard: React.FC<SupplierProductCardProps> = ({
  product,
}) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  // Stok durumu kontrolü
  const isOutOfStock =
    product.status === "OUT_OF_STOCK" ||
    (product.stockQuantity !== undefined && product.stockQuantity === 0);
  const isLowStock = false; // ProductSummaryDto'da low stock bilgisi yok

  const getStockDisplay = () => {
    if (product.stockQuantity !== undefined) {
      return `${product.stockQuantity} Adet`;
    }
    return "Belirtilmemiş";
  };

  const statusConfig = getStatusConfig(product.status);
  const stockDisplay = getStockDisplay();
  const stockColorClass = utilsGetStockColorClass(isOutOfStock, isLowStock);
  const stockIconBoxColor = utilsGetStockIconBoxColor(isOutOfStock, isLowStock);

  const formatPrice = (price?: number, currency?: string) => {
    if (!price) return "Fiyat belirtilmemiş";
    return `${price.toFixed(2)} ${currency || "TRY"}`;
  };

  return (
    <div>
      <div
        className={`bg-white rounded-16 h-100 overflow-hidden transition-all d-flex flex-column ${
          !product.status || product.status === "PASSIVE" ? "opacity-70" : ""
        }`}
        style={{
          boxShadow:
            "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
          border: "1.5px solid hsl(var(--neutral-40))",
        }}
      >
        {/* Product Image - Campaign Card Style */}
        <div
          className="position-relative overflow-hidden"
          style={{ height: "200px" }}
        >
          {product.mainImageUrl && !imageError ? (
            <CustomImage
              src={product.mainImageUrl}
              alt={product.name || "Ürün"}
              width={400}
              height={200}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-main-25">
              <i
                className="ph-duotone ph-package text-main-600"
                style={{ fontSize: "48px", opacity: 0.2 }}
              ></i>
            </div>
          )}

          {/* Status Badge - Overlay on Image */}
          <div
            className="position-absolute"
            style={{ top: "12px", right: "12px" }}
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

        {/* Product Content - Campaign Card Style */}
        <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
          {/* Top Meta Row - Campaign Card Style */}
          <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-12 mb-12">
            {/* SKU Badge */}
            <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
              <i className="ph-bold ph-barcode text-xs"></i>
              {product.sku || "N/A"}
            </span>

            {/* Stock Status - Campaign Card Style */}
            <div className="d-inline-flex align-items-center gap-6">
              <i
                className={`ph-bold ph-package text-sm ${stockColorClass}`}
              ></i>
              <span className={`text-xs fw-semibold ${stockColorClass}`}>
                {stockDisplay}
              </span>
            </div>
          </div>

          {/* Product Title - Campaign Card Style */}
          <h5
            className={`mb-12 fw-semibold line-height-1-3 text-md text-lg-lg ${
              product.status === "ACTIVE"
                ? "text-neutral-900"
                : "text-neutral-600"
            }`}
          >
            {product.name || "Ürün Adı Belirtilmemiş"}
          </h5>

          {/* Price Section - Active Orders Card Style (Amount Box) */}
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
            <p className="text-neutral-500 amount-label mb-4">Birim Fiyat</p>
            <div className="fw-bold text-main-600 amount-value">
              {formatPrice(product.basePrice, product.currency)}
            </div>
          </div>

          {/* Stock Status Card - Institution Card Style (Soft Card) */}
          <div className="soft-card rounded-16 mb-12">
            <div className="d-flex align-items-center gap-12 p-12">
              <div
                className={`status-icon ${stockIconBoxColor}`}
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
                <i className="ph-bold ph-package"></i>
              </div>
              <div className="status-info flex-grow-1">
                <span
                  className={`fw-bold ${stockColorClass} status-value`}
                  style={{ fontSize: "1rem" }}
                >
                  {stockDisplay}
                </span>
                <span
                  className="text-neutral-600 status-text"
                  style={{ fontSize: "0.75rem", marginLeft: "6px" }}
                >
                  Stok Durumu
                </span>
              </div>
            </div>
          </div>

          {/* Detail Button */}
          <div className="d-flex align-items-center justify-content-end gap-12 mb-12">
            <Button
              variant="outline"
              size="xs"
              rightIcon="ph-bold ph-eye"
              onClick={() => {
                if (product.id) {
                  router.push(`/supply/company/products/detail/${product.id}`);
                }
              }}
            >
              Detay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
