"use client";

import React, { useMemo } from "react";
import { useDashboard } from "../context";
import { LoadingSpinner } from "@/components";

/**
 * Sipariş İstatistikleri Dashboard Özet Kartı (Supplier)
 */
export const OrderStatsCard: React.FC = () => {
  const { summary, isLoading } = useDashboard();

  // İstatistikleri hesapla
  const stats = useMemo(() => {
    const total = summary.totalOrders || 0;
    const pending = summary.pendingOrders || 0;
    const completed = summary.completedOrders || 0;
    const inProgress = total - pending - completed;

    const toPercent = (value: number) =>
      total > 0 ? Math.round((value / total) * 100) : 0;

    return {
      total,
      pending,
      completed,
      inProgress,
      progress: {
        pending: toPercent(pending),
        inProgress: toPercent(inProgress),
        completed: toPercent(completed),
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
            <i className="ph-bold ph-shopping-cart"></i>
          </div>
          <div className="flex-grow-1">
            <p className="text-neutral-600 summary-label">Siparişler</p>
            <div className="d-flex align-items-baseline gap-6">
              <span className="main-number text-primary-700">
                {stats.total}
              </span>
              <span className="text-neutral-500 summary-unit">adet</span>
            </div>
          </div>
        </div>

        <div className="amount-box">
          <div className="d-flex align-items-center justify-content-between gap-12">
            <div className="flex-grow-1">
              <p className="text-neutral-500 amount-label">Tamamlanan</p>
              <div className="fw-bold text-success-700 amount-value">
                {stats.completed}
              </div>
            </div>
            <div className="text-end flex-shrink-0">
              <p className="text-neutral-500 delivery-label">Bekleyen</p>
              <div className="fw-bold text-warning-700 delivery-value">
                {stats.pending}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="status-container soft-card rounded-16">
        {["pending", "inProgress", "completed"].map((key, index) => {
          const labelMap: Record<
            string,
            { label: string; color: string; icon: string }
          > = {
            pending: {
              label: "Bekleyen",
              color: "warning",
              icon: "ph-clock",
            },
            inProgress: {
              label: "İşlemde",
              color: "info",
              icon: "ph-gear",
            },
            completed: {
              label: "Tamamlandı",
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
            <p className="meta-label">Tamamlanma Oranı</p>
            <div className="meta-value-wrapper">
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-success-100 text-success-700">
                  <i className="ph-bold ph-chart-line-up"></i>
                </div>
              </div>
              <span className="meta-value">%{stats.progress.completed}</span>
            </div>
          </div>
        </div>

        <div className="meta-item-divider"></div>

        <div className="meta-item">
          <div className="meta-content">
            <p className="meta-label">Değerlendirme</p>
            <div className="meta-value-wrapper">
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-warning-100 text-warning-700">
                  <i className="ph-bold ph-star"></i>
                </div>
              </div>
              <span className="meta-value">{summary.totalRatings || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
