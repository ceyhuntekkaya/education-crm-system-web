"use client";

import React, { useMemo } from "react";
import { useDashboard } from "../context";
import { LoadingSpinner } from "@/components";

/**
 * Aktif Siparişler Dashboard Özet Kartı
 */
export const ActiveOrdersCard: React.FC = () => {
  const { activeOrders, isLoading } = useDashboard();

  // İstatistikleri hesapla
  const stats = useMemo(() => {
    const totalAmount = activeOrders.reduce(
      (sum, order) => sum + (order.totalAmount ?? 0),
      0
    );

    const confirmed = activeOrders.filter(
      (o) => o.status === "CONFIRMED"
    ).length;
    const preparing = activeOrders.filter(
      (o) => o.status === "PREPARING"
    ).length;
    const shipped = activeOrders.filter((o) => o.status === "SHIPPED").length;

    const suppliers = new Set(activeOrders.map((order) => order.supplierId))
      .size;

    const totalItems = activeOrders.reduce(
      (sum, order) => sum + (order.itemCount ?? 0),
      0
    );

    const nextDeliveryDate = activeOrders
      .map((order) => order.expectedDeliveryDate)
      .filter(Boolean)
      .sort()
      .at(0);

    const total = activeOrders.length || 1;
    const toPercent = (value: number) => Math.round((value / total) * 100);

    return {
      total: activeOrders.length,
      totalAmount,
      confirmed,
      preparing,
      shipped,
      suppliers,
      totalItems,
      nextDeliveryDate,
      progress: {
        confirmed: toPercent(confirmed),
        preparing: toPercent(preparing),
        shipped: toPercent(shipped),
      },
    };
  }, [activeOrders]);

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
            <i className="ph-bold ph-shopping-cart"></i>
          </div>
          <div className="flex-grow-1">
            <p className="text-neutral-600 summary-label">Aktif Siparişler</p>
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
              <p className="text-neutral-500 amount-label">Toplam Tutar</p>
              <div className="fw-bold text-neutral-900 amount-value">
                {stats.totalAmount.toLocaleString("tr-TR", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                ₺
              </div>
            </div>
            {stats.nextDeliveryDate && (
              <div className="text-end flex-shrink-0">
                <p className="text-neutral-500 delivery-label">
                  En yakın teslim
                </p>
                <p className="text-success-700 mb-0 fw-semibold delivery-value">
                  {stats.nextDeliveryDate}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="status-container soft-card rounded-16">
        {["confirmed", "preparing", "shipped"].map((key, index) => {
          const labelMap: Record<
            string,
            { label: string; color: string; icon: string }
          > = {
            confirmed: {
              label: "Onaylandı",
              color: "success",
              icon: "ph-check-circle",
            },
            preparing: {
              label: "Hazırlanıyor",
              color: "warning",
              icon: "ph-clock",
            },
            shipped: { label: "Kargoda", color: "info", icon: "ph-truck" },
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
                <div className="meta-icon bg-primary-100 text-primary-700">
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
                <div className="meta-icon bg-primary-100 text-primary-700">
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
