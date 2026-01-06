"use client";

import React from "react";
import { Badge } from "@/components";
import type { RFQItemDto } from "@/types";
import { getItemCardSummary, formatQuantity, getCategoryColor } from "../utils";

interface ItemCardProps {
  item: RFQItemDto;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const summary = getItemCardSummary(item);
  const categoryColor = getCategoryColor(summary.categoryName);

  return (
    <div className="col-4">
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
              background: `linear-gradient(135deg, ${categoryColor}15 0%, ${categoryColor}30 100%)`,
            }}
          >
            <i
              className="ph-duotone ph-package"
              style={{
                fontSize: "56px",
                opacity: 0.4,
                color: categoryColor,
              }}
            ></i>
          </div>

          {/* Category Badge - Overlay on Image */}
          <div
            className="position-absolute"
            style={{ top: "12px", right: "12px", zIndex: 2 }}
          >
            <span
              className="d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold bg-white"
              style={{
                color: categoryColor,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              <i className="ph-bold ph-tag" style={{ fontSize: "12px" }}></i>
              {summary.categoryName}
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
              minHeight: "42px",
              marginBottom: "16px",
            }}
          >
            <p
              className="text-sm text-neutral-600 mb-0"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1.5",
              }}
            >
              {summary.specifications}
            </p>
          </div>

          {/* Quantity Container */}
          <div className="soft-card rounded-16 mb-0 mt-auto">
            <div className="meta-container">
              {/* Quantity */}
              <div className="meta-item">
                <div className="meta-content">
                  <p className="meta-label" style={{ fontSize: "0.6875rem" }}>
                    Miktar
                  </p>
                  <div className="meta-value-wrapper">
                    <div className="meta-icon-wrapper">
                      <div
                        className="meta-icon text-white"
                        style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: categoryColor,
                        }}
                      >
                        <i
                          className="ph-bold ph-number-square-one"
                          style={{ fontSize: "16px" }}
                        ></i>
                      </div>
                    </div>
                    <span
                      className="meta-value fw-bold"
                      style={{ fontSize: "1rem", color: categoryColor }}
                    >
                      {formatQuantity(summary.quantity, summary.unit)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
