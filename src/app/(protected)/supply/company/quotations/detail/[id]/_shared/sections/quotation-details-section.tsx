"use client";

import React from "react";
import { Divider } from "@/components";
import { formatDate } from "@/utils";
import { useQuotationDetail } from "../context";
import {
  isQuotationExpired,
  calculateDaysUntilExpiry,
  isQuotationExpiringSoon,
  getExpiryColorClass,
  getExpiryIconBoxColor,
} from "../../../../_shared/utils";

export const QuotationDetailsSection: React.FC = () => {
  const { quotation } = useQuotationDetail();

  if (!quotation) return null;

  const isExpired = isQuotationExpired(quotation.validUntil);
  const daysUntilExpiry = calculateDaysUntilExpiry(quotation.validUntil);
  const isExpiringSoon = isQuotationExpiringSoon(quotation.validUntil);

  return (
    <div className="quotation-detail-page__details-section">
      {/* Notlar */}
      {quotation.notes && (
        <div className="bg-white rounded-16 p-20 mb-20"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(17, 24, 39, 0.06)",
          }}
        >
          <div className="d-flex align-items-center gap-8 mb-12">
            <div className="d-flex align-items-center justify-content-center bg-primary-100 text-primary-700"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              <i className="ph-bold ph-note"></i>
            </div>
            <h5 className="mb-0 fw-semibold text-neutral-900">Notlar</h5>
          </div>
          <Divider size="sm" />
          <p className="text-neutral-700 line-height-1-5 mb-0">{quotation.notes}</p>
        </div>
      )}

      {/* Ödeme Koşulları */}
      {quotation.paymentTerms && (
        <div className="bg-white rounded-16 p-20 mb-20"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(17, 24, 39, 0.06)",
          }}
        >
          <div className="d-flex align-items-center gap-8 mb-12">
            <div className="d-flex align-items-center justify-content-center bg-success-100 text-success-700"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              <i className="ph-bold ph-credit-card"></i>
            </div>
            <h5 className="mb-0 fw-semibold text-neutral-900">Ödeme Koşulları</h5>
          </div>
          <Divider size="sm" />
          <p className="text-neutral-700 line-height-1-5 mb-0">
            {quotation.paymentTerms}
          </p>
        </div>
      )}

      {/* Garanti Koşulları */}
      {quotation.warrantyTerms && (
        <div className="bg-white rounded-16 p-20 mb-20"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(17, 24, 39, 0.06)",
          }}
        >
          <div className="d-flex align-items-center gap-8 mb-12">
            <div className="d-flex align-items-center justify-content-center bg-warning-100 text-warning-700"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              <i className="ph-bold ph-shield-check"></i>
            </div>
            <h5 className="mb-0 fw-semibold text-neutral-900">Garanti Koşulları</h5>
          </div>
          <Divider size="sm" />
          <p className="text-neutral-700 line-height-1-5 mb-0">
            {quotation.warrantyTerms}
          </p>
        </div>
      )}

      {/* Tarih Bilgileri */}
      <div className="bg-white rounded-16 p-20"
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          border: "1px solid rgba(17, 24, 39, 0.06)",
        }}
      >
        <div className="d-flex align-items-center gap-8 mb-12">
          <div className="d-flex align-items-center justify-content-center bg-main-100 text-main-700"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            <i className="ph-bold ph-calendar"></i>
          </div>
          <h5 className="mb-0 fw-semibold text-neutral-900">Tarih Bilgileri</h5>
        </div>
        <Divider size="sm" />
        <div className="row g-3">
          {quotation.createdAt && (
            <div className="col-12 col-md-6">
              <div className="quotation-detail-page__info-box">
                <p className="quotation-detail-page__info-box-label mb-0">
                  Oluşturulma Tarihi
                </p>
                <div className="quotation-detail-page__info-box-value mb-0">
                  {formatDate(quotation.createdAt)}
                </div>
              </div>
            </div>
          )}
          {quotation.updatedAt && (
            <div className="col-12 col-md-6">
              <div className="quotation-detail-page__info-box">
                <p className="quotation-detail-page__info-box-label mb-0">
                  Güncellenme Tarihi
                </p>
                <div className="quotation-detail-page__info-box-value mb-0">
                  {formatDate(quotation.updatedAt)}
                </div>
              </div>
            </div>
          )}
          {quotation.validUntil && (
            <div className="col-12 col-md-6">
              <div className="quotation-detail-page__info-box">
                <p className="quotation-detail-page__info-box-label mb-0">
                  Geçerlilik Tarihi
                </p>
                <div
                  className={`quotation-detail-page__info-box-value fw-bold mb-0 ${getExpiryColorClass(
                    isExpired,
                    isExpiringSoon
                  )}`}
                >
                  {formatDate(quotation.validUntil)}
                  <span className="text-xs ms-2">
                    {isExpired
                      ? "(Süresi Doldu)"
                      : isExpiringSoon
                      ? `(${daysUntilExpiry} gün kaldı)`
                      : "(Aktif)"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

