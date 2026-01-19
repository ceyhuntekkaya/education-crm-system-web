"use client";

import React, { useMemo } from "react";
import { useDashboard } from "../context";
import { LoadingSpinner } from "@/components";

/**
 * Ürün & Performans Dashboard Özet Kartı (Supplier)
 */
export const ProductPerformanceCard: React.FC = () => {
  const { summary, isLoading } = useDashboard();

  // İstatistikleri hesapla
  const stats = useMemo(() => {
    const totalProducts = summary.totalProducts || 0;
    const activeProducts = summary.activeProducts || 0;
    const inactiveProducts = totalProducts - activeProducts;
    const averageRating = summary.averageRating || 0;
    const totalRatings = summary.totalRatings || 0;

    const toPercent = (value: number) =>
      totalProducts > 0 ? Math.round((value / totalProducts) * 100) : 0;

    return {
      totalProducts,
      activeProducts,
      inactiveProducts,
      averageRating,
      totalRatings,
      progress: {
        active: toPercent(activeProducts),
        inactive: toPercent(inactiveProducts),
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
            <i className="ph-bold ph-package"></i>
          </div>
          <div className="flex-grow-1">
            <p className="text-neutral-600 summary-label">Ürünlerim</p>
            <div className="d-flex align-items-baseline gap-6">
              <span className="main-number text-primary-700">
                {stats.totalProducts}
              </span>
              <span className="text-neutral-500 summary-unit">adet</span>
            </div>
          </div>
        </div>

        <div className="amount-box">
          <div className="d-flex align-items-center justify-content-between gap-12">
            <div className="flex-grow-1">
              <p className="text-neutral-500 amount-label">Ortalama Puan</p>
              <div className="d-flex align-items-center gap-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`${
                      star <= stats.averageRating ? "ph-fill" : "ph"
                    } ph-star text-warning-600`}
                    style={{ fontSize: "16px" }}
                  ></i>
                ))}
                <span className="fw-bold text-warning-700 ms-4">
                  {stats.averageRating.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="text-end flex-shrink-0">
              <p className="text-neutral-500 delivery-label">
                Toplam Değerlendirme
              </p>
              <p className="text-primary-700 mb-0 fw-semibold delivery-value">
                {stats.totalRatings}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="status-container soft-card rounded-16">
        {["active", "inactive"].map((key, index) => {
          const labelMap: Record<
            string,
            { label: string; color: string; icon: string }
          > = {
            active: {
              label: "Aktif Ürünler",
              color: "success",
              icon: "ph-check-circle",
            },
            inactive: {
              label: "Pasif Ürünler",
              color: "neutral",
              icon: "ph-minus-circle",
            },
          };
          const value =
            key === "active" ? stats.activeProducts : stats.inactiveProducts;
          const pct = (stats.progress as any)[key] as number;

          return (
            <div
              key={key}
              className={`status-item ${
                index < 1 ? "status-item-divider" : ""
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
            <p className="meta-label">Satış Performansı</p>
            <div className="meta-value-wrapper">
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-success-100 text-success-700">
                  <i className="ph-bold ph-chart-line-up"></i>
                </div>
              </div>
              <span className="meta-value">
                {(summary.totalSales || 0).toLocaleString("tr-TR", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                })}
                ₺
              </span>
            </div>
          </div>
        </div>

        <div className="meta-item-divider"></div>

        <div className="meta-item">
          <div className="meta-content">
            <p className="meta-label">Aktif Oranı</p>
            <div className="meta-value-wrapper">
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-primary-100 text-primary-700">
                  <i className="ph-bold ph-percent"></i>
                </div>
              </div>
              <span className="meta-value">%{stats.progress.active}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
