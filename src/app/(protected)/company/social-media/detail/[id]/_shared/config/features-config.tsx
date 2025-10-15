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
      <div className="d-flex align-items-center gap-3">
        <div
          className={`badge ${
            post?.isFeatured
              ? "bg-warning-subtle text-warning"
              : "bg-secondary-subtle text-secondary"
          } fw-semibold px-3 py-2`}
        >
          <i
            className={`ph ${
              post?.isFeatured ? "ph-star-fill" : "ph-star"
            } me-1`}
          ></i>
          {formatBoolean(post?.isFeatured)}
        </div>
        {post?.isFeatured && (
          <small className="text-warning fw-medium">
            <i className="ph ph-lightning me-1"></i>
            Bu post öne çıkarılmış olarak gösteriliyor
          </small>
        )}
      </div>
    ),
    isShowing: () => true,
  },
  {
    label: "Sabitlenmiş Post",
    value: (post) => (
      <div className="d-flex align-items-center gap-3">
        <div
          className={`badge ${
            post?.isPinned
              ? "bg-info-subtle text-info"
              : "bg-secondary-subtle text-secondary"
          } fw-semibold px-3 py-2`}
        >
          <i
            className={`ph ${
              post?.isPinned ? "ph-push-pin-fill" : "ph-push-pin"
            } me-1`}
          ></i>
          {formatBoolean(post?.isPinned)}
        </div>
        {post?.isPinned && (
          <small className="text-info fw-medium">
            <i className="ph ph-thumbs-up me-1"></i>
            Bu post sayfanın üst kısmında sabitlendi
          </small>
        )}
      </div>
    ),
    isShowing: () => true,
  },
  {
    label: "Moderasyon Durumu",
    value: (post) => (
      <div className="d-flex align-items-center gap-3">
        <div
          className={`badge ${
            post?.isModerated
              ? "bg-success-subtle text-success"
              : "bg-warning-subtle text-warning"
          } fw-semibold px-3 py-2`}
        >
          <i
            className={`ph ${
              post?.isModerated ? "ph-shield-check" : "ph-shield-warning"
            } me-1`}
          ></i>
          {post?.isModerated ? "Onaylandı" : "Beklemede"}
        </div>
        {post?.isModerated && (
          <small className="text-success fw-medium">
            <i className="ph ph-check-circle me-1"></i>
            Moderatör tarafından incelenmiş ve onaylanmış
          </small>
        )}
      </div>
    ),
    isShowing: (post) => post?.isModerated !== undefined,
  },
  {
    label: "Rapor Durumu",
    value: (post) => (
      <div className="d-flex align-items-center gap-3">
        <div
          className={`badge ${
            post?.isFlagged
              ? "bg-danger-subtle text-danger"
              : "bg-success-subtle text-success"
          } fw-semibold px-3 py-2`}
        >
          <i
            className={`ph ${
              post?.isFlagged ? "ph-flag" : "ph-shield-check"
            } me-1`}
          ></i>
          {post?.isFlagged ? "Raporlandı" : "Temiz"}
        </div>
        {post?.flagCount !== undefined && post?.flagCount > 0 && (
          <small className="text-danger fw-medium">
            <i className="ph ph-warning me-1"></i>
            {post.flagCount} rapor alındı
          </small>
        )}
      </div>
    ),
    isShowing: () => true,
  },
];
