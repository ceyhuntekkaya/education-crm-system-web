import React from "react";
import type { BasicInfoItemConfig } from "../types";
import { formatBoolean } from "../utils";
import { PostDto } from "@/types";

/**
 * Post özel özellikler konfigürasyonu (Öne çıkarma, sabitleme vs.)
 */
export const featuresConfig: BasicInfoItemConfig[] = [
  {
    label: "Öne Çıkarılan Post",
    value: (post) => (
      <span
        className={`badge ${
          post?.isFeatured
            ? "bg-warning-subtle text-warning"
            : "bg-secondary-subtle text-secondary"
        } fw-semibold`}
      >
        <i
          className={`ph-fill ${post?.isFeatured ? "ph-star" : "ph-star"} me-4`}
        ></i>
        {formatBoolean(post?.isFeatured)}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Sabitlenmiş Post",
    value: (post) => (
      <span
        className={`badge ${
          post?.isPinned
            ? "bg-info-subtle text-info"
            : "bg-secondary-subtle text-secondary"
        } fw-semibold`}
      >
        <i
          className={`ph-fill ${
            post?.isPinned ? "ph-push-pin" : "ph-push-pin"
          } me-4`}
        ></i>
        {formatBoolean(post?.isPinned)}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Moderasyon Durumu",
    value: (post) => (
      <span
        className={`badge ${
          post?.isModerated
            ? "bg-success-subtle text-success"
            : "bg-warning-subtle text-warning"
        } fw-semibold`}
      >
        <i
          className={`ph ${
            post?.isModerated ? "ph-shield-check" : "ph-shield-warning"
          } me-4`}
        ></i>
        {post?.isModerated ? "Onaylandı" : "Beklemede"}
      </span>
    ),
    isShowing: (post) => post?.isModerated !== undefined,
  },
  {
    label: "Rapor Durumu",
    value: (post) => (
      <span
        className={`badge ${
          post?.isFlagged
            ? "bg-danger-subtle text-danger"
            : "bg-success-subtle text-success"
        } fw-semibold`}
      >
        <i
          className={`ph ${
            post?.isFlagged ? "ph-flag" : "ph-shield-check"
          } me-4`}
        ></i>
        {post?.isFlagged ? "Rapor landı" : "Temiz"}
        {post?.flagCount !== undefined && post?.flagCount > 0 && (
          <span className="ms-2 badge bg-danger text-white fw-semibold">
            {post.flagCount}
          </span>
        )}
      </span>
    ),
    isShowing: () => true,
  },
];
