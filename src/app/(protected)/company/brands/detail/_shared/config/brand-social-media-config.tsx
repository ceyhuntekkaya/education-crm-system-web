import React from "react";
import type { BrandSocialMediaConfig } from "../types";

interface SocialMediaCardProps {
  platform: string;
  url: string;
  backgroundColor: string;
  color: string;
  iconClass: string;
}

/**
 * Sosyal medya kartı komponenti - Kod tekrarını önlemek için
 */
const SocialMediaCard: React.FC<SocialMediaCardProps> = ({
  platform,
  url,
  backgroundColor,
  color,
  iconClass,
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="d-flex align-items-center gap-12 p-12 rounded-8 bg-neutral-25 hover-bg-neutral-50 text-decoration-none transition-all"
  >
    <div
      className="d-flex align-items-center justify-content-center rounded-circle"
      style={{
        width: "32px",
        height: "32px",
        backgroundColor,
        color,
      }}
    >
      <i className={iconClass} style={{ fontSize: "16px" }} />
    </div>
    <div className="flex-grow-1">
      <span className="fw-medium text-neutral-800">{platform}</span>
      <p className="text-sm text-neutral-600 mb-0">
        {url.replace(/^https?:\/\/(www\.)?/, "")}
      </p>
    </div>
    <i className="ph ph-arrow-square-out text-neutral-500" />
  </a>
);

/**
 * Sosyal medya bilgileri konfigürasyonu
 */
export const brandSocialMediaConfig: BrandSocialMediaConfig[] = [
  {
    label: "Facebook",
    value: (brand) =>
      brand?.facebookUrl ? (
        <SocialMediaCard
          platform="Facebook"
          url={brand.facebookUrl}
          backgroundColor="#1877F215"
          color="#1877F2"
          iconClass="ph ph-facebook-logo"
        />
      ) : (
        <span className="text-neutral-500">Facebook hesabı mevcut değil</span>
      ),
    isShowing: (brand) => !!brand?.facebookUrl,
  },
  {
    label: "Twitter",
    value: (brand) =>
      brand?.twitterUrl ? (
        <SocialMediaCard
          platform="Twitter"
          url={brand.twitterUrl}
          backgroundColor="#1DA1F215"
          color="#1DA1F2"
          iconClass="ph ph-twitter-logo"
        />
      ) : (
        <span className="text-neutral-500">Twitter hesabı mevcut değil</span>
      ),
    isShowing: (brand) => !!brand?.twitterUrl,
  },
  {
    label: "Instagram",
    value: (brand) =>
      brand?.instagramUrl ? (
        <SocialMediaCard
          platform="Instagram"
          url={brand.instagramUrl}
          backgroundColor="#E4405F15"
          color="#E4405F"
          iconClass="ph ph-instagram-logo"
        />
      ) : (
        <span className="text-neutral-500">Instagram hesabı mevcut değil</span>
      ),
    isShowing: (brand) => !!brand?.instagramUrl,
  },
  {
    label: "LinkedIn",
    value: (brand) =>
      brand?.linkedinUrl ? (
        <SocialMediaCard
          platform="LinkedIn"
          url={brand.linkedinUrl}
          backgroundColor="#0A66C215"
          color="#0A66C2"
          iconClass="ph ph-linkedin-logo"
        />
      ) : (
        <span className="text-neutral-500">LinkedIn hesabı mevcut değil</span>
      ),
    isShowing: (brand) => !!brand?.linkedinUrl,
  },
  {
    label: "YouTube",
    value: (brand) =>
      brand?.youtubeUrl ? (
        <SocialMediaCard
          platform="YouTube"
          url={brand.youtubeUrl}
          backgroundColor="#FF000015"
          color="#FF0000"
          iconClass="ph ph-youtube-logo"
        />
      ) : (
        <span className="text-neutral-500">YouTube kanalı mevcut değil</span>
      ),
    isShowing: (brand) => !!brand?.youtubeUrl,
  },
];
