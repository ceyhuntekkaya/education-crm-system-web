"use client";

import React from "react";
import { CustomImage, Icon } from "@/components/ui";
import { AddToFavorite } from "../../../../../../_shared";
import { useProductDetail } from "../../context";

export const ProductFooter: React.FC = () => {
  const { product, productId, supplier } = useProductDetail();
  const supplierId = supplier?.id;
  // Ürün yoksa footer'ı gösterme
  if (!product) return null;

  const handleSendMessage = () => {
    // TODO: Tedarikçiye mesaj gönderme işlemi
    console.log("Tedarikçiye mesaj gönder:", supplierId);
  };

  const handleRequestQuote = () => {
    // TODO: Teklif iste işlemi
    console.log("Teklif iste:", productId);
  };

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
            <AddToFavorite productId={productId} size="sm" />

            {/* Send Message Button */}
            {supplierId && (
              <Icon
                icon="ph-bold ph-chat-circle"
                variant="inline"
                size="sm"
                onClick={handleSendMessage}
                hoverText="Mesaj Gönder"
                aria-label="Tedarikçiye Mesaj Gönder"
                className="d-none d-md-flex"
              />
            )}

            {/* Request Quote Button */}
            <Icon
              icon="ph-bold ph-file-text"
              variant="inline"
              size="sm"
              onClick={handleRequestQuote}
              hoverText="Teklif İste"
              aria-label="Teklif İste"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFooter;
