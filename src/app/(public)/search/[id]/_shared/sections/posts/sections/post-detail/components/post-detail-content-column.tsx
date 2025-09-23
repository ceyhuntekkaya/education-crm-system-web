import React from "react";
import { usePostContext } from "../../../context";
import {
  PostDetailTitle,
  PostDetailEngagement,
  PostDetailContent,
  PostDetailHashtags,
  PostDetailCallToAction,
  PostDetailDetails,
  PostDetailAnalytics,
  PostDetailStatus,
} from ".";

const PostDetailContentColumn: React.FC = () => {
  const { selectedPost } = usePostContext();

  if (!selectedPost) return null;
  return (
    <div className="post-detail-content-column h-100 overflow-y-auto">
      <div className="p-24">
        {/* Title */}
        <PostDetailTitle />

        {/* Engagement Section */}
        <PostDetailEngagement />

        {/* Content */}
        <PostDetailContent />

        {/* Hashtags */}
        <PostDetailHashtags />

        {/* Call to Action */}
        <PostDetailCallToAction />

        {/* Post Details Section */}
        <div className="border-top border-neutral-200 pt-20">
          {/* Location and Tags */}
          <PostDetailDetails />

          {/* Advanced Analytics */}
          <PostDetailAnalytics />

          {/* Post Status and Settings */}
          <PostDetailStatus />
        </div>
      </div>
    </div>
  );
};

export default PostDetailContentColumn;
