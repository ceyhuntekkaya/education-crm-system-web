import React from "react";
import { AddToFavorite } from "@/app/(protected)/supply/company/_shared";
import { formatCurrency } from "../utils";
import { useProductDetail } from "../context";
import ProductAddToFavoriteSection from "./product-add-to-favorite-section";

export const ProductInfoSection: React.FC = () => {
  const {
    product,
    supplier,
    productId,
    statusInfo,
    stockInfo,
    priceWithTax,
    isLowStock,
    isOutOfStock,
  } = useProductDetail();

  if (!product) return null;

  return (
    <div className="col-6">
      <div className="product-detail-page__info-section">
        {/* Ürün Başlığı ve Durum */}
        <div className="product-detail-page__title-section">
          <div className="product-detail-page__favorite-wrapper">
            <ProductAddToFavoriteSection />
          </div>

          <div className="product-detail-page__badges">
            <span
              className={`product-detail-page__status-badge ${statusInfo.badgeClass}`}
            >
              {statusInfo.label}
            </span>
            {product.categoryName && (
              <span className="product-detail-page__category-badge">
                {product.categoryName}
              </span>
            )}
            {product.sku && (
              <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
                <i className="ph-bold ph-barcode text-xs"></i>
                {product.sku}
              </span>
            )}
          </div>
          <h1 className="product-detail-page__title">
            {product.name || "Ürün Adı"}
          </h1>
          {product.description && (
            <p
              className="text-sm text-neutral-600 line-height-1-5"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.description}
            </p>
          )}
        </div>

        {/* Fiyat Bilgisi */}
        {product.basePrice !== undefined && (
          <div className="product-detail-page__price-section">
            <div className="product-detail-page__price-container">
              <div className="product-detail-page__price-item">
                <p className="product-detail-page__price-label">
                  Birim Fiyat (KDV Hariç)
                </p>
                <p className="product-detail-page__price-value product-detail-page__price-value--base">
                  {formatCurrency(product.basePrice, product.currency)}
                </p>
              </div>
              {priceWithTax !== undefined && (
                <div className="product-detail-page__price-item">
                  <p className="product-detail-page__price-label">
                    Birim Fiyat (KDV Dahil)
                  </p>
                  <p className="product-detail-page__price-value product-detail-page__price-value--with-tax">
                    {formatCurrency(priceWithTax, product.currency)}
                  </p>
                </div>
              )}
              {product.taxRate !== undefined && (
                <div className="product-detail-page__price-item">
                  <p className="product-detail-page__price-label">KDV Oranı</p>
                  <p className="product-detail-page__price-value product-detail-page__price-value--tax">
                    %{product.taxRate}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stok Bilgisi */}
        <div className="soft-card rounded-16 mb-16">
          <div className="d-flex align-items-center gap-12 p-12">
            <div
              className={`status-icon ${stockInfo.iconBoxClass}`}
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
                className={`fw-bold ${stockInfo.colorClass} status-value`}
                style={{ fontSize: "1rem" }}
              >
                {stockInfo.label}
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

        {/* Low Stock Warning */}
        {isLowStock && !isOutOfStock && (
          <div className="mb-16">
            <div className="d-flex align-items-center gap-8 bg-warning-50 px-12 py-8 rounded-8">
              <i className="ph-fill ph-warning text-warning-600"></i>
              <span className="text-xs text-warning-700 fw-medium">
                Stok minimum seviyede!
                {product.minStockLevel !== undefined &&
                  ` (Min: ${product.minStockLevel} adet)`}
              </span>
            </div>
          </div>
        )}

        {/* Meta Container */}
        <div className="meta-container soft-card rounded-16 mb-16">
          {product.categoryName && (
            <>
              <div className="meta-item">
                <div className="meta-content">
                  <p className="meta-label">Kategori</p>
                  <div className="meta-value-wrapper">
                    <div className="meta-icon-wrapper">
                      <div className="meta-icon bg-primary-100 text-primary-700">
                        <i className="ph-bold ph-folder-open"></i>
                      </div>
                    </div>
                    <span className="meta-value">{product.categoryName}</span>
                  </div>
                </div>
              </div>
              {supplier && <div className="meta-item-divider"></div>}
            </>
          )}

          {supplier && (
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
                    {product.supplierCompanyName ||
                      supplier.companyName ||
                      "Belirtilmemiş"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Teslimat ve Minimum Sipariş */}
        {(product.deliveryDays !== undefined ||
          product.minOrderQuantity !== undefined) && (
          <div className="d-flex flex-column gap-12 mb-16">
            {product.deliveryDays !== undefined && (
              <div className="d-flex align-items-center gap-6">
                <i className="ph-bold ph-clock text-neutral-400 text-sm"></i>
                <span className="text-xs text-neutral-500 fw-medium">
                  Teslimat: {product.deliveryDays} Gün
                </span>
              </div>
            )}
            {product.minOrderQuantity !== undefined && (
              <div className="d-flex align-items-center gap-6">
                <i className="ph-bold ph-shopping-cart text-neutral-400 text-sm"></i>
                <span className="text-xs text-neutral-500 fw-medium">
                  Minimum Sipariş: {product.minOrderQuantity} Adet
                </span>
              </div>
            )}
          </div>
        )}

        {/* Aksiyon Butonları */}
        <div className="product-detail-page__action-cards">
          <div
            className="product-detail-page__action-card product-detail-page__action-card--message"
            onClick={() => {
              console.log("Tedarikçiye mesaj gönder:", supplier?.id);
            }}
          >
            <div className="product-detail-page__action-card-icon">
              <i className="ph-bold ph-chat-circle-dots"></i>
            </div>
            <div className="product-detail-page__action-card-content">
              <p className="product-detail-page__action-card-label">
                Tedarikçiye Mesaj Gönder
              </p>
              <p className="product-detail-page__action-card-description">
                Hızlı iletişim için
              </p>
            </div>
            <i className="ph-bold ph-arrow-right product-detail-page__action-card-arrow"></i>
          </div>

          <div
            className="product-detail-page__action-card product-detail-page__action-card--quote"
            onClick={() => {
              console.log("Teklif iste:", productId);
            }}
          >
            <div className="product-detail-page__action-card-icon">
              <i className="ph-bold ph-file-text"></i>
            </div>
            <div className="product-detail-page__action-card-content">
              <p className="product-detail-page__action-card-label">
                Teklif İste
              </p>
              <p className="product-detail-page__action-card-description">
                Özel fiyat teklifi al
              </p>
            </div>
            <i className="ph-bold ph-arrow-right product-detail-page__action-card-arrow"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
