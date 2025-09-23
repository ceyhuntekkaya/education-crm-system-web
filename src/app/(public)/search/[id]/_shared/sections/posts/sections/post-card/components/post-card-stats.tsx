import React from "react";
import { formatEngagementCount, formatViewCount } from "../../../utils/index";

interface PostCardStatsProps {
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
}

const PostCardStats: React.FC<PostCardStatsProps> = ({
  likeCount,
  commentCount,
  viewCount,
}) => {
  return (
    <div className="d-flex align-items-center gap-16">
      {(likeCount || 0) > 0 && (
        <div className="d-flex align-items-center gap-4 text-neutral-600">
          <i className="ph ph-heart text-danger-600"></i>
          <span className="text-sm">{formatEngagementCount(likeCount)}</span>
        </div>
      )}

      {(commentCount || 0) > 0 && (
        <div className="d-flex align-items-center gap-4 text-neutral-600">
          <i className="ph ph-chat-circle text-info-600"></i>
          <span className="text-sm">{formatEngagementCount(commentCount)}</span>
        </div>
      )}

      {(viewCount || 0) > 0 && (
        <div className="d-flex align-items-center gap-4 text-neutral-600">
          <i className="ph ph-eye text-neutral-500"></i>
          <span className="text-sm">{formatViewCount(viewCount)}</span>
        </div>
      )}
    </div>
  );
};

export default PostCardStats;
