import React from "react";
import { formatPostType, getPostTypeIcon } from "../../../utils";

interface PostDetailTitleProps {
  post: any;
}

const PostDetailTitle: React.FC<PostDetailTitleProps> = ({ post }) => {
  if (!post.title) return null;

  return (
    <div className="mb-20">
      <div className="d-flex align-items-start justify-content-between gap-12 mb-12">
        <h1 className="text-neutral-900 fw-bold fs-20 lh-base flex-1">
          {post.title}
        </h1>
        <div className="d-flex flex-column gap-12 flex-shrink-0">
          {/* Post Type Badge */}
          <span className="badge bg-main-50 text-main-600 px-12 py-6 rounded-pill fs-13 fw-medium">
            <i className={`${getPostTypeIcon(post.postType)} me-6`} />
            {formatPostType(post.postType)}
          </span>
          {post.isPinned && (
            <span className="badge bg-info-100 text-info-700 px-10 py-6 rounded-pill fs-11 fw-medium mt">
              <i className="ph ph-push-pin-fill me-4" />
              Sabitlendi
            </span>
          )}
          {post.isFeatured && (
            <span className="badge bg-warning-100 text-warning-700 px-10 py-6 rounded-pill fs-11 fw-medium">
              <i className="ph ph-star-fill me-4" />
              Öne Çıkan
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailTitle;
