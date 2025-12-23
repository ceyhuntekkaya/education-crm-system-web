import React from "react";
import Image from "next/image";
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

  return (
    <div className="col-12">
      <div className="card border border-neutral-30 rounded-12 p-24 hover-shadow-lg transition">
        <div className="row align-items-center">
          <div className="col-lg-2">
            <div className="rounded-8 overflow-hidden bg-neutral-50 position-relative">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name || "Ürün"}
                  width={200}
                  height={200}
                  className="w-100 h-100 object-fit-cover"
                  style={{ aspectRatio: "1/1" }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-neutral-100"
                  style={{ aspectRatio: "1/1" }}
                >
                  <i className="ph-duotone ph-package text-neutral-400 text-64"></i>
                </div>
              )}
              {/* Stok uyarı badge */}
              {isOutOfStock && (
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.9)" }}
                >
                  <span className="text-white fw-bold">Stokta Yok</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-10">
            <div className="ps-lg-24">
              <div className="d-flex justify-content-between align-items-start mb-12">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 mb-8">
                    <h5 className="mb-0">{product.name}</h5>
                    {isLowStock && !isOutOfStock && (
                      <span className="badge bg-warning-50 text-warning-600 text-xs">
                        <i className="ph-fill ph-warning-circle me-1"></i>
                        Düşük Stok
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-500 text-sm mb-8">
                    <span className="fw-medium">SKU:</span>{" "}
                    {product.sku || "N/A"}
                  </p>
                  <p className="text-neutral-600 mb-0">
                    {product.description || "Açıklama yok"}
                  </p>
                </div>
                <div className="text-end ms-3">
                  <div className="text-main-600 fw-semibold text-xl mb-8">
                    {product.unitPrice?.toFixed(2)} {product.currency || "TRY"}
                  </div>
                  {product.taxRate && (
                    <p className="text-neutral-500 text-xs mb-8">
                      (KDV: %{product.taxRate})
                    </p>
                  )}
                  <span
                    className={`badge text-sm fw-semibold ${
                      product.status === "ACTIVE"
                        ? "bg-success-50 text-success-600"
                        : product.status === "PASSIVE"
                        ? "bg-neutral-50 text-neutral-600"
                        : product.status === "OUT_OF_STOCK"
                        ? "bg-danger-50 text-danger-600"
                        : product.status === "DISCONTINUED"
                        ? "bg-warning-50 text-warning-600"
                        : "bg-neutral-50 text-neutral-600"
                    }`}
                  >
                    {product.status === "ACTIVE"
                      ? "Aktif"
                      : product.status === "PASSIVE"
                      ? "Pasif"
                      : product.status === "OUT_OF_STOCK"
                      ? "Stokta Yok"
                      : product.status === "DISCONTINUED"
                      ? "Üretimi Durduruldu"
                      : "Bilinmiyor"}
                  </span>
                </div>
              </div>

              {/* İki satırlı bilgi kartları */}
              <div className="row g-3 mt-2">
                <div className="col-md-3">
                  <div className="d-flex align-items-center gap-2">
                    <i className="ph ph-folder-open text-neutral-500"></i>
                    <div>
                      <p className="text-neutral-500 text-xs mb-0">Kategori</p>
                      <span className="text-sm text-neutral-700 fw-medium">
                        {product.categoryName || "Belirtilmemiş"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center gap-2">
                    <i className="ph ph-truck text-neutral-500"></i>
                    <div>
                      <p className="text-neutral-500 text-xs mb-0">Tedarikçi</p>
                      <span className="text-sm text-neutral-700 fw-medium">
                        {product.supplierName || "Belirtilmemiş"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center gap-2">
                    <i
                      className={`ph ph-package ${
                        isLowStock
                          ? "text-warning-600"
                          : isOutOfStock
                          ? "text-danger-600"
                          : "text-neutral-500"
                      }`}
                    ></i>
                    <div>
                      <p className="text-neutral-500 text-xs mb-0">
                        Stok Durumu
                      </p>
                      <span
                        className={`text-sm fw-medium ${
                          isLowStock
                            ? "text-warning-600"
                            : isOutOfStock
                            ? "text-danger-600"
                            : "text-success-600"
                        }`}
                      >
                        {product.stockTrackingType === "UNLIMITED"
                          ? "Sınırsız"
                          : product.currentStock !== undefined
                          ? `${product.currentStock} Adet`
                          : "Belirtilmemiş"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex align-items-center gap-2">
                    <i className="ph ph-clock text-neutral-500"></i>
                    <div>
                      <p className="text-neutral-500 text-xs mb-0">
                        Teslimat Süresi
                      </p>
                      <span className="text-sm text-neutral-700 fw-medium">
                        {product.deliveryDays
                          ? `${product.deliveryDays} Gün`
                          : "Belirtilmemiş"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Min. stok seviyesi uyarısı */}
              {isLowStock && (
                <div className="alert alert-warning mt-12 mb-0 py-8 px-12 d-flex align-items-center gap-2">
                  <i className="ph-fill ph-warning text-warning-600"></i>
                  <span className="text-sm">
                    Stok minimum seviyede! (Min: {product.minStockLevel} adet)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
