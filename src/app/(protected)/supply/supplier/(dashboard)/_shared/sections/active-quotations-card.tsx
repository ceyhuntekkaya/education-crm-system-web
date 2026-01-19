"use client";

import React, { useMemo } from "react";
import { useDashboard } from "../context";
import { LoadingSpinner } from "@/components";

/**
 * Aktif Teklifler Dashboard Özet Kartı (Supplier)
 */
export const ActiveQuotationsCard: React.FC = () => {
  const { summary, isLoading } = useDashboard();

  // İstatistikleri hesapla
  const stats = useMemo(() => {
    const total = summary.activeQuotations || 0;
    const pending = summary.pendingQuotations || 0;
    const submitted = summary.submittedQuotations || 0;
    const accepted = summary.acceptedQuotations || 0;

    const toPercent = (value: number) =>
      total > 0 ? Math.round((value / total) * 100) : 0;

    return {
      total,
      pending,
      submitted,
      accepted,
      progress: {
        pending: toPercent(pending),
        submitted: toPercent(submitted),
        accepted: toPercent(accepted),
      },
    };
  }, [summary]);

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
    <div className="active-card bg-white rounded-16 h-100 position-relative overflow-hidden d-flex flex-column">
      <div className="floating-blur blur-a"></div>
      <div className="floating-blur blur-b"></div>

      <div className="summary-section">
        <div className="summary-header d-flex align-items-center gap-10">
          <div className="icon-box text-white">
            <i className="ph-bold ph-clipboard-text"></i>
          </div>
          <div className="flex-grow-1">
            <p className="text-neutral-600 summary-label">Aktif Teklifler</p>
            <div className="d-flex align-items-baseline gap-6">
              <span className="main-number text-purple-700">{stats.total}</span>
              <span className="text-neutral-500 summary-unit">adet</span>
            </div>
          </div>
        </div>

        <div className="amount-box">
          <div className="d-flex align-items-center justify-content-between gap-12">
            <div className="flex-grow-1">
              <p className="text-neutral-500 amount-label">Toplam Satış</p>
              <div className="fw-bold text-neutral-900 amount-value">
                {(summary.totalSales || 0).toLocaleString("tr-TR", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                ₺
              </div>
            </div>
            <div className="text-end flex-shrink-0">
              <p className="text-neutral-500 delivery-label">Ortalama Puan</p>
              <div className="d-flex align-items-center gap-4">
                <i className="ph-fill ph-star text-warning-600"></i>
                <p className="text-warning-700 mb-0 fw-semibold delivery-value">
                  {(summary.averageRating || 0).toFixed(1)} / 5.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="status-container soft-card rounded-16">
        {["pending", "submitted", "accepted"].map((key, index) => {
          const labelMap: Record<
            string,
            { label: string; color: string; icon: string }
          > = {
            pending: {
              label: "Bekleyen",
              color: "warning",
              icon: "ph-clock",
            },
            submitted: {
              label: "Gönderilen",
              color: "info",
              icon: "ph-paper-plane-tilt",
            },
            accepted: {
              label: "Kabul Edilen",
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

      <div className="meta-container soft-card rounded-16 mt-auto">
        <div className="meta-item">
          <div className="meta-content">
            <p className="meta-label">Toplam Ürün</p>
            <div className="meta-value-wrapper">
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-primary-100 text-primary-700">
                  <i className="ph-bold ph-package"></i>
                </div>
              </div>
              <span className="meta-value">{summary.totalProducts || 0}</span>
            </div>
          </div>
        </div>

        <div className="meta-item-divider"></div>

        <div className="meta-item">
          <div className="meta-content">
            <p className="meta-label">Aktif Ürün</p>
            <div className="meta-value-wrapper">
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-success-100 text-success-700">
                  <i className="ph-bold ph-check-circle"></i>
                </div>
              </div>
              <span className="meta-value">{summary.activeProducts || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
