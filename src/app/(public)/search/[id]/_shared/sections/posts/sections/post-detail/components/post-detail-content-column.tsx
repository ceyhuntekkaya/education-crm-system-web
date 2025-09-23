import React from "react";
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

interface PostDetailContentColumnProps {
  post: any;
}

const PostDetailContentColumn: React.FC<PostDetailContentColumnProps> = ({
  post,
}) => {
  return (
    <div className="post-detail-content-column h-100 overflow-y-auto">
      <div className="p-24">
        {/* Title */}
        <PostDetailTitle post={post} />

        {/* Engagement Section */}
        <PostDetailEngagement post={post} />

        {/* Content */}
        <PostDetailContent post={post} />

        {/* Hashtags */}
        <PostDetailHashtags post={post} />

        {/* Call to Action */}
        <PostDetailCallToAction post={post} />

        {/* Post Details Section */}
        <div className="border-top border-neutral-200 pt-20">
          {/* Location and Tags */}
          <PostDetailDetails post={post} />

          {/* Advanced Analytics */}
          <PostDetailAnalytics post={post} />

          {/* Post Status and Settings */}
          <PostDetailStatus post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailContentColumn;
