import React from "react";
import type { CampusSocialMediaConfig } from "../types";

/**
 * Sosyal medya bilgileri konfigürasyonu
 */
export const campusSocialMediaConfig: CampusSocialMediaConfig[] = [
  {
    label: "Facebook",
    value: (campus) =>
      campus?.facebookUrl ? (
        <a
          href={campus.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-info-600 text-decoration-none d-flex align-items-center gap-2"
        >
          <i className="ph-fill ph-facebook-logo"></i>
          <span className="text-truncate" style={{ maxWidth: "300px" }}>
            {campus.facebookUrl.replace(/^https?:\/\/(www\.)?/, "")}
          </span>
          <i className="ph ph-arrow-square-out text-xs"></i>
        </a>
      ) : (
        <span className="text-neutral-500">Facebook hesabı mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.facebookUrl,
  },
  {
    label: "Twitter",
    value: (campus) =>
      campus?.twitterUrl ? (
        <a
          href={campus.twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-info-600 text-decoration-none d-flex align-items-center gap-2"
        >
          <i className="ph-fill ph-twitter-logo"></i>
          <span className="text-truncate" style={{ maxWidth: "300px" }}>
            {campus.twitterUrl.replace(/^https?:\/\/(www\.)?/, "")}
          </span>
          <i className="ph ph-arrow-square-out text-xs"></i>
        </a>
      ) : (
        <span className="text-neutral-500">Twitter hesabı mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.twitterUrl,
  },
  {
    label: "Instagram",
    value: (campus) =>
      campus?.instagramUrl ? (
        <a
          href={campus.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-info-600 text-decoration-none d-flex align-items-center gap-2"
        >
          <i className="ph-fill ph-instagram-logo"></i>
          <span className="text-truncate" style={{ maxWidth: "300px" }}>
            {campus.instagramUrl.replace(/^https?:\/\/(www\.)?/, "")}
          </span>
          <i className="ph ph-arrow-square-out text-xs"></i>
        </a>
      ) : (
        <span className="text-neutral-500">Instagram hesabı mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.instagramUrl,
  },
  {
    label: "LinkedIn",
    value: (campus) =>
      campus?.linkedinUrl ? (
        <a
          href={campus.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-info-600 text-decoration-none d-flex align-items-center gap-2"
        >
          <i className="ph-fill ph-linkedin-logo"></i>
          <span className="text-truncate" style={{ maxWidth: "300px" }}>
            {campus.linkedinUrl.replace(/^https?:\/\/(www\.)?/, "")}
          </span>
          <i className="ph ph-arrow-square-out text-xs"></i>
        </a>
      ) : (
        <span className="text-neutral-500">LinkedIn hesabı mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.linkedinUrl,
  },
  {
    label: "YouTube",
    value: (campus) =>
      campus?.youtubeUrl ? (
        <a
          href={campus.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-info-600 text-decoration-none d-flex align-items-center gap-2"
        >
          <i className="ph-fill ph-youtube-logo"></i>
          <span className="text-truncate" style={{ maxWidth: "300px" }}>
            {campus.youtubeUrl.replace(/^https?:\/\/(www\.)?/, "")}
          </span>
          <i className="ph ph-arrow-square-out text-xs"></i>
        </a>
      ) : (
        <span className="text-neutral-500">YouTube hesabı mevcut değil</span>
      ),
    isShowing: (campus) => !!campus?.youtubeUrl,
  },
];
