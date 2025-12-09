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
        <i className="ph ph-article me-4"></i>
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
      <span className="badge bg-info-subtle text-info fw-semibold">
        <i className="ph ph-tag me-4"></i>
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

      const iconClass =
        status === "PUBLISHED"
          ? "ph-check-circle"
          : status === "DRAFT"
          ? "ph-file-text"
          : status === "SCHEDULED"
          ? "ph-clock"
          : status === "ARCHIVED"
          ? "ph-archive"
          : status === "DELETED" || status === "REJECTED"
          ? "ph-x-circle"
          : "ph-circle";

      return (
        <span className={`badge fw-semibold ${badgeClass}`}>
          <i className={`ph ${iconClass} me-4`}></i>
          {translatePostStatus(post?.status)}
        </span>
      );
    },
    isShowing: (post) => !!post?.status,
  },
  {
    label: "Aktif Durum",
    value: (post) => (
      <span
        className={`badge ${
          post?.isActive
            ? "bg-success-subtle text-success"
            : "bg-secondary-subtle text-secondary"
        } fw-semibold`}
      >
        <i
          className={`ph ${
            post?.isActive ? "ph-check-circle" : "ph-x-circle"
          } me-4`}
        ></i>
        {post?.isActive ? "Aktif" : "Pasif"}
      </span>
    ),
    isShowing: (post) => post?.isActive !== undefined,
  },
];
