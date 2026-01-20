import React from "react";
import { useProductsContext } from "../../../../../../../../_shared/contexts";

export const LightboxInfoSection: React.FC = () => {
  const { currentProduct: product } = useProductsContext();

  if (!product) return null;

  return (
    <div className="product-detail-page__lightbox-info">
      <h3 className="product-detail-page__lightbox-title">{product.name}</h3>
      {product.sku && (
        <p className="product-detail-page__lightbox-sku">SKU: {product.sku}</p>
      )}
    </div>
  );
};
