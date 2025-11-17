import React from "react";
import type { BasicInfoItemConfig } from "../types";
import {
  translatePostType,
  translatePostStatus,
  formatBoolean,
} from "../utils";
import { PostDto } from "@/types";

/**
 * Post temel bilgiler konfigürasyonu
 */
export const basicInfoConfig: BasicInfoItemConfig[] = [
  {
    label: "Gönderi Başlığı",
    value: (post) => (
      <span className="fw-semibold text-primary-600 fs-5">
        <i className="ph ph-article me-2"></i>
        {post?.title || "Başlık belirtilmemiş"}
      </span>
    ),
    isShowing: (post) => !!post?.title,
  },
  {
    label: "İçerik",
    value: (post) => (
      <div className="p-3 bg-neutral-25 ">
        <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
          {post?.content || "İçerik girilmemiş"}
        </div>
      </div>
    ),
    isShowing: (post) => !!post?.content,
  },
  {
    label: "Gönderi Türü",
    value: (post) => (
      <span className="badge bg-info-subtle text-info fw-semibold px-3 py-2">
        <i className="ph ph-tag me-1"></i>
        {translatePostType(post?.postType)}
      </span>
    ),
    isShowing: (post) => !!post?.postType,
  },
  {
    label: "Yayın Durumu",
    value: (post) => {
      const status = post?.status;
      const badgeClass =
        status === "PUBLISHED"
          ? "bg-success-subtle text-success"
          : status === "DRAFT"
          ? "bg-warning-subtle text-warning"
          : status === "SCHEDULED"
          ? "bg-info-subtle text-info"
          : status === "ARCHIVED"
          ? "bg-secondary-subtle text-secondary"
          : status === "DELETED" || status === "REJECTED"
          ? "bg-danger-subtle text-danger"
          : "bg-neutral-subtle text-neutral";

      return (
        <span className={`badge fw-semibold px-3 py-2 ${badgeClass}`}>
          <i className="ph ph-circle-fill me-1 fs-14"></i>
          {translatePostStatus(post?.status)}
        </span>
      );
    },
    isShowing: (post) => !!post?.status,
  },
  {
    label: "URL Slug",
    value: (post) => (
      <div className="d-flex align-items-center gap-2">
        <i className="ph ph-link-simple text-primary"></i>
        <span className="font-monospace text-primary fw-medium">
          /{post?.slug || "belirtilmemiş"}
        </span>
      </div>
    ),
    isShowing: (post) => !!post?.slug,
  },

  {
    label: "Aktif Durum",
    value: (post) => (
      <span
        className={`badge ${
          post?.isActive
            ? "bg-success-subtle text-success"
            : "bg-secondary-subtle text-secondary"
        } fw-semibold px-3 py-2`}
      >
        <i
          className={`ph ${
            post?.isActive ? "ph-check-circle" : "ph-x-circle"
          } me-1`}
        ></i>
        {post?.isActive ? "Aktif" : "Pasif"}
      </span>
    ),
    isShowing: (post) => post?.isActive !== undefined,
  },
];
