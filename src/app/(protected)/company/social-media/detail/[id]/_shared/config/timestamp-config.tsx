import React from "react";
import type { TimestampItemConfig } from "../types";
import { PostDto } from "@/types";

/**
 * Tarih formatlaması yardımcı fonksiyonu
 */
const formatDate = (dateString?: string): string => {
  if (!dateString) return "Belirtilmemiş";

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  } catch {
    return "Geçersiz tarih";
  }
};

/**
 * Post zaman damgaları konfigürasyonu
 */
export const timestampConfig: TimestampItemConfig[] = [
  {
    label: "Oluşturma Tarihi",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-2">
        <i className="ph ph-calendar-plus text-success me-4"></i>
        <span className="text-neutral-700">{formatDate(post?.createdAt)}</span>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.createdAt,
  },
  {
    label: "Yayın Tarihi",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-2">
        <i className="ph ph-calendar-check text-primary me-4"></i>
        <span className="text-neutral-700">
          {formatDate(post?.publishedAt)}
        </span>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.publishedAt,
  },
  {
    label: "Zamanlanmış Tarih",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-2">
        <i className="ph ph-calendar-clock text-warning me-4"></i>
        <span className="text-neutral-700">
          {formatDate(post?.scheduledAt)}
        </span>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.scheduledAt,
  },
  {
    label: "Son Geçerlilik",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-2">
        <i className="ph ph-calendar-x text-danger me-4"></i>
        <span className="text-neutral-700">{formatDate(post?.expiresAt)}</span>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.expiresAt,
  },
  {
    label: "Sabitleme Sonu",
    value: (post: PostDto | null) => (
      <div className="d-flex align-items-center gap-2">
        <i className="ph ph-push-pin-slash text-orange me-4"></i>
        <span className="text-neutral-700">
          {formatDate(post?.pinExpiresAt)}
        </span>
      </div>
    ),
    isShowing: (post: PostDto | null) => !!post?.pinExpiresAt,
  },
];
