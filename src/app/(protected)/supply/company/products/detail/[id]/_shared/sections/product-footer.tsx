"use client";

import React from "react";
import { CustomImage, Icon } from "@/components/ui";
import { ProductAddToFavoriteSection } from "./product-add-to-favorite-section";
import { useProductDetail } from "../context";
import { SendSupplierMessageSection } from "./send-supplier-message-section";
import { RequestQuoteSection } from "./request-quote-section";

export const ProductFooter: React.FC = () => {
  const { product, productId, supplier } = useProductDetail();
  // Ürün yoksa footer'ı gösterme
  if (!product) return null;

  return (
    <div className="product-detail-footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Product Image & Name */}
          <div className="product-info">
            {/* Product Image */}
            <div className="product-image-wrapper">
              <CustomImage
                src={product.mainImageUrl}
                alt={product.name || "Ürün"}
                width={32}
                height={32}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Product Name & Price */}
            <div className="product-details">
              <h6 className="product-name" title={product.name || "Ürün Adı"}>
                {product.name || "Ürün Adı"}
              </h6>
              {product.basePrice !== undefined && (
                <p className="product-price">
                  {product.basePrice.toFixed(2)} {product.currency || "TRY"}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="footer-actions">
            {/* Add to Favorite */}
            <ProductAddToFavoriteSection />

            {/* Send Message Button */}
            <SendSupplierMessageSection
              variant="icon"
              className="d-none d-md-flex"
            />

            {/* Request Quote Button */}
            <RequestQuoteSection variant="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFooter;
