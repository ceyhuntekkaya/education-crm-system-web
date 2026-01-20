"use client";

import React, { useState } from "react";
import { Badge, Button } from "@/components/ui";
import { useProductAddEdit } from "../../../context";
import { useProductsContext } from "../../../../../_shared/contexts";

interface VariantsListProps {
  editingVariantId: number | null;
  onEdit: (variant: any) => void;
  onDelete: (variantId: number) => void;
  onAddNew?: () => void;
}

/**
 * Product Variants List component
 */
export const VariantsList: React.FC<VariantsListProps> = ({
  editingVariantId,
  onEdit,
  onDelete,
  onAddNew,
}) => {
  // Context'lerden veri al
  const { deleteVariantLoading, editVariantLoading } = useProductAddEdit();
  const {
    currentProductVariants: variants,
    currentProductVariantsLoading: variantsLoading,
  } = useProductsContext();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  if (variantsLoading) {
    return (
      <div>
        <div className="text-center py-48">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="text-neutral-600 mt-16 mb-0">
            Varyantlar yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  if (!variants || !Array.isArray(variants) || variants.length === 0) {
    return (
      <div>
        <div className="text-center py-48">
          <div
            className="d-inline-flex align-items-center justify-content-center bg-neutral-100 rounded-circle mb-16"
            style={{ width: "64px", height: "64px" }}
          >
            <i
              className="ph ph-package text-neutral-400"
              style={{ fontSize: "32px" }}
            ></i>
          </div>
          <h6 className="mb-8 fw-medium">Henüz varyant eklenmemiş</h6>
          <p className="text-neutral-600 mb-0 text-sm">
            Ürününüz için varyant tanımlayarak başlayın
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-20">
        <div>
          <h5 className="mb-4 fw-semibold">Mevcut Varyantlar</h5>
          <p className="text-neutral-600 mb-0 text-sm">
            {variants.length} varyant mevcut
          </p>
        </div>
        {onAddNew && (
          <Button
            variant="inline"
            size="sm"
            onClick={onAddNew}
            leftIcon="ph-plus"
          >
            Yeni Varyant Ekle
          </Button>
        )}
      </div>

      <div className="row g-3">
        {variants.map((variant: any) => (
          <div key={variant.id} className="col-xl-4 col-md-6 col-12">
            <div
              className={`bg-white rounded-12 box-shadow-sm overflow-hidden position-relative transition-all h-100 ${
                editingVariantId === variant.id
                  ? "border border-2 border-primary"
                  : "border border-neutral-30"
              }`}
            >
              {/* Status Indicator Bar */}
              <div
                className="position-absolute top-0 bottom-0 start-0"
                style={{
                  width: "4px",
                  backgroundColor: variant.isActive
                    ? "var(--bs-success)"
                    : "var(--bs-gray-400)",
                }}
              />

              {/* Action Buttons - Bottom Right */}
              <div
                className="position-absolute"
                style={{
                  bottom: "12px",
                  right: "12px",
                  zIndex: 2,
                }}
              >
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(variant)}
                    disabled={deleteVariantLoading || editVariantLoading}
                    className="d-inline-flex align-items-center justify-content-center rounded-8 border-0"
                    style={{
                      width: "32px",
                      height: "32px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      cursor:
                        deleteVariantLoading || editVariantLoading
                          ? "not-allowed"
                          : "pointer",
                      transition: "all 0.2s ease",
                      opacity:
                        deleteVariantLoading || editVariantLoading ? 0.6 : 1,
                      backgroundColor:
                        hoveredButton === `edit-${variant.id}`
                          ? "var(--bs-primary)"
                          : "white",
                      transform:
                        hoveredButton === `edit-${variant.id}`
                          ? "scale(1.1)"
                          : "scale(1)",
                    }}
                    onMouseEnter={() => {
                      if (!deleteVariantLoading && !editVariantLoading) {
                        setHoveredButton(`edit-${variant.id}`);
                      }
                    }}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <i
                      className="ph ph-pencil-simple"
                      style={{
                        fontSize: "16px",
                        color:
                          hoveredButton === `edit-${variant.id}`
                            ? "white"
                            : "var(--bs-primary)",
                      }}
                    ></i>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(variant.id)}
                    disabled={deleteVariantLoading || editVariantLoading}
                    className="d-inline-flex align-items-center justify-content-center rounded-8 border-0"
                    style={{
                      width: "32px",
                      height: "32px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      cursor:
                        deleteVariantLoading || editVariantLoading
                          ? "not-allowed"
                          : "pointer",
                      transition: "all 0.2s ease",
                      opacity:
                        deleteVariantLoading || editVariantLoading ? 0.6 : 1,
                      backgroundColor:
                        hoveredButton === `delete-${variant.id}`
                          ? "var(--bs-danger)"
                          : "white",
                      transform:
                        hoveredButton === `delete-${variant.id}`
                          ? "scale(1.1)"
                          : "scale(1)",
                    }}
                    onMouseEnter={() => {
                      if (!deleteVariantLoading && !editVariantLoading) {
                        setHoveredButton(`delete-${variant.id}`);
                      }
                    }}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <i
                      className="ph ph-trash"
                      style={{
                        fontSize: "16px",
                        color:
                          hoveredButton === `delete-${variant.id}`
                            ? "white"
                            : "var(--bs-danger)",
                      }}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-20" style={{ paddingLeft: "28px" }}>
                {/* Header with Status Badge */}
                <div className="d-flex align-items-start justify-content-between mb-16">
                  <div className="flex-grow-1" style={{ marginRight: "60px" }}>
                    <h6 className="mb-4 fw-semibold text-dark">
                      {variant.variantName}
                    </h6>
                    {variant.sku && (
                      <p className="text-neutral-600 mb-0 text-xs">
                        SKU: {variant.sku}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant={variant.isActive ? "success" : "secondary"}
                    size="sm"
                  >
                    {variant.isActive ? "Aktif" : "Pasif"}
                  </Badge>
                </div>

                {/* Variant Details */}
                <div className="d-flex flex-column gap-8 mb-12">
                  {/* Price Adjustment */}
                  {variant.priceAdjustment !== undefined &&
                    variant.priceAdjustment !== null && (
                      <div className="d-flex align-items-center gap-8">
                        <i
                          className="ph ph-currency-circle-dollar text-neutral-500"
                          style={{ fontSize: "16px" }}
                        ></i>
                        <span className="text-neutral-700 text-sm">
                          Fiyat Farkı:{" "}
                          <span className="fw-medium">
                            {variant.priceAdjustment > 0 ? "+" : ""}
                            {variant.priceAdjustment.toFixed(2)} ₺
                          </span>
                        </span>
                      </div>
                    )}

                  {/* Stock Quantity */}
                  {variant.stockQuantity !== undefined &&
                    variant.stockQuantity !== null && (
                      <div className="d-flex align-items-center gap-8">
                        <i
                          className="ph ph-package text-neutral-500"
                          style={{ fontSize: "16px" }}
                        ></i>
                        <span className="text-neutral-700 text-sm">
                          Stok:{" "}
                          <span className="fw-medium">
                            {variant.stockQuantity} adet
                          </span>
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
