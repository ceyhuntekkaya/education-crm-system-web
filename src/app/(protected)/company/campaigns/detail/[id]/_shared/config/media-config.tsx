import React from "react";
import type { MediaItemConfig } from "../types";
import { CustomImage } from "@/components";

/**
 * Medya bilgileri konfigürasyonu
 */
export const mediaConfig: MediaItemConfig[] = [
  {
    label: "Banner Görseli",
    value: (campaign) =>
      campaign?.bannerImageUrl ? (
        <div className="d-flex align-items-center gap-2">
          <CustomImage
            src={campaign.bannerImageUrl}
            alt="Banner"
            width={100}
            height={60}
            className="rounded-8"
            style={{ objectFit: "cover" }}
          />
          <span className="text-success">
            <i className="ph ph-check-circle me-1"></i>
            Mevcut
          </span>
        </div>
      ) : null,
    isShowing: (campaign) => !!campaign?.bannerImageUrl,
  },
  {
    label: "Küçük Görsel",
    value: (campaign) =>
      campaign?.thumbnailImageUrl ? (
        <div className="d-flex align-items-center gap-2">
          <CustomImage
            src={campaign.thumbnailImageUrl}
            alt="Thumbnail"
            width={60}
            height={60}
            className="rounded-8"
            style={{ objectFit: "cover" }}
          />
          <span className="text-success">
            <i className="ph ph-check-circle me-1"></i>
            Mevcut
          </span>
        </div>
      ) : null,
    isShowing: (campaign) => !!campaign?.thumbnailImageUrl,
  },
  {
    label: "Video",
    value: (campaign) =>
      campaign?.videoUrl ? (
        <div className="d-flex align-items-center gap-2">
          <i className="ph ph-play-circle fs-2 text-primary"></i>
          <div>
            <div className="text-success">
              <i className="ph ph-check-circle me-1"></i>
              Video Mevcut
            </div>
            <small className="text-muted">{campaign.videoUrl}</small>
          </div>
        </div>
      ) : null,
    isShowing: (campaign) => !!campaign?.videoUrl,
  },
  {
    label: "CTA Metni",
    value: (campaign) => (
      <span className="badge bg-primary-subtle text-primary fw-semibold">
        {campaign?.ctaText}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.ctaText,
  },
  {
    label: "CTA URL",
    value: (campaign) => (
      <a
        href={campaign?.ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none"
      >
        <i className="ph ph-link-simple me-1"></i>
        {campaign?.ctaUrl}
      </a>
    ),
    isShowing: (campaign) => !!campaign?.ctaUrl,
  },
  {
    label: "Rozet",
    value: (campaign) => (
      <span
        className="badge fw-semibold"
        style={{
          backgroundColor: campaign?.badgeColor || "#6c757d",
          color: "white",
        }}
      >
        {campaign?.badgeText}
      </span>
    ),
    isShowing: (campaign) => !!campaign?.badgeText,
  },
];
