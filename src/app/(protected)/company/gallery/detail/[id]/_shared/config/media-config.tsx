import React from "react";
import type { MediaItemConfig } from "../types";
import CustomImage from "@/components/ui/custom-image";

/**
 * Medya konfigürasyonu
 */
export const mediaConfig: MediaItemConfig[] = [
  {
    label: "Kapak Görseli",
    value: (gallery) =>
      gallery?.coverImageUrl ? (
        <div className="card border-0 bg-light p-3">
          <div className="d-flex align-items-center gap-3">
            <CustomImage
              src={gallery.coverImageUrl}
              alt="Galeri Kapak Görseli"
              width={120}
              height={80}
              className="rounded border"
              style={{ objectFit: "cover" }}
            />
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-success-subtle text-success fw-semibold">
                  <i className="ph ph-check-circle me-1"></i>
                  Kapak Görseli Mevcut
                </span>
              </div>
              <div className="text-neutral-600">
                <i className="ph ph-image me-1"></i>
                Galerinin ön yüz görseli
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card border-0 bg-warning-50 p-3">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center bg-white border rounded"
              style={{ width: "120px", height: "80px" }}
            >
              <i className="ph ph-image text-neutral-400 fs-3"></i>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-warning-subtle text-warning fw-semibold">
                  <i className="ph ph-warning-circle me-1"></i>
                  Kapak Görseli Yok
                </span>
              </div>
              <div className="text-neutral-600">
                Galeri için kapak görseli belirlenmemiş
              </div>
            </div>
          </div>
        </div>
      ),
    isShowing: () => true,
  },
];
