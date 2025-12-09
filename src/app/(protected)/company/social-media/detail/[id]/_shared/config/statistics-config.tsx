import React from "react";
import type { StatisticsItemConfig } from "../types";
import { formatNumber } from "@/utils/format-number";
import { PostDto } from "@/types";

/**
 * Post performans istatistikleri konfigürasyonu
 */
export const statisticsConfig: StatisticsItemConfig[] = [
  {
    label: "Görüntülenme",
    value: (post: PostDto | null) => (
      <span className="badge bg-primary-subtle text-primary">
        <i className="ph-fill ph-eye me-4"></i>
        {formatNumber(post?.viewCount || 0)}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Beğeni",
    value: (post: PostDto | null) => (
      <span className="badge bg-danger-subtle text-danger">
        <i className="ph-fill ph-heart me-4"></i>
        {formatNumber(post?.likeCount || 0)}
      </span>
    ),
    isShowing: () => true,
  },
  {
    label: "Etkileşim Skoru",
    value: (post: PostDto | null) => {
      const score = post?.engagementScore || 0;
      const colorClass =
        score >= 10 ? "success" : score >= 5 ? "warning" : "danger";

      return (
        <span className={`badge bg-${colorClass}-subtle text-${colorClass}`}>
          <i className="ph-fill ph-chart-line-up me-4"></i>
          {score.toFixed(2)}%
        </span>
      );
    },
    isShowing: (post: PostDto | null) => post?.engagementScore !== undefined,
  },
];
