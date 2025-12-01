import React from "react";
import type { MediaItemConfig } from "../types";
import { CustomImage } from "@/components";

/**
 * Medya bilgileri konfigürasyonu
 */
export const mediaConfig: MediaItemConfig[] = [
  {
    label: "Kapak Görseli",
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
    label: "Küçük Resim",
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
];
