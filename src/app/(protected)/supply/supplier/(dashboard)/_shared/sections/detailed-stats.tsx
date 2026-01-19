"use client";

import React from "react";
import { useDashboard } from "../context";

/**
 * Tedarikçi Dashboard Detaylı İstatistikler
 * Ürünler, Teklifler ve Siparişler detay kartları
 */
export const DetailedStats: React.FC = () => {
  const { summary, isLoading } = useDashboard();

  if (isLoading) {
    return null;
  }

  return (
    <div className="row g-20">
      {/* Ürün İstatistikleri */}
      <div className="col-md-4">
        <div className="card h-100">
          <div className="card-header border-bottom">
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-package text-main-600 text-xl"></i>
              <h6 className="mb-0">Ürün İstatistikleri</h6>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-16 pb-16 border-bottom">
              <span className="text-neutral-600">Toplam Ürün</span>
              <span className="fw-semibold">{summary.totalProducts || 0}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-neutral-600">Aktif Ürün</span>
              <span className="fw-semibold text-success-600">
                {summary.activeProducts || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Teklif İstatistikleri */}
      <div className="col-md-4">
        <div className="card h-100">
          <div className="card-header border-bottom">
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-clipboard-text text-purple-600 text-xl"></i>
              <h6 className="mb-0">Teklif İstatistikleri</h6>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-16 pb-16 border-bottom">
              <span className="text-neutral-600">Gönderilen</span>
              <span className="fw-semibold">
                {summary.submittedQuotations || 0}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-16 pb-16 border-bottom">
              <span className="text-neutral-600">Bekleyen</span>
              <span className="fw-semibold text-warning-600">
                {summary.pendingQuotations || 0}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-neutral-600">Kabul Edilen</span>
              <span className="fw-semibold text-success-600">
                {summary.acceptedQuotations || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sipariş İstatistikleri */}
      <div className="col-md-4">
        <div className="card h-100">
          <div className="card-header border-bottom">
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-shopping-cart text-main-600 text-xl"></i>
              <h6 className="mb-0">Sipariş İstatistikleri</h6>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-16 pb-16 border-bottom">
              <span className="text-neutral-600">Toplam Sipariş</span>
              <span className="fw-semibold">{summary.totalOrders || 0}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-16 pb-16 border-bottom">
              <span className="text-neutral-600">Bekleyen</span>
              <span className="fw-semibold text-warning-600">
                {summary.pendingOrders || 0}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-neutral-600">Tamamlanan</span>
              <span className="fw-semibold text-success-600">
                {summary.completedOrders || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
