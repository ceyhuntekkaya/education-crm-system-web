"use client";

import React from "react";
import { ProductDetailProvider } from "./_shared";
import { validateProductId } from "./_shared/utils";

interface ProductDetailLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

/**
 * Product detail sayfaları için layout
 * Context provider ve ID validasyonu sağlar
 */
const ProductDetailLayout: React.FC<ProductDetailLayoutProps> = ({
  children,
  params,
}) => {
  // URL'den gelen ID'yi kontrol et
  const productId = validateProductId(params.id);

  // ID yoksa veya geçersizse bile devam et, CustomCard içinde empty state gösterilecek
  return (
    <ProductDetailProvider productId={productId ?? 0}>
      {children}
    </ProductDetailProvider>
  );
};

export default ProductDetailLayout;
