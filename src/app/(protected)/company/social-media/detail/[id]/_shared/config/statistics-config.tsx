import React from "react";
import type { StatisticsItemConfig } from "../types";
import { formatNumber } from "@/utils/format-number";
import { PostDto } from "@/types";

/**
 * Post performans istatistikleri konfigürasyonu (Campaign tarzı tasarım)
 */
export const statisticsConfig: StatisticsItemConfig[] = [
  {
    label: "Temel Etkileşim Metrikleri",
    value: (post: PostDto | null) => (
      <div className="row g-2 mb-1">
        <div className="col-6 col-lg-3">
          <div className="text-center p-2 bg-primary-50 rounded border">
            <div className="fw-bold text-primary-600 fs-5">
              {formatNumber(post?.viewCount || 0)}
            </div>
            <small className="text-primary-600">Görüntülenme</small>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="text-center p-2 bg-success-50 rounded border">
            <div className="fw-bold text-success-600 fs-5">
              {formatNumber(post?.likeCount || 0)}
            </div>
            <small className="text-success-600">Beğeni</small>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="text-center p-2 bg-info-50 rounded border">
            <div className="fw-bold text-info-600 fs-5">
              {formatNumber(post?.commentCount || 0)}
            </div>
            <small className="text-info-600">Yorum</small>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="text-center p-2 bg-warning-50 rounded border">
            <div className="fw-bold text-warning-600 fs-5">
              {formatNumber(post?.shareCount || 0)}
            </div>
            <small className="text-warning-600">Paylaşım</small>
          </div>
        </div>
      </div>
    ),
    isShowing: () => true,
  },
  {
    label: "Görüntülenme Sayısı",
    value: (post) => (
      <span className="fw-semibold text-info-600">
        <i className="ph ph-eye me-2"></i>
        {formatNumber(post?.viewCount || 0)}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Tıklanma Sayısı",
    value: (post) => (
      <span className="fw-semibold text-warning-600">
        <i className="ph ph-cursor-click me-2"></i>
        {formatNumber(post?.clickCount || 0)}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "CTR (Tıklama Oranı)",
    value: (post) => {
      if (!post?.viewCount || !post?.clickCount)
        return (
          <span className="fw-semibold text-neutral-500">
            <i className="ph ph-target me-2"></i>%0.00
          </span>
        );

      const ctr = (post.clickCount / post.viewCount) * 100;
      const colorClass =
        ctr >= 5 ? "text-success" : ctr >= 2 ? "text-warning" : "text-danger";

      return (
        <span className={`fw-semibold ${colorClass}`}>
          <i className="ph ph-target me-2"></i>%{ctr.toFixed(2)}
        </span>
      );
    },
    isShowing: () => true,
  },
  {
    label: "Beğeni / Yorum",
    value: (post: PostDto | null) => (
      <div className="row g-2 mb-1">
        <div className="col-6">
          <div className="text-center p-2 bg-danger-50 rounded">
            <div className="fw-bold text-danger-600 fs-5">
              {formatNumber(post?.likeCount || 0)}
            </div>
            <small className="text-danger-600">Beğeni</small>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center p-2 bg-info-50 rounded">
            <div className="fw-bold text-info-600 fs-5">
              {formatNumber(post?.commentCount || 0)}
            </div>
            <small className="text-info-600">Yorum</small>
          </div>
        </div>
      </div>
    ),
    isShowing: (post) =>
      post?.likeCount !== undefined || post?.commentCount !== undefined,
  },
  {
    label: "Erişim & Gösterim",
    value: (post: PostDto | null) => (
      <div className="row g-2 mb-1">
        <div className="col-6">
          <div className="text-center p-2 bg-indigo-50 rounded">
            <div className="fw-bold text-indigo-600 fs-5">
              {formatNumber(post?.reachCount || 0)}
            </div>
            <small className="text-indigo-600">Erişim</small>
          </div>
        </div>
        <div className="col-6">
          <div className="text-center p-2 bg-teal-50 rounded">
            <div className="fw-bold text-teal-600 fs-5">
              {formatNumber(post?.impressionCount || 0)}
            </div>
            <small className="text-teal-600">Gösterim</small>
          </div>
        </div>
      </div>
    ),
    isShowing: (post: PostDto | null) =>
      (post?.reachCount || 0) > 0 || (post?.impressionCount || 0) > 0,
  },
  {
    label: "Etkileşim Skoru",
    value: (post: PostDto | null) => {
      const score = post?.engagementScore || 0;
      const colorClass =
        score >= 10
          ? "text-success"
          : score >= 5
          ? "text-warning"
          : "text-danger";

      return (
        <span className={`fw-semibold ${colorClass}`}>
          <i className="ph ph-chart-line me-2"></i>%{score.toFixed(2)}
        </span>
      );
    },
    isShowing: (post: PostDto | null) => post?.engagementScore !== undefined,
  },
  {
    label: "Performans Özeti",
    value: (post: PostDto | null) => (
      <div className="row g-2 mb-1">
        <div className="col-6 col-lg-4">
          <div className="text-center p-2 bg-primary-50 rounded border">
            <div className="fw-bold text-primary-600 fs-5">
              {formatNumber(post?.viewCount || 0)}
            </div>
            <small className="text-primary-600">Görüntülenme</small>
          </div>
        </div>
        <div className="col-6 col-lg-4">
          <div className="text-center p-2 bg-success-50 rounded border">
            <div className="fw-bold text-success-600 fs-5">
              {formatNumber(post?.clickCount || 0)}
            </div>
            <small className="text-success-600">Tıklama</small>
          </div>
        </div>
        <div className="col-6 col-lg-4">
          <div className="text-center p-2 bg-warning-50 rounded border">
            <div className="fw-bold text-warning-600 fs-5">
              {post?.engagementScore?.toFixed(1) || "0.0"}%
            </div>
            <small className="text-warning-600">Etkileşim</small>
          </div>
        </div>
      </div>
    ),
    isShowing: (post: PostDto | null) =>
      !!(post?.viewCount || post?.clickCount || post?.engagementScore),
  },
  {
    label: "Ortalama Okuma Süresi",
    value: (post: PostDto | null) => {
      const readTime = post?.averageReadTimeSeconds;
      if (!readTime)
        return <span className="text-neutral-500">Belirtilmemiş</span>;

      const minutes = Math.floor(readTime / 60);
      const seconds = readTime % 60;

      return (
        <span className="fw-semibold text-orange-600">
          <i className="ph ph-clock me-2"></i>
          {minutes > 0 ? `${minutes}dk ` : ""}
          {seconds}sn
        </span>
      );
    },
    isShowing: (post: PostDto | null) => !!post?.averageReadTimeSeconds,
  },
];
