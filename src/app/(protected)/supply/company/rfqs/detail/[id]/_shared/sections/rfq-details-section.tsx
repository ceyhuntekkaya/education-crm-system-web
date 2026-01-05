"use client";

import React from "react";
import { Divider } from "@/components";
import { formatDate } from "@/utils";
import { useRFQDetail } from "../context";
import {
  isRFQExpired,
  calculateDaysUntilDeadline,
  isRFQDeadlineApproaching,
  getDeadlineColorClass,
  getDeadlineIconBoxColor,
} from "../../../../_shared/utils";

export const RFQDetailsSection: React.FC = () => {
  const { rfq } = useRFQDetail();

  if (!rfq) return null;

  const isExpired = isRFQExpired(rfq.submissionDeadline);
  const daysUntilDeadline = calculateDaysUntilDeadline(rfq.submissionDeadline);
  const isApproaching = isRFQDeadlineApproaching(rfq.submissionDeadline);

  return (
    <div className="rfq-detail-page__details-section">
      {/* Açıklama */}
      {rfq.description && (
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
            <h5 className="mb-0 fw-semibold text-neutral-900">Açıklama</h5>
          </div>
          <Divider size="sm" />
          <p className="text-neutral-700 line-height-1-5 mb-0">
            {rfq.description}
          </p>
        </div>
      )}

      {/* Ödeme Koşulları */}
      {rfq.paymentTerms && (
        <div
          className="bg-white rounded-16 p-20 mb-20"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(17, 24, 39, 0.06)",
          }}
        >
          <div className="d-flex align-items-center gap-8 mb-12">
            <div
              className="d-flex align-items-center justify-content-center bg-success-100 text-success-700"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              <i className="ph-bold ph-credit-card"></i>
            </div>
            <h5 className="mb-0 fw-semibold text-neutral-900">
              Ödeme Koşulları
            </h5>
          </div>
          <Divider size="sm" />
          <p className="text-neutral-700 line-height-1-5 mb-0">
            {rfq.paymentTerms}
          </p>
        </div>
      )}

      {/* Değerlendirme Kriterleri */}
      {rfq.evaluationCriteria && (
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
              <i className="ph-bold ph-check-square"></i>
            </div>
            <h5 className="mb-0 fw-semibold text-neutral-900">
              Değerlendirme Kriterleri
            </h5>
          </div>
          <Divider size="sm" />
          <p className="text-neutral-700 line-height-1-5 mb-0">
            {rfq.evaluationCriteria}
          </p>
        </div>
      )}

      {/* Teknik Gereksinimler */}
      {rfq.technicalRequirements && (
        <div
          className="bg-white rounded-16 p-20 mb-20"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(17, 24, 39, 0.06)",
          }}
        >
          <div className="d-flex align-items-center gap-8 mb-12">
            <div
              className="d-flex align-items-center justify-content-center bg-danger-100 text-danger-700"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            >
              <i className="ph-bold ph-wrench"></i>
            </div>
            <h5 className="mb-0 fw-semibold text-neutral-900">
              Teknik Gereksinimler
            </h5>
          </div>
          <Divider size="sm" />
          <p className="text-neutral-700 line-height-1-5 mb-0">
            {rfq.technicalRequirements}
          </p>
        </div>
      )}

      {/* Tarih Bilgileri */}
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
            <i className="ph-bold ph-calendar"></i>
          </div>
          <h5 className="mb-0 fw-semibold text-neutral-900">Tarih Bilgileri</h5>
        </div>
        <Divider size="sm" />
        <div className="row g-3">
          {rfq.createdAt && (
            <div className="col-12 col-md-6">
              <div className="rfq-detail-page__info-box">
                <p className="rfq-detail-page__info-box-label mb-0">
                  Oluşturulma Tarihi
                </p>
                <div className="rfq-detail-page__info-box-value mb-0">
                  {formatDate(rfq.createdAt)}
                </div>
              </div>
            </div>
          )}
          {rfq.updatedAt && (
            <div className="col-12 col-md-6">
              <div className="rfq-detail-page__info-box">
                <p className="rfq-detail-page__info-box-label mb-0">
                  Güncellenme Tarihi
                </p>
                <div className="rfq-detail-page__info-box-value mb-0">
                  {formatDate(rfq.updatedAt)}
                </div>
              </div>
            </div>
          )}
          {rfq.submissionDeadline && (
            <div className="col-12 col-md-6">
              <div className="rfq-detail-page__info-box">
                <p className="rfq-detail-page__info-box-label mb-0">
                  Son Başvuru Tarihi
                </p>
                <div
                  className={`rfq-detail-page__info-box-value fw-bold mb-0 ${getDeadlineColorClass(
                    rfq.submissionDeadline
                  )}`}
                >
                  {formatDate(rfq.submissionDeadline)}
                  <span className="text-xs ms-2">
                    {isExpired
                      ? "(Süresi Doldu)"
                      : isApproaching
                      ? `(${daysUntilDeadline} gün kaldı)`
                      : "(Aktif)"}
                  </span>
                </div>
              </div>
            </div>
          )}
          {rfq.expectedDeliveryDate && (
            <div className="col-12 col-md-6">
              <div className="rfq-detail-page__info-box">
                <p className="rfq-detail-page__info-box-label mb-0">
                  Beklenen Teslimat
                </p>
                <div className="rfq-detail-page__info-box-value mb-0">
                  {formatDate(rfq.expectedDeliveryDate)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
