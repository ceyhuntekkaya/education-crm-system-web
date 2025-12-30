"use client";

import React, { useMemo } from "react";
import { useDashboard } from "../context";
import { LoadingSpinner } from "@/components";

/**
 * Aktif İlanlar Dashboard Özet Kartı
 */
export const ActiveRFQsCard: React.FC = () => {
  const { activeRFQs, isLoading } = useDashboard();

  // İstatistikleri hesapla
  const stats = useMemo(() => {
    const total = activeRFQs.length;

    // İlan tipine göre sayılar
    const openRFQs = activeRFQs.filter((rfq) => rfq.rfqType === "OPEN").length;
    const invitedRFQs = activeRFQs.filter(
      (rfq) => rfq.rfqType === "INVITED"
    ).length;

    // Toplam teklif sayısı
    const totalQuotations = activeRFQs.reduce(
      (sum, rfq) => sum + (rfq.quotationCount ?? 0),
      0
    );

    // Toplam ürün sayısı
    const totalItems = activeRFQs.reduce(
      (sum, rfq) => sum + (rfq.itemCount ?? 0),
      0
    );

    // Toplam davet sayısı
    const totalInvitations = activeRFQs.reduce(
      (sum, rfq) => sum + (rfq.invitationCount ?? 0),
      0
    );

    // En yakın son başvuru tarihi
    const nextDeadline = activeRFQs
      .map((rfq) => rfq.submissionDeadline)
      .filter(Boolean)
      .sort()
      .at(0);

    // Ortalama teklif sayısı
    const avgQuotations = total > 0 ? Math.round(totalQuotations / total) : 0;

    // Yüzdeler
    const toPercent = (value: number) =>
      total > 0 ? Math.round((value / total) * 100) : 0;

    return {
      total,
      openRFQs,
      invitedRFQs,
      totalQuotations,
      totalItems,
      totalInvitations,
      nextDeadline,
      avgQuotations,
      progress: {
        open: toPercent(openRFQs),
        invited: toPercent(invitedRFQs),
      },
    };
  }, [activeRFQs]);

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
            <i className="ph-bold ph-megaphone"></i>
          </div>
          <div className="flex-grow-1">
            <p className="text-neutral-600 summary-label">Aktif İlanlar</p>
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
              <p className="text-neutral-500 amount-label">Toplam Teklif</p>
              <div className="fw-bold text-neutral-900 amount-value">
                {stats.totalQuotations} teklif
              </div>
            </div>
            {stats.nextDeadline && (
              <div className="text-end flex-shrink-0">
                <p className="text-neutral-500 delivery-label">
                  En yakın son başvuru
                </p>
                <p className="text-danger-700 mb-0 fw-semibold delivery-value">
                  {stats.nextDeadline}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="status-container soft-card rounded-16">
        {["open", "invited"].map((key, index) => {
          const labelMap: Record<
            string,
            { label: string; color: string; icon: string }
          > = {
            open: {
              label: "Açık İlan",
              color: "success",
              icon: "ph-globe",
            },
            invited: {
              label: "Davetli İlan",
              color: "info",
              icon: "ph-user-circle-plus",
            },
          };
          const value = key === "open" ? stats.openRFQs : stats.invitedRFQs;
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
            <p className="meta-label">Toplam Ürün</p>
            <div className="meta-value-wrapper">
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-primary-100 text-primary-700">
                  <i className="ph-bold ph-package"></i>
                </div>
              </div>
              <span className="meta-value">{stats.totalItems}</span>
            </div>
          </div>
        </div>

        <div className="meta-item-divider"></div>

        <div className="meta-item">
          <div className="meta-content">
            <p className="meta-label">Ort. Teklif</p>
            <div className="meta-value-wrapper">
              <div className="meta-icon-wrapper">
                <div className="meta-icon bg-primary-100 text-primary-700">
                  <i className="ph-bold ph-chart-line"></i>
                </div>
              </div>
              <span className="meta-value">{stats.avgQuotations}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
