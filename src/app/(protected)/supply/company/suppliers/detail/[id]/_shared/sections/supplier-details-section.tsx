"use client";

import React from "react";
import { Divider } from "@/components";
import { formatDate } from "@/utils";
import { useSupplierDetail } from "../context";

export const SupplierDetailsSection: React.FC = () => {
  const { supplier } = useSupplierDetail();

  if (!supplier) return null;

  return (
    <div className="supplier-detail-page__details-section">
      {/* Açıklama */}
      {supplier.description && (
        <div
          className="bg-white rounded-16 p-20 mb-20"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(17, 24, 39, 0.06)",
          }}
        >
          <div className="d-flex align-items-center gap-8 mb-12">
            <div
              className="d-flex align-items-center justify-content-center bg-primary-100 text-primary-700"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              <i className="ph-bold ph-note"></i>
            </div>
            <h5 className="mb-0 fw-semibold text-neutral-900">
              Firma Hakkında
            </h5>
          </div>
          <Divider size="sm" />
          <p className="text-neutral-700 line-height-1-5 mb-0">
            {supplier.description}
          </p>
        </div>
      )}

      {/* Adres */}
      {supplier.address && (
        <div
          className="bg-white rounded-16 p-20 mb-20"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(17, 24, 39, 0.06)",
          }}
        >
          <div className="d-flex align-items-center gap-8 mb-12">
            <div
              className="d-flex align-items-center justify-content-center bg-warning-100 text-warning-700"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              <i className="ph-bold ph-map-pin"></i>
            </div>
            <h5 className="mb-0 fw-semibold text-neutral-900">Adres</h5>
          </div>
          <Divider size="sm" />
          <p className="text-neutral-700 line-height-1-5 mb-0">
            {supplier.address}
          </p>
        </div>
      )}

      {/* Şirket Bilgileri */}
      {supplier.taxNumber && (
        <div
          className="bg-white rounded-16 p-20 mb-20"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(17, 24, 39, 0.06)",
          }}
        >
          <div className="d-flex align-items-center gap-8 mb-12">
            <div
              className="d-flex align-items-center justify-content-center bg-info-100 text-info-700"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              <i className="ph-bold ph-buildings"></i>
            </div>
            <h5 className="mb-0 fw-semibold text-neutral-900">
              Şirket Bilgileri
            </h5>
          </div>
          <Divider size="sm" />
          <div>
            <p className="text-neutral-600 mb-1 fw-medium">Vergi Numarası</p>
            <p className="text-neutral-900 mb-0">{supplier.taxNumber}</p>
          </div>
        </div>
      )}

      {/* Tarih Bilgileri */}
      {(supplier.createdAt || supplier.updatedAt) && (
        <div
          className="bg-white rounded-16 p-20 mb-20"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(17, 24, 39, 0.06)",
          }}
        >
          <div className="d-flex align-items-center gap-8 mb-12">
            <div
              className="d-flex align-items-center justify-content-center bg-neutral-100 text-neutral-700"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              <i className="ph-bold ph-calendar"></i>
            </div>
            <h5 className="mb-0 fw-semibold text-neutral-900">
              Tarih Bilgileri
            </h5>
          </div>
          <Divider size="sm" />
          <div className="row g-3">
            {supplier.createdAt && (
              <div className="col-12 col-md-6">
                <div className="supplier-detail-page__info-box">
                  <p className="supplier-detail-page__info-box-label mb-0">
                    Kayıt Tarihi
                  </p>
                  <div className="supplier-detail-page__info-box-value mb-0">
                    {formatDate(supplier.createdAt)}
                  </div>
                </div>
              </div>
            )}
            {supplier.updatedAt && (
              <div className="col-12 col-md-6">
                <div className="supplier-detail-page__info-box">
                  <p className="supplier-detail-page__info-box-label mb-0">
                    Son Güncelleme
                  </p>
                  <div className="supplier-detail-page__info-box-value mb-0">
                    {formatDate(supplier.updatedAt)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Değerlendirme Puanı */}
      {supplier.averageRating && (
        <div
          className="bg-white rounded-16 p-20"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(17, 24, 39, 0.06)",
          }}
        >
          <div className="d-flex align-items-center gap-8 mb-12">
            <div
              className="d-flex align-items-center justify-content-center bg-main-100 text-main-700"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              <i className="ph-fill ph-star"></i>
            </div>
            <h5 className="mb-0 fw-semibold text-neutral-900">
              Değerlendirme Puanı
            </h5>
          </div>
          <Divider size="sm" />
          <div className="d-flex align-items-center gap-12">
            <div
              className="d-flex align-items-center justify-content-center bg-warning-50"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "12px",
              }}
            >
              <span
                className="fw-bold text-warning-700"
                style={{ fontSize: "2rem" }}
              >
                {supplier.averageRating.toFixed(1)}
              </span>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={
                      star <= Math.round(supplier.averageRating || 0)
                        ? "ph-fill ph-star text-warning-500"
                        : "ph ph-star text-neutral-300"
                    }
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                ))}
              </div>
              <p className="text-neutral-600 mb-0">
                5 üzerinden {supplier.averageRating.toFixed(1)} puan
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
