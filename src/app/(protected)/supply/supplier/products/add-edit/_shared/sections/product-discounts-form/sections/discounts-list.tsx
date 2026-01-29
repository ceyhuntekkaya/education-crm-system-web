"use client";

import React, { useState } from "react";
import { Badge, Button } from "@/components/ui";
import { discountTypeOptions } from "../../../utils";
import { useProductAddEdit } from "../../../context";
import { useProductsContext } from "../../../../../_shared/contexts";

interface DiscountsListProps {
  editingDiscountId: number | null;
  onEdit: (discount: any) => void;
  onDelete: (discountId: number) => void;
  onAddNew?: () => void;
}

/**
 * Product Discounts List component
 */
export const DiscountsList: React.FC<DiscountsListProps> = ({
  editingDiscountId,
  onEdit,
  onDelete,
  onAddNew,
}) => {
  // Context'lerden veri al
  const { deleteDiscountLoading, editDiscountLoading } = useProductAddEdit();
  const {
    currentProductDiscounts: discounts,
    currentProductDiscountsLoading: discountsLoading,
  } = useProductsContext();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  if (discountsLoading) {
    return (
      <div>
        <div className="text-center py-48">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="text-neutral-600 mt-16 mb-0">
            İndirimler yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  if (!discounts || !Array.isArray(discounts) || discounts.length === 0) {
    return (
      <div>
        <div className="text-center py-48">
          <div
            className="d-inline-flex align-items-center justify-content-center bg-neutral-100 rounded-circle mb-16"
            style={{ width: "64px", height: "64px" }}
          >
            <i
              className="ph ph-tag text-neutral-400"
              style={{ fontSize: "32px" }}
            ></i>
          </div>
          <h6 className="mb-8 fw-medium">Henüz indirim eklenmemiş</h6>
          <p className="text-neutral-600 mb-0 text-sm">
            Ürününüz için indirim tanımlayarak başlayın
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-20">
        <div>
          <h5 className="mb-4 fw-semibold">Mevcut İndirimler</h5>
          <p className="text-neutral-600 mb-0 text-sm">
            {discounts.length} indirim mevcut
          </p>
        </div>
        {onAddNew && (
          <Button
            variant="inline"
            size="sm"
            onClick={onAddNew}
            leftIcon="ph-plus"
          >
            Yeni İndirim Ekle
          </Button>
        )}
      </div>

      <div className="row g-3">
        {discounts.map((discount: any) => (
          <div key={discount.id} className="col-xl-4 col-md-6 col-12">
            <div
              className={`bg-white rounded-12 box-shadow-sm overflow-hidden position-relative transition-all h-100 ${
                editingDiscountId === discount.id
                  ? "border border-2 border-primary"
                  : "border border-neutral-30"
              }`}
            >
              {/* Status Indicator Bar */}
              <div
                className="position-absolute top-0 bottom-0 start-0"
                style={{
                  width: "4px",
                  backgroundColor: discount.isActive
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
                    onClick={() => onEdit(discount)}
                    disabled={deleteDiscountLoading || editDiscountLoading}
                    className="d-inline-flex align-items-center justify-content-center rounded-8 border-0"
                    style={{
                      width: "32px",
                      height: "32px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      cursor:
                        deleteDiscountLoading || editDiscountLoading
                          ? "not-allowed"
                          : "pointer",
                      transition: "all 0.2s ease",
                      opacity:
                        deleteDiscountLoading || editDiscountLoading ? 0.6 : 1,
                      backgroundColor:
                        hoveredButton === `edit-${discount.id}`
                          ? "var(--bs-primary)"
                          : "white",
                      transform:
                        hoveredButton === `edit-${discount.id}`
                          ? "scale(1.1)"
                          : "scale(1)",
                    }}
                    onMouseEnter={() => {
                      if (!deleteDiscountLoading && !editDiscountLoading) {
                        setHoveredButton(`edit-${discount.id}`);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredButton(null);
                    }}
                    title="Düzenle"
                  >
                    <i
                      className="ph ph-pencil-simple"
                      style={{
                        fontSize: "16px",
                        color:
                          hoveredButton === `edit-${discount.id}`
                            ? "white"
                            : "var(--bs-primary)",
                        transition: "color 0.2s ease",
                      }}
                    ></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(discount.id)}
                    disabled={deleteDiscountLoading}
                    className="d-inline-flex align-items-center justify-content-center rounded-8 border-0"
                    style={{
                      width: "32px",
                      height: "32px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      cursor: deleteDiscountLoading ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      opacity: deleteDiscountLoading ? 0.6 : 1,
                      backgroundColor:
                        hoveredButton === `delete-${discount.id}`
                          ? "var(--bs-danger)"
                          : "white",
                      transform:
                        hoveredButton === `delete-${discount.id}`
                          ? "scale(1.1)"
                          : "scale(1)",
                    }}
                    onMouseEnter={() => {
                      if (!deleteDiscountLoading) {
                        setHoveredButton(`delete-${discount.id}`);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredButton(null);
                    }}
                    title="Sil"
                  >
                    {deleteDiscountLoading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <i
                        className="ph ph-trash"
                        style={{
                          fontSize: "16px",
                          color:
                            hoveredButton === `delete-${discount.id}`
                              ? "white"
                              : "var(--bs-danger)",
                          transition: "color 0.2s ease",
                        }}
                      ></i>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-16 ps-20 d-flex flex-column h-100">
                {/* Header */}
                <div className="d-flex align-items-start gap-10 mb-12">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-8 bg-primary-25"
                    style={{ width: "40px", height: "40px", flexShrink: 0 }}
                  >
                    <i
                      className="ph ph-tag text-primary"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </div>
                  <div className="flex-fill">
                    <h6
                      className="mb-2 fw-semibold text-neutral-900 text-truncate"
                      title={discount.discountName}
                      style={{ fontSize: "14px" }}
                    >
                      {discount.discountName}
                    </h6>
                    <Badge
                      variant="secondary"
                      className="fw-normal text-neutral-600 bg-neutral-100 border-0"
                      size="sm"
                    >
                      {discountTypeOptions.find(
                        (opt) => opt.value === discount.discountType,
                      )?.label || discount.discountType}
                    </Badge>
                  </div>
                  <div className="text-end flex-shrink-0">
                    <span
                      className="h5 mb-0 text-primary fw-bold d-block"
                      style={{ fontSize: "20px" }}
                    >
                      {discount.discountValue
                        ? discount.discountType === "PERCENTAGE"
                          ? `%${discount.discountValue}`
                          : `${discount.discountValue} ₺`
                        : "-"}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-top border-neutral-30 my-12" />

                {/* Details */}
                <div className="d-flex flex-column gap-8 flex-fill">
                  {/* Dates */}
                  {discount.startDate || discount.endDate ? (
                    <div className="d-flex align-items-center gap-8 text-neutral-600">
                      <i
                        className="ph ph-calendar-blank text-neutral-400"
                        style={{ fontSize: "14px" }}
                      ></i>
                      <span className="text-xs text-neutral-700 text-truncate">
                        {discount.startDate
                          ? new Date(discount.startDate).toLocaleDateString(
                              "tr-TR",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "Süresiz"}
                        {discount.endDate &&
                          ` - ${new Date(discount.endDate).toLocaleDateString(
                            "tr-TR",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}`}
                      </span>
                    </div>
                  ) : null}

                  {/* Quantity */}
                  {(discount.minQuantity || discount.maxQuantity) && (
                    <div className="d-flex align-items-center gap-8 text-neutral-600">
                      <i
                        className="ph ph-package text-neutral-400"
                        style={{ fontSize: "14px" }}
                      ></i>
                      <span className="text-xs text-neutral-700">
                        {discount.minQuantity || 0} -{" "}
                        {discount.maxQuantity || "∞"} Adet
                      </span>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="mt-auto">
                    <Badge
                      variant={discount.isActive ? "success" : "secondary"}
                      className="fw-normal"
                      size="sm"
                    >
                      {discount.isActive ? "Aktif" : "Pasif"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
