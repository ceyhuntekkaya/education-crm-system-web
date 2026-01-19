import React, { useState } from "react";
import { Button } from "@/components/ui";
import { useProductVariants } from "../../hooks/api";
import {
  ProductVariantCard,
  LoadingSection,
  ErrorSection,
  EmptyStateSection,
} from "./sections";
import type { ProductVariantsSectionProps } from "../../types";

export const ProductVariantsSection: React.FC<ProductVariantsSectionProps> = ({
  productId,
  className = "",
}) => {
  const [showAll, setShowAll] = useState(false);

  const { variants = [], isLoading, error } = useProductVariants(productId);

  // Eğer varyant yoksa section'ı gösterme
  if (!isLoading && variants.length === 0) {
    return null;
  }

  const displayVariants = showAll ? variants : variants.slice(0, 3);
  const hasMoreVariants = variants.length > 3;

  return (
    <div className={`product-detail-page__variants-sections ${className}`}>
      {/* Header Section */}
      <section className="product-detail-page__variants-header-section">
        <div className="product-detail-page__variants-header">
          <div className="d-flex align-items-center gap-8">
            <i className="ph-bold ph-package text-lg text-main-600"></i>
            <h3 className="text-md fw-semibold text-neutral-900 mb-0">
              Ürün Varyantları
            </h3>
          </div>
          <span className="badge text-sm bg-main-50 text-main-600 radius-8 px-12 py-6">
            {variants.length} Varyant
          </span>
        </div>
      </section>

      {/* Loading Section */}
      {isLoading && <LoadingSection />}

      {/* Error Section */}
      {error && <ErrorSection />}

      {/* Variants Content Section */}
      {!isLoading && !error && variants.length > 0 && (
        <section className="product-detail-page__variants-content-section">
          <div className="product-detail-page__variants-grid">
            <div className="row g-3">
              {displayVariants.map((variant) => (
                <div key={variant.id} className="col-12 col-md-6 col-lg-4">
                  <ProductVariantCard variant={variant} showDetails={true} />
                </div>
              ))}
            </div>
          </div>

          {/* Show More Button */}
          {hasMoreVariants && (
            <div className="product-detail-page__variants-show-more">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="mt-3"
              >
                {showAll ? (
                  <>
                    <i className="ph-caret-up me-1"></i>
                    Daha Az Göster
                  </>
                ) : (
                  <>
                    <i className="ph-caret-down me-1"></i>
                    Tümünü Göster ({variants.length - 3} daha)
                  </>
                )}
              </Button>
            </div>
          )}
        </section>
      )}

      {/* Empty State Section */}
      {!isLoading && !error && variants.length === 0 && <EmptyStateSection />}
    </div>
  );
};
