import React, { useState } from "react";
import { formatEngagementCount, formatViewCount } from "../../../utils";

interface PostDetailEngagementProps {
  post: any;
}

const PostDetailEngagement: React.FC<PostDetailEngagementProps> = ({
  post,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="engagement-section mb-24">
      <div className="engagement-header mb-16">
        <h6 className="text-neutral-800 fs-14 fw-semibold mb-0 d-flex align-items-center gap-10">
          <div className="engagement-icon">
            <i className="ph ph-heart fs-14" />
          </div>
          Etkileşim Metrikleri
        </h6>
      </div>

      <div className="engagement-card">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-16">
          <div className="engagement-actions">
            <button
              className={`like-button ${isLiked ? "liked" : "unliked"}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <i className={`ph ${isLiked ? "ph-heart" : "ph-heart"}`} />
              <span>
                {formatEngagementCount(
                  (post.likeCount || 0) + (isLiked ? 1 : 0)
                )}
              </span>
            </button>

            <div className="engagement-metric">
              <div className="engagement-icon-circle engagement-view-icon">
                <i className="ph ph-eye fs-16" />
              </div>
              <span className="metric-value">
                {formatViewCount(post.viewCount)}
              </span>
            </div>
          </div>

          {(post.engagementScore || 0) > 0 && (
            <div className="engagement-score-container">
              <div className="engagement-icon-circle engagement-score-icon">
                <i className="ph ph-chart-line fs-16" />
              </div>
              <span className="score-value">
                {post.engagementScore?.toFixed(1)} skor
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailEngagement;
