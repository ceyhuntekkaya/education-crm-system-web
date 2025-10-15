import React from "react";
import type { MetaInfoItemConfig } from "../types";

/**
 * Meta bilgiler konfigürasyonu
 */
export const metaInfoConfig: MetaInfoItemConfig[] = [
  {
    label: "SEO Başlık",
    value: (gallery) => (
      <div className="card border-0 bg-primary-50 p-3">
        <div className="d-flex align-items-start gap-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-white"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="ph ph-article text-primary fs-5"></i>
          </div>
          <div className="flex-grow-1">
            <div className="fw-semibold text-primary-700 mb-1">
              {gallery?.metaTitle || "SEO başlık belirlenmemiş"}
            </div>
            <small className="text-primary-600">
              Arama motorları için optimize edilmiş başlık
            </small>
          </div>
        </div>
      </div>
    ),
    isShowing: (gallery) => !!gallery?.metaTitle,
  },
  {
    label: "SEO Açıklama",
    value: (gallery) => (
      <div className="card border-0 bg-secondary-50 p-3">
        <div className="d-flex align-items-start gap-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-white"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="ph ph-text-aa text-secondary fs-5"></i>
          </div>
          <div className="flex-grow-1">
            <div className="fw-semibold text-secondary-700 mb-1">
              {gallery?.metaDescription || "SEO açıklama belirlenmemiş"}
            </div>
            <small className="text-secondary-600">
              Arama sonuçlarında görünecek açıklama metni
            </small>
          </div>
        </div>
      </div>
    ),
    isShowing: (gallery) => !!gallery?.metaDescription,
  },
  {
    label: "Anahtar Kelimeler ve Etiketler",
    value: (gallery) => (
      <div className="card border-0 bg-info-50 p-3">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-white"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="ph ph-hash text-info fs-5"></i>
          </div>
          <div>
            <div className="fw-semibold text-info-700">Galeri Etiketleri</div>
            <small className="text-info-600">
              SEO ve arama optimizasyonu için
            </small>
          </div>
        </div>

        {gallery?.tags ? (
          <div className="d-flex flex-wrap gap-2">
            {gallery.tags.split(",").map((tag: string, index: number) => (
              <span
                key={index}
                className="badge bg-white text-info fw-semibold border border-info-200"
              >
                <i className="ph ph-tag me-1"></i>
                {tag.trim()}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-center py-3 text-info-600">
            <i className="ph ph-tag-slash fs-4 mb-2 d-block"></i>
            <small>Henüz etiket eklenmemiş</small>
          </div>
        )}

        {gallery?.tags && (
          <div className="mt-3 pt-2 border-top border-info-200">
            <small className="text-info-600">
              <i className="ph ph-lightbulb me-1"></i>
              Bu etiketler arama motorları tarafından indexlenir
            </small>
          </div>
        )}
      </div>
    ),
    isShowing: () => true,
  },
];
