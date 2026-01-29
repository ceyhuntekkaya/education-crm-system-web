"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { QuotationItemDto } from "@/types";
import { getItemCardSummary, formatPrice, getItemColor } from "../utils";

interface ItemCardProps {
  item: QuotationItemDto;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const router = useRouter();
  const summary = getItemCardSummary(item);
  const itemColor = getItemColor(summary.itemName);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const handleEdit = () => {
    if (item.quotationId && item.id) {
      router.push(
        `/supply/supplier/quotations/items/${item.quotationId}/add-edit/${item.id}`,
      );
    }
  };

  useEffect(() => {
    // Check if text is overflowing
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setShowExpandButton(isOverflowing);
    }
  }, [summary.specifications]);

  return (
    <div
      className="bg-white rounded-16 h-100 overflow-hidden transition-all d-flex flex-column"
      style={{
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        border: "1.5px solid hsl(var(--neutral-40))",
        position: "relative",
        zIndex: 1,
        minHeight: "320px",
      }}
    >
      {/* Item Header */}
      <div
        className="position-relative overflow-hidden"
        style={{ height: "140px" }}
      >
        <div
          className="w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: `linear-gradient(135deg, ${itemColor}15 0%, ${itemColor}30 100%)`,
          }}
        >
          <i
            className="ph-duotone ph-package"
            style={{
              fontSize: "56px",
              opacity: 0.4,
              color: itemColor,
            }}
          ></i>
        </div>

        {/* Unit Badge - Top Right */}
        <div
          className="position-absolute"
          style={{ top: "12px", right: "12px", zIndex: 2 }}
        >
          <span
            className="d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold bg-white"
            style={{
              color: itemColor,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <i className="ph-bold ph-tag" style={{ fontSize: "12px" }}></i>
            {summary.unit}
          </span>
        </div>

        {/* Item ID Badge */}
        {item.id && (
          <div
            className="position-absolute"
            style={{
              top: "12px",
              left: "12px",
              zIndex: 2,
            }}
          >
            <span className="d-inline-flex align-items-center px-10 py-6 rounded-8 text-xs fw-medium bg-white text-neutral-700">
              #{item.id}
            </span>
          </div>
        )}

        {/* Edit Button */}
        <div
          className="position-absolute"
          style={{
            bottom: "12px",
            right: "12px",
            zIndex: 2,
          }}
        >
          <button
            onClick={handleEdit}
            className="d-inline-flex align-items-center justify-content-center rounded-8 border-0"
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              color: itemColor,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = itemColor;
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.95)";
              e.currentTarget.style.color = itemColor;
              e.currentTarget.style.transform = "scale(1)";
            }}
            aria-label="Kalemi düzenle"
          >
            <i
              className="ph-bold ph-pencil-simple"
              style={{ fontSize: "16px" }}
            ></i>
          </button>
        </div>
      </div>

      {/* Item Content */}
      <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
        {/* Item Name */}
        <div className="mb-12">
          <h5 className="mb-0 fw-semibold line-height-1-3 text-md text-lg-lg text-neutral-900">
            {summary.itemName}
          </h5>
        </div>

        {/* Specifications */}
        <div
          style={{
            marginBottom: "16px",
          }}
        >
          <p
            ref={textRef}
            className="text-sm text-neutral-600 mb-0"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: isExpanded ? "unset" : 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "1.5",
              transition: "all 0.3s ease",
            }}
          >
            {summary.specifications}
          </p>
          {showExpandButton && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-10 d-inline-flex align-items-center gap-8 px-14 py-8 rounded-10 text-xs fw-medium border-0"
              style={{
                color: itemColor,
                backgroundColor: `${itemColor}10`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                border: `1px solid ${itemColor}20`,
                alignSelf: "flex-start",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${itemColor}20`;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.borderColor = `${itemColor}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${itemColor}10`;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 1px 3px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.borderColor = `${itemColor}20`;
              }}
            >
              <i
                className={`ph-bold ${
                  isExpanded ? "ph-caret-up" : "ph-caret-down"
                }`}
                style={{
                  fontSize: "13px",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isExpanded ? "rotate(0deg)" : "rotate(0deg)",
                }}
              ></i>
              <span style={{ letterSpacing: "0.01em" }}>
                {isExpanded ? "Daha Az Göster" : "Devamını Gör"}
              </span>
            </button>
          )}
        </div>

        {/* Price & Quantity Info Container */}
        <div
          className="rounded-12 mt-auto"
          style={{
            backgroundColor: "hsl(var(--neutral-25))",
            padding: "12px",
          }}
        >
          {/* Row 1: Miktar & Birim Fiyat */}
          <div className="d-flex justify-content-between gap-12 mb-10">
            {/* Quantity */}
            <div className="d-flex align-items-center gap-8 flex-1">
              <div
                className="d-flex align-items-center justify-content-center rounded-8"
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: itemColor,
                  flexShrink: 0,
                }}
              >
                <i
                  className="ph-bold ph-cube text-white"
                  style={{ fontSize: "14px" }}
                ></i>
              </div>
              <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                <span
                  className="text-neutral-500"
                  style={{ fontSize: "10px", lineHeight: 1.2 }}
                >
                  Miktar
                </span>
                <span
                  className="fw-semibold text-neutral-800"
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {summary.quantity}{" "}
                  {summary.unit !== "Birim Yok" && summary.unit}
                </span>
              </div>
            </div>

            {/* Unit Price */}
            <div className="d-flex align-items-center gap-8 flex-1">
              <div
                className="d-flex align-items-center justify-content-center rounded-8"
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "hsl(var(--success-600))",
                  flexShrink: 0,
                }}
              >
                <i
                  className="ph-bold ph-tag text-white"
                  style={{ fontSize: "14px" }}
                ></i>
              </div>
              <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                <span
                  className="text-neutral-500"
                  style={{ fontSize: "10px", lineHeight: 1.2 }}
                >
                  Birim Fiyat
                </span>
                <span
                  className="fw-semibold"
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.3,
                    color: "hsl(var(--success-600))",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatPrice(summary.unitPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: Toplam Fiyat & Teslimat */}
          <div
            className="d-flex justify-content-between align-items-center pt-10"
            style={{ borderTop: "1px solid hsl(var(--neutral-100))" }}
          >
            {/* Total Price */}
            <div className="d-flex align-items-center gap-8">
              <div
                className="d-flex align-items-center justify-content-center rounded-8"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: itemColor,
                  flexShrink: 0,
                }}
              >
                <i
                  className="ph-bold ph-coins text-white"
                  style={{ fontSize: "16px" }}
                ></i>
              </div>
              <div className="d-flex flex-column">
                <span
                  className="text-neutral-500"
                  style={{ fontSize: "10px", lineHeight: 1.2 }}
                >
                  Toplam
                </span>
                <span
                  className="fw-bold"
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.3,
                    color: itemColor,
                  }}
                >
                  {formatPrice(summary.totalPrice)}
                </span>
              </div>
            </div>

            {/* Delivery Days */}
            {summary.deliveryDays > 0 && (
              <div
                className="d-flex align-items-center gap-6 px-10 py-6 rounded-8"
                style={{ backgroundColor: "hsl(var(--info-50))" }}
              >
                <i
                  className="ph-bold ph-truck"
                  style={{ fontSize: "14px", color: "hsl(var(--info-600))" }}
                ></i>
                <span
                  className="fw-medium"
                  style={{ fontSize: "12px", color: "hsl(var(--info-600))" }}
                >
                  {summary.deliveryDays} gün
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
