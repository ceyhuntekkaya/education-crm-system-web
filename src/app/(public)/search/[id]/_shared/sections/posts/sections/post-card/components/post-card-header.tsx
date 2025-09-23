import React from "react";
import Image from "next/image";
import {
  formatDate,
  formatPostType,
  getPostTypeIcon,
} from "../../../utils/index";

interface PostCardHeaderProps {
  authorName?: string;
  schoolName?: string;
  publishedAt?: string;
  postType?: string;
}

const PostCardHeader: React.FC<PostCardHeaderProps> = ({
  authorName,
  schoolName,
  publishedAt,
  postType,
}) => {
  const getProfileImage = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      authorName || "User"
    )}&background=6366f1&color=fff&size=40&rounded=true`;
  };

  return (
    <div className="p-16 border-bottom border-neutral-30">
      <div className="d-flex align-items-start justify-content-between">
        <div className="post-card__profile-section">
          <div className="post-card__avatar-container">
            <Image
              src={getProfileImage()}
              alt={authorName || "User"}
              width={40}
              height={40}
              className="rounded-8"
            />
          </div>
          <div className="post-card__user-info">
            <h6 className="mb-4 fw-semibold text-neutral-800 post-card__author-name">
              {authorName}
            </h6>
            <p className="mb-4 text-neutral-600 text-sm post-card__school-name">
              {schoolName}
            </p>
            <time className="text-neutral-500 text-xs post-card__timestamp">
              {formatDate(publishedAt)}
            </time>
          </div>
        </div>

        <div className="d-flex align-items-center gap-8">
          <span
            className="px-8 py-4 rounded-pill text-xs fw-medium"
            style={{
              backgroundColor: "#6366f120",
              color: "#6366f1",
            }}
          >
            <i className={`${getPostTypeIcon(postType)} me-4`}></i>
            {formatPostType(postType)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCardHeader;
