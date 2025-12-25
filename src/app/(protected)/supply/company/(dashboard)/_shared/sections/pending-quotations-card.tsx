"use client";

import React, { useMemo } from "react";
import { useDashboard } from "../context";
import { LoadingSpinner } from "@/components";

/**
 * Bekleyen Teklifler Dashboard Özet Kartı
 */
export const PendingQuotationsCard: React.FC = () => {
  const { pendingQuotations, isLoading } = useDashboard();

  // İstatistikleri hesapla
  const stats = useMemo(() => {
    const totalAmount = pendingQuotations.reduce(
      (sum, quotation) => sum + (quotation.totalAmount ?? 0),
      0
    );

    const submitted = pendingQuotations.filter(
      (q) => q.status === "SUBMITTED"
    ).length;
    const underReview = pendingQuotations.filter(
      (q) => q.status === "UNDER_REVIEW"
    ).length;
    const accepted = pendingQuotations.filter(
      (q) => q.status === "ACCEPTED"
    ).length;

    const suppliers = new Set(
      pendingQuotations.map((quotation) => quotation.supplierId)
    ).size;

    const totalItems = pendingQuotations.reduce(
      (sum, quotation) => sum + (quotation.itemCount ?? 0),
      0
    );

    // En yakın geçerlilik tarihi
    const nextValidUntil = pendingQuotations
      .map((quotation) => quotation.validUntil)
      .filter(Boolean)
      .sort()
      .at(0);

    const total = pendingQuotations.length || 1;
    const toPercent = (value: number) => Math.round((value / total) * 100);

    return {
      total: pendingQuotations.length,
      totalAmount,
      submitted,
      underReview,
      accepted,
      suppliers,
      totalItems,
      nextValidUntil,
      progress: {
        submitted: toPercent(submitted),
        underReview: toPercent(underReview),
        accepted: toPercent(accepted),
      },
    };
  }, [pendingQuotations]);

  if (isLoading) {
    return (
      <div className="active-card bg-white rounded-16 h-100 position-relative overflow-hidden">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <LoadingSpinner message="Yükleniyor..." variant="dots" size="md" />
        </div>
      </div>
    );
  }

  return (
    <div className="active-card bg-white rounded-16 h-100 position-relative overflow-hidden">
      <div className="floating-blur blur-a"></div>
      <div className="floating-blur blur-b"></div>

      <div className="summary-section">
        <div className="summary-header d-flex align-items-center gap-10">
          <div className="icon-box text-white">
            <i className="ph-bold ph-file-text"></i>
          </div>
          <div className="flex-grow-1">
            <p className="text-neutral-600 summary-label">Bekleyen Teklifler</p>
            <div className="d-flex align-items-baseline gap-6">
              <span className="main-number text-warning-700">
                {stats.total}
              </span>
              <span className="text-neutral-500 summary-unit">adet</span>
            </div>
          </div>
        </div>

        <div className="amount-box">
          <div className="d-flex align-items-center justify-content-between gap-12">
            <div className="flex-grow-1">
              <p className="text-neutral-500 amount-label">Toplam Tutar</p>
              <div className="fw-bold text-neutral-900 amount-value">
                {stats.totalAmount.toLocaleString("tr-TR", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                ₺
              </div>
            </div>
            {stats.nextValidUntil && (
              <div className="text-end flex-shrink-0">
                <p className="text-neutral-500 delivery-label">
                  En yakın geçerlilik
                </p>
                <p className="text-warning-700 mb-0 fw-semibold delivery-value">
                  {stats.nextValidUntil}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="status-container soft-card rounded-16">
        {["submitted", "underReview", "accepted"].map((key, index) => {
          const labelMap: Record<
            string,
            { label: string; color: string; icon: string }
          > = {
            submitted: {
              label: "Gönderildi",
              color: "info",
              icon: "ph-paper-plane-tilt",
            },
            underReview: {
              label: "İnceleniyor",
              color: "warning",
              icon: "ph-eye",
            },
            accepted: {
              label: "Kabul Edildi",
              color: "success",
              icon: "ph-check-circle",
            },
          };
          const value = (stats as any)[key] as number;
          const pct = (stats.progress as any)[key] as number;

          return (
            <div
              key={key}
              className={`status-item ${
                index < 2 ? "status-item-divider" : ""
              }`}
            >
              <div className="status-item-header">
                <div
                  className={`status-icon bg-${labelMap[key].color}-100 text-${labelMap[key].color}-700`}
                >
                  <i className={`ph-bold ${labelMap[key].icon}`}></i>
                </div>
                <div className="status-info">
                  <span
                    className={`fw-bold text-${labelMap[key].color}-700 status-value`}
                  >
                    {value}
                  </span>
                  <span className="text-neutral-600 status-text">
                    {labelMap[key].label}
                  </span>
                </div>
              </div>
              <div className="status-item-progress">
                <div className="progress-bar-wrapper">
                  <div
                    className={`progress-bar-fill bg-${labelMap[key].color}-500`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
                <span className="percent-text">%{pct}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="meta-container soft-card rounded-16">
        <div className="meta-item">
          <div className="meta-content">
            <p className="meta-label">Tedarikçi</p>
            <div className="meta-value-wrapper">
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-warning-100 text-warning-700">
                  <i className="ph-bold ph-buildings"></i>
                </div>
              </div>
              <span className="meta-value">{stats.suppliers}</span>
            </div>
          </div>
        </div>

        <div className="meta-item-divider"></div>

        <div className="meta-item">
          <div className="meta-content">
            <p className="meta-label">Toplam Ürün</p>
            <div className="meta-value-wrapper">
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-warning-100 text-warning-700">
                  <i className="ph-bold ph-cube"></i>
                </div>
              </div>
              <span className="meta-value">{stats.totalItems}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
