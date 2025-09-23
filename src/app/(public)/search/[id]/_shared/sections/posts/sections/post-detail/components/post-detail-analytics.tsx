import React from "react";
import { formatEngagementCount } from "../../../utils";

interface PostDetailAnalyticsProps {
  post: any;
}

const PostDetailAnalytics: React.FC<PostDetailAnalyticsProps> = ({ post }) => {
  const hasAnalytics =
    post.reachCount ||
    post.impressionCount ||
    post.clickCount ||
    post.averageReadTimeSeconds;

  if (!hasAnalytics) return null;

  return (
    <div className="mb-20 analytics-section">
      <div className="analytics-header mb-16">
        <h6 className="text-neutral-800 fs-14 fw-semibold mb-0 d-flex align-items-center gap-10">
          <div className="analytics-icon">
            <i className="ph ph-chart-line-up fs-14" />
          </div>
          Performans Metrikleri
        </h6>
      </div>

      <div className="analytics-grid">
        {post.reachCount && (
          <div className="analytics-card reach-card">
            <div className="analytics-value">
              {formatEngagementCount(post.reachCount)}
            </div>
            <div className="analytics-label">Erişim</div>
          </div>
        )}

        {post.impressionCount && (
          <div className="analytics-card impression-card">
            <div className="analytics-value">
              {formatEngagementCount(post.impressionCount)}
            </div>
            <div className="analytics-label">Gösterim</div>
          </div>
        )}

        {post.clickCount && (
          <div className="analytics-card click-card">
            <div className="analytics-value">
              {formatEngagementCount(post.clickCount)}
            </div>
            <div className="analytics-label">Tıklama</div>
          </div>
        )}

        {post.averageReadTimeSeconds && (
          <div className="analytics-card read-time-card">
            <div className="analytics-value">
              {Math.floor(post.averageReadTimeSeconds / 60)}dk
            </div>
            <div className="analytics-label">Okuma Süresi</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailAnalytics;
