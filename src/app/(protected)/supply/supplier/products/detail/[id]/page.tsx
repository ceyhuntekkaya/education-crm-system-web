"use client";

import React from "react";
import {
  useProductDetail,
  ProductImageSection,
  ProductInfoSection,
  ProductTabsSection,
  ProductLoadingState,
  ProductErrorState,
  ProductEmptyState,
  ProductDetailHeader,
  ProductDiscountSection,
  ProductVariantsSection,
} from "./_shared";
import { useProductsContext } from "../../_shared/contexts";
import { usePageTitle } from "@/hooks";

const ProductDetailPage: React.FC = () => {
  usePageTitle("Ürün Detayı");

  const {
    currentProduct: product,
    currentProductLoading: isLoading,
    currentProductError: error,
  } = useProductsContext();

  const { hasValidId } = useProductDetail();

  if (isLoading && hasValidId) {
    return <ProductLoadingState />;
  }

  if (error && hasValidId) {
    return <ProductErrorState error={error} />;
  }

  if (!product && !isLoading && !error && hasValidId) {
    return <ProductEmptyState />;
  }

  if (!product) return null;

  return (
    <div className="product-detail-page">
      <div className="product-detail-page__container">
        <ProductDetailHeader />

        <div className="product-detail-page__main-section">
          <div className="row gx-5">
            <div className="col-6">
              <ProductImageSection />
            </div>

            <div className="col-6">
              <ProductInfoSection />
            </div>
          </div>
        </div>

        <ProductDiscountSection />

        <ProductVariantsSection productId={product.id!} />

        <ProductTabsSection />
      </div>
    </div>
  );
};

export default ProductDetailPage;
