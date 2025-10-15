import React from "react";
import type { MetaInfoItemConfig } from "../types";
import { PostDto } from "@/types";

/**
 * Post meta bilgileri konfigürasyonu
 */
export const metaInfoConfig: MetaInfoItemConfig[] = [
  {
    label: "Meta Başlık",
    value: (post: PostDto | null) => (
      <div className="p-3 bg-info-25 rounded-8 border border-info-100">
        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="ph ph-browsers text-info"></i>
          <span className="fw-semibold text-info fs-14">SEO Başlık</span>
        </div>
        <p className="mb-0 text-neutral-700 fs-14">
          {post?.metaTitle || "Meta başlık belirtilmemiş"}
        </p>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.metaTitle,
  },
  {
    label: "Meta Açıklama",
    value: (post: PostDto | null) => (
      <div className="p-3 bg-success-25 rounded-8 border border-success-100">
        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="ph ph-text-aa text-success"></i>
          <span className="fw-semibold text-success fs-14">SEO Açıklama</span>
        </div>
        <p className="mb-0 text-neutral-700 fs-14">
          {post?.metaDescription || "Meta açıklama belirtilmemiş"}
        </p>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.metaDescription,
  },
  {
    label: "Etiketler",
    value: (post: PostDto | null) => {
      const tags = post?.tags;
      if (!tags) return <span className="text-neutral-500">Etiket yok</span>;

      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      return (
        <div className="d-flex flex-wrap gap-2">
          {tagArray.map((tag, index) => (
            <span
              key={index}
              className="badge bg-primary-subtle text-primary fw-medium"
            >
              <i className="ph ph-tag me-1"></i>
              {tag}
            </span>
          ))}
        </div>
      );
    },
    isShowing: (post: PostDto | null) => !!post?.tags,
  },
  {
    label: "Hashtag'ler",
    value: (post: PostDto | null) => {
      const hashtags = post?.hashtags;
      if (!hashtags)
        return <span className="text-neutral-500">Hashtag yok</span>;

      const hashtagArray = hashtags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      return (
        <div className="d-flex flex-wrap gap-2">
          {hashtagArray.map((hashtag, index) => (
            <span
              key={index}
              className="badge bg-info-subtle text-info fw-medium"
            >
              <i className="ph ph-hash me-1"></i>
              {hashtag.startsWith("#") ? hashtag : `#${hashtag}`}
            </span>
          ))}
        </div>
      );
    },
    isShowing: (post: PostDto | null) => !!post?.hashtags,
  },
  {
    label: "Lokasyon Bilgisi",
    value: (post: PostDto | null) => (
      <div className="p-3 bg-danger-25 rounded-8 border border-danger-100">
        <div className="d-flex align-items-start gap-3">
          <i className="ph ph-map-pin text-danger fs-4"></i>
          <div className="flex-grow-1">
            <div className="fw-semibold text-danger mb-1">
              {post?.locationName || "Lokasyon belirtilmemiş"}
            </div>
            {(post?.latitude || post?.longitude) && (
              <div className="text-danger-600 fs-14 font-monospace">
                <i className="ph ph-navigation-arrow me-1"></i>
                {post.latitude?.toFixed(6)}, {post.longitude?.toFixed(6)}
              </div>
            )}
            {post?.locationName && (
              <button className="btn btn-outline-danger btn-sm mt-2">
                <i className="ph ph-map-trifold me-1"></i>
                Haritada Göster
              </button>
            )}
          </div>
        </div>
      </div>
    ),
    isShowing: (post: PostDto | null) =>
      !!(post?.locationName || post?.latitude || post?.longitude),
  },
];
