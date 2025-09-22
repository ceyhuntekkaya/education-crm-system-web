import React from "react";
import Image from "next/image";
import { PostCardProps } from "../types";
import {
  getPostTypeIcon,
  formatViewCount,
  formatDate,
  formatPostType,
  formatEngagementCount,
  stripHtmlTags,
  truncateText,
} from "../utils/index";

const PostCard: React.FC<PostCardProps> = ({ post, onCardClick }) => {
  const handleCardClick = () => {
    if (onCardClick && post.id) {
      onCardClick(post.id);
    }
  };

  const getProfileImage = () => {
    // Placeholder profile image - replace with actual author avatar when available
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      post.authorName || "User"
    )}&background=6366f1&color=fff&size=40`;
  };

  return (
    <div className="social-post-card bg-white rounded-16 h-100 box-shadow-md cursor-pointer border border-neutral-30">
      {/* Post Header - Instagram style */}
      <div className="social-post-card__header p-16 border-bottom border-neutral-30">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-12">
            {/* Profile Image */}
            <div className="social-post-card__avatar">
              <Image
                src={getProfileImage()}
                alt={post.authorName || "User"}
                width={40}
                height={40}
                className="rounded-circle"
              />
            </div>

            {/* Author & School Info */}
            <div className="social-post-card__author-info">
              <h6 className="mb-0 fw-semibold text-neutral-800 fs-14">
                {post.authorName}
              </h6>
              <p className="mb-0 text-neutral-600 fs-12">{post.schoolName}</p>
            </div>
          </div>

          {/* Post Type & Options */}
          <div className="d-flex align-items-center gap-8">
            {/* Post Type Badge */}
            <div className="social-post-card__type-badge">
              <i
                className={`${getPostTypeIcon(post.postType)} text-main-600`}
              ></i>
            </div>

            {/* Options Dots */}
            <button className="btn btn-ghost btn-sm p-0">
              <i className="ph ph-dots-three text-neutral-500"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Post Media */}
      {post.featuredImageUrl && (
        <div className="social-post-card__media" onClick={handleCardClick}>
          <div className="position-relative">
            <Image
              src={post.featuredImageUrl}
              alt={post.title || ""}
              width={600}
              height={400}
              className="w-100"
              style={{ aspectRatio: "4/3", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            {/* Status & Feature Badges */}
            <div className="social-post-card__badges">
              {post.isPinned && (
                <div className="social-post-card__badge social-post-card__badge--pinned">
                  <i className="ph ph-push-pin-fill"></i>
                </div>
              )}
              {post.isFeatured && (
                <div className="social-post-card__badge social-post-card__badge--featured">
                  <i className="ph ph-star-fill"></i>
                </div>
              )}
            </div>

            {/* Multiple Images Indicator */}
            <div className="social-post-card__media-indicator">
              <i className="ph ph-stack text-white"></i>
            </div>
          </div>
        </div>
      )}

      {/* Post Actions - Instagram style */}
      <div className="social-post-card__actions p-16 pb-12">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-16">
            <button className="btn btn-ghost btn-sm p-0 social-post-card__action-btn">
              <i
                className="ph ph-heart text-neutral-700"
                style={{ fontSize: "24px" }}
              ></i>
            </button>
            <button className="btn btn-ghost btn-sm p-0 social-post-card__action-btn">
              <i
                className="ph ph-chat-circle text-neutral-700"
                style={{ fontSize: "24px" }}
              ></i>
            </button>
            <button className="btn btn-ghost btn-sm p-0 social-post-card__action-btn">
              <i
                className="ph ph-paper-plane-tilt text-neutral-700"
                style={{ fontSize: "24px" }}
              ></i>
            </button>
          </div>
          <button className="btn btn-ghost btn-sm p-0 social-post-card__action-btn">
            <i
              className="ph ph-bookmark text-neutral-700"
              style={{ fontSize: "24px" }}
            ></i>
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div
        className="social-post-card__content px-16 pb-16"
        onClick={handleCardClick}
      >
        {/* Engagement Stats */}
        {(post.likeCount || 0) > 0 && (
          <div className="social-post-card__likes mb-8">
            <span className="fw-semibold text-neutral-800 fs-14">
              {formatEngagementCount(post.likeCount)} beğeni
            </span>
          </div>
        )}

        {/* Post Title & Preview */}
        <div className="social-post-card__text">
          <span className="fw-semibold text-neutral-800 fs-14 me-8">
            {post.authorName}
          </span>
          <span className="text-neutral-700 fs-14">
            {post.title && truncateText(post.title, 100)}
          </span>
        </div>

        {/* View Comments */}
        {(post.commentCount || 0) > 0 && (
          <button className="btn btn-link p-0 social-post-card__view-comments mt-8">
            <span className="text-neutral-500 fs-14">
              {post.commentCount} yorumun tümünü gör
            </span>
          </button>
        )}

        {/* Post Date */}
        <div className="social-post-card__date mt-8">
          <span className="text-neutral-500 fs-12 text-uppercase">
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
