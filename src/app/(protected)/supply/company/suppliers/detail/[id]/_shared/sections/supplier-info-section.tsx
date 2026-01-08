"use client";

import React from "react";
import { Badge } from "@/components";
import { useSupplierDetail } from "../context";
import { getSupplierStatusConfig, getStarRating } from "../utils";

export const SupplierInfoSection: React.FC = () => {
  const { supplier } = useSupplierDetail();

  if (!supplier) return null;

  const statusConfig = getSupplierStatusConfig(supplier.isActive);
  const rating = getStarRating(supplier.averageRating);

  return (
    <div className="supplier-detail-page__info-section">
      {/* Başlık ve Durum */}
      <div className="supplier-detail-page__title-section">
        <div
          className="supplier-detail-page__badges"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Badge variant={statusConfig.variant} size="sm">
              <i className={`${statusConfig.icon} me-1`}></i>
              {statusConfig.text}
            </Badge>
            {supplier.averageRating && (
              <Badge variant="warning" size="sm">
                <i className="ph-fill ph-star me-1"></i>
                {rating}
              </Badge>
            )}
          </div>
        </div>

        <h1 className="supplier-detail-page__title mb-0">
          {supplier.companyName || "Tedarikçi Adı"}
        </h1>
      </div>

      {/* Meta Container - İletişim Bilgileri */}
      <div className="meta-container soft-card rounded-16">
        {/* Email */}
        {supplier.email && (
          <>
            <div className="meta-item">
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-primary-100 text-primary-700">
                  <i className="ph-bold ph-envelope"></i>
                </div>
              </div>
              <div className="meta-content">
                <p className="meta-label">E-posta</p>
                <a
                  href={`mailto:${supplier.email}`}
                  className="meta-value text-primary-600"
                  style={{ textDecoration: "none" }}
                >
                  {supplier.email}
                </a>
              </div>
            </div>
            <div className="meta-item-divider"></div>
          </>
        )}

        {/* Telefon */}
        {supplier.phone && (
          <>
            <div className="meta-item">
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-success-100 text-success-700">
                  <i className="ph-bold ph-phone"></i>
                </div>
              </div>
              <div className="meta-content">
                <p className="meta-label">Telefon</p>
                <a
                  href={`tel:${supplier.phone}`}
                  className="meta-value text-success-600"
                  style={{ textDecoration: "none" }}
                >
                  {supplier.phone}
                </a>
              </div>
            </div>
            <div className="meta-item-divider"></div>
          </>
        )}

        {/* Vergi Numarası */}
        {supplier.taxNumber && (
          <div className="meta-item">
            <div className="meta-icon-wrapper">
              <div className="meta-icon bg-info-100 text-info-700">
                <i className="ph-bold ph-identification-card"></i>
              </div>
            </div>
            <div className="meta-content">
              <p className="meta-label">Vergi Numarası</p>
              <span className="meta-value">{supplier.taxNumber}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
