import React from "react";
import type { StatisticsItemConfig } from "../types";
import { formatFileSize } from "../utils";
import { formatNumber } from "@/utils/format-number";

/**
 * İstatistikler konfigürasyonu
 */
export const statisticsConfig: StatisticsItemConfig[] = [
  {
    label: "Galeri İstatistikleri",
    value: (gallery) => (
      <div className="row g-2 mb-1">
        <div className="col-6">
          <div className="text-center p-2 bg-primary-50 rounded">
            <div className="fs-7 mb-1 text-primary-600 fw-semibold">
              <i className="ph ph-images me-1"></i>
              {formatNumber(gallery?.itemCount || 0)}
            </div>
            <small className="text-primary-700" style={{ fontSize: "0.7rem" }}>
              Medya Öğesi
            </small>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center p-2 bg-success-50 rounded">
            <div className="fs-7 mb-1 text-success-600 fw-semibold">
              <i className="ph ph-eye me-1"></i>
              {formatNumber(gallery?.viewCount || 0)}
            </div>
            <small className="text-success-700" style={{ fontSize: "0.7rem" }}>
              Görüntüleme
            </small>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center p-2 bg-info-50 rounded">
            <div className="fs-7 mb-1 text-info-600 fw-semibold">
              <i className="ph ph-download me-1"></i>
              {formatNumber(gallery?.downloadCount || 0)}
            </div>
            <small className="text-info-700" style={{ fontSize: "0.7rem" }}>
              İndirme
            </small>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center p-2 bg-warning-50 rounded">
            <div className="fs-7 mb-1 text-warning-600 fw-semibold">
              <i className="ph ph-hard-drive me-1"></i>
              {formatFileSize(gallery?.totalSizeBytes)}
            </div>
            <small className="text-warning-700" style={{ fontSize: "0.7rem" }}>
              Depolama
            </small>
          </div>
        </div>
      </div>
    ),
    isShowing: () => true,
  },
  {
    label: "Performans Oranları",
    value: (gallery) => {
      const viewCount = gallery?.viewCount || 0;
      const downloadCount = gallery?.downloadCount || 0;
      const itemCount = gallery?.itemCount || 0;

      const downloadRate =
        viewCount > 0 ? ((downloadCount / viewCount) * 100).toFixed(1) : "0";
      const avgViewPerItem =
        itemCount > 0 ? Math.round(viewCount / itemCount) : 0;
      const avgDownloadPerItem =
        itemCount > 0 ? Math.round(downloadCount / itemCount) : 0;

      return (
        <div className="row g-2 mb-1">
          <div className="col-4">
            <div className="text-center p-2 bg-success-50 rounded">
              <div className="fs-7 mb-1 text-success-600 fw-semibold">
                <i className="ph ph-percent me-2"></i>%{downloadRate}
              </div>
              <small
                className="text-success-700"
                style={{ fontSize: "0.7rem" }}
              >
                İndirme Oranı
              </small>
            </div>
          </div>
          <div className="col-4">
            <div className="text-center p-2 bg-info-50 rounded">
              <div className="fs-7 mb-1 text-info-600 fw-semibold">
                <i className="ph ph-eye me-2"></i>
                {formatNumber(avgViewPerItem)}
              </div>
              <small className="text-info-700" style={{ fontSize: "0.7rem" }}>
                Öğe Başı Görüntüleme
              </small>
            </div>
          </div>
          <div className="col-4">
            <div className="text-center p-2 bg-warning-50 rounded">
              <div className="fs-7 mb-1 text-warning-600 fw-semibold">
                <i className="ph ph-download me-2"></i>
                {formatNumber(avgDownloadPerItem)}
              </div>
              <small
                className="text-warning-700"
                style={{ fontSize: "0.7rem" }}
              >
                Öğe Başı İndirme
              </small>
            </div>
          </div>
        </div>
      );
    },
    isShowing: (gallery) =>
      (gallery?.viewCount || 0) > 0 || (gallery?.downloadCount || 0) > 0,
  },
];
