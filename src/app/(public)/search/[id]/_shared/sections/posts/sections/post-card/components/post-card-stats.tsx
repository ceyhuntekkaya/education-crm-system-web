import React from "react";
import { PostSummaryDto } from "@/types/dto/content";
import { formatEngagementCount, formatViewCount } from "../../../utils/index";

interface PostCardStatsProps {
  post: PostSummaryDto;
}

const PostCardStats: React.FC<PostCardStatsProps> = ({ post }) => {
  const { likeCount, commentCount, viewCount } = post;
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
