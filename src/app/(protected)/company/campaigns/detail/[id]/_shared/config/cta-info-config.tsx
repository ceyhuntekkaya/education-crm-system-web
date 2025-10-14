import React from "react";
import type { CtaInfoItemConfig } from "../types";
import { CustomImage } from "@/components";

/**
 * CTA ve görsel bilgiler konfigürasyonu - minimal ve temiz tasarım
 * Alt alta düzenlenmiş basit yapı
 */
export const ctaInfoConfig: CtaInfoItemConfig[] = [
  {
    label: "Kampanya Görselleri",
    value: (campaign: any) => (
      <div className="d-flex flex-column gap-3">
        {campaign?.bannerImageUrl && (
          <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
            <CustomImage
              src={campaign.bannerImageUrl}
              alt="Banner"
              width={80}
              height={50}
              className="rounded border"
              style={{ objectFit: "cover" }}
            />
            <div className="flex-grow-1">
              <div className="fw-semibold text-dark">Banner Görseli</div>
              <div className="small text-muted">Ana kampanya görseli</div>
            </div>
          </div>
        )}

        {campaign?.thumbnailImageUrl && (
          <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
            <CustomImage
              src={campaign.thumbnailImageUrl}
              alt="Thumbnail"
              width={80}
              height={50}
              className="rounded border"
              style={{ objectFit: "cover" }}
            />
            <div className="flex-grow-1">
              <div className="fw-semibold text-dark">Küçük Resim</div>
              <div className="small text-muted">Önizleme görseli</div>
            </div>
          </div>
        )}

        {campaign?.iconImageUrl && (
          <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
            <CustomImage
              src={campaign.iconImageUrl}
              alt="Icon"
              width={50}
              height={50}
              className="rounded border"
              style={{ objectFit: "cover" }}
            />
            <div className="flex-grow-1">
              <div className="fw-semibold text-dark">İkon Görseli</div>
              <div className="small text-muted">Küçük ikon</div>
            </div>
          </div>
        )}

        {campaign?.backgroundImageUrl && (
          <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
            <CustomImage
              src={campaign.backgroundImageUrl}
              alt="Background"
              width={80}
              height={50}
              className="rounded border"
              style={{ objectFit: "cover" }}
            />
            <div className="flex-grow-1">
              <div className="fw-semibold text-dark">Arkaplan Görseli</div>
              <div className="small text-muted">Sayfa arkaplanı</div>
            </div>
          </div>
        )}

        {!campaign?.bannerImageUrl &&
          !campaign?.thumbnailImageUrl &&
          !campaign?.iconImageUrl &&
          !campaign?.backgroundImageUrl && (
            <div className="text-center text-muted py-4">
              <i className="ph ph-image mb-2" style={{ fontSize: "2rem" }}></i>
              <p className="mb-0">Henüz kampanya görseli eklenmemiş</p>
            </div>
          )}
      </div>
    ),
    isShowing: (campaign: any) =>
      !!(
        campaign?.bannerImageUrl ||
        campaign?.thumbnailImageUrl ||
        campaign?.iconImageUrl ||
        campaign?.backgroundImageUrl
      ),
  },
  {
    label: "Call-to-Action Bilgileri",
    value: (campaign: any) => (
      <div className="d-flex flex-column gap-3">
        {campaign?.ctaText && (
          <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
            <div
              className="bg-primary text-white rounded d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px", minWidth: "40px" }}
            >
              <i className="ph ph-cursor-click"></i>
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold text-dark">CTA Metni</div>
              <div className="text-muted">&ldquo;{campaign.ctaText}&rdquo;</div>
            </div>
          </div>
        )}

        {campaign?.ctaUrl && (
          <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
            <div
              className="bg-success text-white rounded d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px", minWidth: "40px" }}
            >
              <i className="ph ph-link"></i>
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold text-dark">CTA URL</div>
              <div className="text-muted small text-break">
                {campaign.ctaUrl}
              </div>
            </div>
          </div>
        )}

        {!campaign?.ctaText && !campaign?.ctaUrl && (
          <div className="text-center text-muted py-4">
            <i
              className="ph ph-cursor-click mb-2"
              style={{ fontSize: "2rem" }}
            ></i>
            <p className="mb-0">Henüz CTA bilgisi eklenmemiş</p>
          </div>
        )}
      </div>
    ),
    isShowing: (campaign: any) => !!(campaign?.ctaText || campaign?.ctaUrl),
  },
  {
    label: "Rozet ve Promo Kod",
    value: (campaign: any) => (
      <div className="d-flex flex-column gap-3">
        {campaign?.badgeText && (
          <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
            <div
              className="bg-info text-white rounded d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px", minWidth: "40px" }}
            >
              <i className="ph ph-medal"></i>
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold text-dark">Rozet Metni</div>
              <div>
                <span
                  className="badge px-2 py-1"
                  style={{
                    backgroundColor: campaign.badgeColor || "#007bff",
                    color: "#fff",
                  }}
                >
                  {campaign.badgeText}
                </span>
              </div>
            </div>
          </div>
        )}

        {campaign?.promoCode && (
          <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
            <div
              className="bg-warning text-white rounded d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px", minWidth: "40px" }}
            >
              <i className="ph ph-ticket"></i>
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold text-dark">Promo Kodu</div>
              <div className="font-monospace text-warning-emphasis fw-bold">
                {campaign.promoCode}
              </div>
            </div>
          </div>
        )}

        {!campaign?.badgeText && !campaign?.promoCode && (
          <div className="text-center text-muted py-4">
            <i className="ph ph-medal mb-2" style={{ fontSize: "2rem" }}></i>
            <p className="mb-0">Henüz rozet veya promo kod eklenmemiş</p>
          </div>
        )}
      </div>
    ),
    isShowing: (campaign: any) =>
      !!(campaign?.badgeText || campaign?.badgeColor || campaign?.promoCode),
  },
];
