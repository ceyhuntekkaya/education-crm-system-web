import React from "react";
import { formatEngagementCount } from "../../../utils";
import { usePostContext } from "../../../context/post-context";

const PostDetailAnalytics: React.FC = () => {
  const { selectedPost } = usePostContext();

  const hasAnalytics =
    selectedPost?.reachCount ||
    selectedPost?.impressionCount ||
    selectedPost?.clickCount ||
    selectedPost?.averageReadTimeSeconds;

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
        {selectedPost?.reachCount && (
          <div className="analytics-card reach-card">
            <div className="analytics-value">
              {formatEngagementCount(selectedPost.reachCount)}
            </div>
            <div className="analytics-label">Erişim</div>
          </div>
        )}

        {selectedPost?.impressionCount && (
          <div className="analytics-card impression-card">
            <div className="analytics-value">
              {formatEngagementCount(selectedPost.impressionCount)}
            </div>
            <div className="analytics-label">Gösterim</div>
          </div>
        )}

        {selectedPost?.clickCount && (
          <div className="analytics-card click-card">
            <div className="analytics-value">
              {formatEngagementCount(selectedPost.clickCount)}
            </div>
            <div className="analytics-label">Tıklama</div>
          </div>
        )}

        {selectedPost?.averageReadTimeSeconds && (
          <div className="analytics-card read-time-card">
            <div className="analytics-value">
              {Math.floor(selectedPost.averageReadTimeSeconds / 60)}dk
            </div>
            <div className="analytics-label">Okuma Süresi</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailAnalytics;
