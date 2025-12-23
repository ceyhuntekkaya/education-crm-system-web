import React from "react";
import { CustomImage } from "@/components/ui";
import { ProductResultDto } from "../../types";

interface ProductCardProps {
  product: ProductResultDto;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Stok durumu kontrolü
  const isLowStock =
    product.currentStock !== undefined &&
    product.minStockLevel !== undefined &&
    product.currentStock <= product.minStockLevel &&
    product.currentStock > 0;

  const isOutOfStock =
    product.status === "OUT_OF_STOCK" ||
    (product.currentStock !== undefined && product.currentStock === 0);

  // Status badge helper
  const getStatusConfig = () => {
    switch (product.status) {
      case "ACTIVE":
        return {
          text: "Aktif",
          bgClass: "bg-success-600",
          textClass: "text-white",
        };
      case "PASSIVE":
        return {
          text: "Pasif",
          bgClass: "bg-neutral-600",
          textClass: "text-white",
        };
      case "OUT_OF_STOCK":
        return {
          text: "Stokta Yok",
          bgClass: "bg-danger-600",
          textClass: "text-white",
        };
      case "DISCONTINUED":
        return {
          text: "Üretimi Durduruldu",
          bgClass: "bg-warning-600",
          textClass: "text-white",
        };
      default:
        return {
          text: "Bilinmiyor",
          bgClass: "bg-neutral-600",
          textClass: "text-white",
        };
    }
  };

  const statusConfig = getStatusConfig();

  // Stock display helper
  const getStockDisplay = () => {
    if (product.stockTrackingType === "UNLIMITED") {
      return "Sınırsız";
    }
    if (product.currentStock !== undefined) {
      return `${product.currentStock} Adet`;
    }
    return "Belirtilmemiş";
  };

  // Stock color helper
  const getStockColorClass = () => {
    if (isOutOfStock) return "text-danger-600";
    if (isLowStock) return "text-warning-600";
    return "text-success-600";
  };

  // Stock icon box color helper
  const getStockIconBoxColor = () => {
    if (isOutOfStock) return "bg-danger-100 text-danger-700";
    if (isLowStock) return "bg-warning-100 text-warning-700";
    return "bg-success-100 text-success-700";
  };

  console.log("products ", product);

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div
        className={`bg-white rounded-16 h-100 overflow-hidden transition-all d-flex flex-column ${
          !product.status || product.status === "PASSIVE" ? "opacity-70" : ""
        }`}
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          border: "1px solid hsl(var(--neutral-30))",
        }}
      >
        {/* Product Image - Campaign Card Style */}
        <div
          className="position-relative overflow-hidden"
          style={{ height: "200px" }}
        >
          {product.mainImageUrl ? (
            <CustomImage
              src={product.mainImageUrl}
              alt={product.name || "Ürün"}
              width={400}
              height={200}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-main-25">
              <i
                className="ph-duotone ph-package text-main-600"
                style={{ fontSize: "48px", opacity: 0.2 }}
              ></i>
            </div>
          )}

          {/* Low Stock Badge - Overlay on Image */}
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
                className={`ph-bold ph-package text-sm ${getStockColorClass()}`}
              ></i>
              <span className={`text-xs fw-semibold ${getStockColorClass()}`}>
                {getStockDisplay()}
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
            {product.name}
          </h5>

          {/* Product Description - Campaign Card Style */}
          <p
            className={`text-sm mb-16 line-height-1-5 ${
              product.status === "ACTIVE"
                ? "text-neutral-600"
                : "text-neutral-500"
            }`}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.description || "Açıklama yok"}
          </p>

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
              {product.unitPrice?.toFixed(2)} {product.currency || "TRY"}
            </div>
            {product.taxRate && (
              <p className="text-neutral-500 text-xs mb-0 mt-2">
                KDV: %{product.taxRate}
              </p>
            )}
          </div>

          {/* Meta Container - Active Orders Card Style */}
          <div className="meta-container soft-card rounded-16 mb-12">
            {/* Category */}
            <div className="meta-item">
              <div className="meta-content">
                <p className="meta-label">Kategori</p>
                <div className="meta-value-wrapper">
                  <div className="meta-icon-wrapper">
                    <div className="meta-icon bg-primary-100 text-primary-700">
                      <i className="ph-bold ph-folder-open"></i>
                    </div>
                  </div>
                  <span className="meta-value">
                    {product.categoryName || "Belirtilmemiş"}
                  </span>
                </div>
              </div>
            </div>

            <div className="meta-item-divider"></div>

            {/* Supplier */}
            <div className="meta-item">
              <div className="meta-content">
                <p className="meta-label">Tedarikçi</p>
                <div className="meta-value-wrapper">
                  <div className="meta-icon-wrapper">
                    <div className="meta-icon bg-primary-100 text-primary-700">
                      <i className="ph-bold ph-truck"></i>
                    </div>
                  </div>
                  <span className="meta-value">
                    {product.supplierName || "Belirtilmemiş"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Status Card - Institution Card Style (Soft Card) */}
          <div className="soft-card rounded-16 mb-12">
            <div className="d-flex align-items-center gap-12 p-12">
              <div
                className={`status-icon ${getStockIconBoxColor()}`}
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
                  className={`fw-bold ${getStockColorClass()} status-value`}
                  style={{ fontSize: "1rem" }}
                >
                  {getStockDisplay()}
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

          {/* Delivery Days - If exists */}
          {product.deliveryDays && (
            <div className="d-flex align-items-center gap-6 mb-12">
              <i className="ph-bold ph-clock text-neutral-400 text-sm"></i>
              <span className="text-xs text-neutral-500 fw-medium">
                Teslimat: {product.deliveryDays} Gün
              </span>
            </div>
          )}

          {/* Low Stock Warning - Institution Card Style */}
          {isLowStock && !isOutOfStock && (
            <div className="mt-auto pt-12 border-top border-neutral-30">
              <div className="d-flex align-items-center gap-8 bg-warning-50 px-12 py-8 rounded-8">
                <i className="ph-fill ph-warning text-warning-600"></i>
                <span className="text-xs text-warning-700 fw-medium">
                  Stok minimum seviyede! (Min: {product.minStockLevel} adet)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
