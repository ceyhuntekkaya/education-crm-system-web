import React from "react";
import type { StatisticsItemConfig } from "../types";
import { formatNumber } from "@/utils/format-number";

/**
 * İstatistik bilgileri konfigürasyonu
 */
export const statisticsConfig: StatisticsItemConfig[] = [
  {
    label: "Görüntülenme Sayısı",
    value: (campaign) => (
      <span className="fw-semibold text-info-600">
        <i className="ph ph-eye me-2"></i>
        {formatNumber(campaign?.viewCount || 0)}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Tıklanma Sayısı",
    value: (campaign) => (
      <span className="fw-semibold text-warning-600">
        <i className="ph ph-cursor-click me-2"></i>
        {formatNumber(campaign?.clickCount || 0)}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Dönüşüm Oranı",
    value: (campaign) => {
      const rate = campaign?.conversionRate || 0;
      const colorClass =
        rate >= 10
          ? "text-success"
          : rate >= 5
          ? "text-warning"
          : "text-danger";

      return (
        <span className={`fw-semibold ${colorClass}`}>
          <i className="ph ph-chart-line me-2"></i>%{rate.toFixed(2)}
        </span>
      );
    },
    isShowing: (campaign) => campaign?.conversionRate !== undefined,
  },
  {
    label: "CTR (Tıklama Oranı)",
    value: (campaign) => {
      if (!campaign?.viewCount || !campaign?.clickCount) return null;

      const ctr = (campaign.clickCount / campaign.viewCount) * 100;
      const colorClass =
        ctr >= 5 ? "text-success" : ctr >= 2 ? "text-warning" : "text-danger";

      return (
        <span className={`fw-semibold ${colorClass}`}>
          <i className="ph ph-target me-2"></i>%{ctr.toFixed(2)}
        </span>
      );
    },
    isShowing: (campaign) => !!(campaign?.viewCount && campaign?.clickCount),
  },
  {
    label: "Başvuru / Dönüşüm",
    value: (campaign) => (
      <div className="row g-2 mb-1">
        <div className="col-6">
          <div className="text-center p-2 bg-info-50 rounded">
            <div className="fw-bold text-info-600 fs-5">
              {formatNumber(campaign?.applicationCount || 0)}
            </div>
            <small className="text-info-600">Başvuru</small>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center p-2 bg-warning-50 rounded">
            <div className="fw-bold text-warning-600 fs-5">
              {formatNumber(campaign?.conversionCount || 0)}
            </div>
            <small className="text-warning-600">Dönüşüm</small>
          </div>
        </div>
      </div>
    ),
    isShowing: (campaign) =>
      campaign?.applicationCount !== undefined ||
      campaign?.conversionCount !== undefined,
  },
  {
    label: "Görüntülenme / Tıklama",
    value: (campaign) => (
      <div className="row g-2 mb-1">
        <div className="col-6">
          <div className="text-center p-2 bg-primary-50 rounded">
            <div className="fw-bold text-primary-600 fs-5">
              {formatNumber(campaign?.viewCount || 0)}
            </div>
            <small className="text-primary-600">Görüntülenme</small>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center p-2 bg-success-50 rounded">
            <div className="fw-bold text-success-600 fs-5">
              {formatNumber(campaign?.clickCount || 0)}
            </div>
            <small className="text-success-600">Tıklama</small>
          </div>
        </div>
      </div>
    ),
    isShowing: (campaign) =>
      campaign?.viewCount !== undefined || campaign?.clickCount !== undefined,
  },
  {
    label: "Performans Özeti",
    value: (campaign) => (
      <div className="row g-2 mb-1">
        <div className="col-6 col-lg-3">
          <div className="text-center p-2 bg-primary-50 rounded border">
            <div className="fw-bold text-primary-600 fs-5">
              {formatNumber(campaign?.viewCount || 0)}
            </div>
            <small className="text-primary-600">Görüntülenme</small>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="text-center p-2 bg-success-50 rounded border">
            <div className="fw-bold text-success-600 fs-5">
              {formatNumber(campaign?.clickCount || 0)}
            </div>
            <small className="text-success-600">Tıklama</small>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="text-center p-2 bg-info-50 rounded border">
            <div className="fw-bold text-info-600 fs-5">
              {formatNumber(campaign?.applicationCount || 0)}
            </div>
            <small className="text-info-600">Başvuru</small>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="text-center p-2 bg-warning-50 rounded border">
            <div className="fw-bold text-warning-600 fs-5">
              {formatNumber(campaign?.conversionCount || 0)}
            </div>
            <small className="text-warning-600">Dönüşüm</small>
          </div>
        </div>
      </div>
    ),
    isShowing: (campaign) =>
      !!(
        campaign?.viewCount ||
        campaign?.clickCount ||
        campaign?.applicationCount ||
        campaign?.conversionCount
      ),
  },
];
