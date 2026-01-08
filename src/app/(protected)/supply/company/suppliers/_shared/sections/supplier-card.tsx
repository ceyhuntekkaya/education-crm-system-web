"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { formatDate } from "@/utils";
import type { SupplierDto } from "@/types";

interface SupplierCardProps {
  supplier: SupplierDto;
}

export const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  const router = useRouter();

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
        }}
      >
        {/* Supplier Header Image */}
        <div
          className="position-relative overflow-hidden"
          style={{ height: "200px" }}
        >
          <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-main-25">
            <i
              className="ph-duotone ph-buildings text-main-600"
              style={{ fontSize: "64px", opacity: 0.3 }}
            ></i>
          </div>

          {/* Rating Badge - Overlay on Image */}
          {supplier.averageRating && (
            <div
              className="position-absolute"
              style={{
                top: "12px",
                left: "12px",
                zIndex: 2,
              }}
            >
              <span
                className="d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold"
                style={{
                  backgroundColor: "rgba(251, 191, 36, 0.95)",
                  color: "rgb(120, 53, 15)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
              >
                <i className="ph-fill ph-star" style={{ fontSize: "12px" }}></i>
                {supplier.averageRating.toFixed(1)} Puan
              </span>
            </div>
          )}

          {/* Status Badge - Overlay on Image */}
          <div
            className="position-absolute"
            style={{ top: "12px", right: "12px", zIndex: 2 }}
          >
            <span
              className={`d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold ${
                supplier.isActive
                  ? "bg-success-600 text-white"
                  : "bg-neutral-400 text-white"
              }`}
              style={{
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
            >
              <span className="w-4 h-4 rounded-circle bg-white"></span>
              {supplier.isActive ? "Aktif" : "Pasif"}
            </span>
          </div>
        </div>

        {/* Supplier Content */}
        <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
          {/* Firma Adı */}
          <div className="mb-12">
            <h5 className="mb-0 fw-semibold line-height-1-3 text-md text-lg-lg text-neutral-900">
              {supplier.companyName || "Firma Adı Yok"}
            </h5>
          </div>

          {/* Description */}
          {supplier.description && (
            <div
              style={{
                minHeight: "63px",
                marginBottom: "12px",
              }}
            >
              <p
                className="text-sm text-neutral-600 mb-0"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: "1.5",
                }}
              >
                {supplier.description}
              </p>
            </div>
          )}

          {/* İletişim Bilgileri Card */}
          <div className="soft-card rounded-16 mb-12">
            <div className="d-flex flex-column gap-8 p-12">
              {/* Vergi No */}
              {supplier.taxNumber && (
                <div className="d-flex align-items-center gap-12">
                  <div
                    className="status-icon bg-info-100 text-info-700"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    <i className="ph-bold ph-identification-card"></i>
                  </div>
                  <span className="text-sm text-neutral-700">
                    {supplier.taxNumber}
                  </span>
                </div>
              )}

              {/* E-posta */}
              {supplier.email && (
                <div className="d-flex align-items-center gap-12">
                  <div
                    className="status-icon bg-primary-100 text-primary-700"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    <i className="ph-bold ph-envelope"></i>
                  </div>
                  <span className="text-sm text-neutral-700">
                    {supplier.email}
                  </span>
                </div>
              )}

              {/* Telefon */}
              {supplier.phone && (
                <div className="d-flex align-items-center gap-12">
                  <div
                    className="status-icon bg-success-100 text-success-700"
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      flexShrink: 0,
                    }}
                  >
                    <i className="ph-bold ph-phone"></i>
                  </div>
                  <span className="text-sm text-neutral-700">
                    {supplier.phone}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Adres Card */}
          {supplier.address && (
            <div className="soft-card rounded-16 mb-12">
              <div className="d-flex align-items-start gap-12 p-12">
                <div
                  className="status-icon bg-warning-100 text-warning-700"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  <i className="ph-bold ph-map-pin"></i>
                </div>
                <span className="text-sm text-neutral-700 flex-grow-1">
                  {supplier.address}
                </span>
              </div>
            </div>
          )}

          {/* Created Date with Detail Button */}
          {supplier.createdAt && (
            <div className="d-flex align-items-center justify-content-between gap-12 mb-12">
              <div className="d-flex align-items-center gap-6">
                <i className="ph-bold ph-clock text-neutral-400 text-sm"></i>
                <span className="text-xs text-neutral-500 fw-medium">
                  Kayıt: {formatDate(supplier.createdAt)}
                </span>
              </div>
              <Button
                variant="outline"
                size="xs"
                rightIcon="ph-bold ph-eye"
                onClick={() =>
                  router.push(`/supply/company/suppliers/detail/${supplier.id}`)
                }
              >
                Detay
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
