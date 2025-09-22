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
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      post.authorName || "User"
    )}&background=6366f1&color=fff&size=40&rounded=true`;
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white hover-shadow-md transition-all cursor-pointer" onClick={handleCardClick}>
      {/* Kart Başlığı */}
      <div className="p-20 border-bottom border-neutral-30">
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-start gap-12 flex-1">
            <div className="flex-shrink-0">
              <Image
                src={getProfileImage()}
                alt={post.authorName || "User"}
                width={40}
                height={40}
                className="rounded-8"
              />
            </div>
            <div className="flex-1 min-width-0">
              <h6 className="mb-4 fw-semibold text-neutral-800 text-truncate">
                {post.authorName}
              </h6>
              <p className="mb-4 text-neutral-600 text-sm text-truncate">
                {post.schoolName}
              </p>
              <time className="text-neutral-500 text-xs">
                {formatDate(post.publishedAt)}
              </time>
            </div>
          </div>
          
          <div className="d-flex align-items-center gap-8">
            <span 
              className="px-8 py-4 rounded-pill text-xs fw-medium"
              style={{
                backgroundColor: '#6366f120',
                color: '#6366f1'
              }}
            >
              <i className={`${getPostTypeIcon(post.postType)} me-4`}></i>
              {formatPostType(post.postType)}
            </span>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="p-20">
        {post.title && (
          <h5 className="mb-12 fw-semibold text-neutral-800 line-height-1-4">
            {truncateText(post.title, 100)}
          </h5>
        )}
      {post.featuredImageUrl && (
        <div className="social-post-card__media" onClick={handleCardClick}>
          <div className="social-post-card__media-container">
            <Image
              src={post.featuredImageUrl}
              alt={post.title || "Post görseli"}
              width={600}
              height={400}
              className="social-post-card__media-image"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <div className="social-post-card__badges">
              {post.isPinned && (
                <span className="social-post-card__badge social-post-card__badge--pinned">
                  <i className="ph ph-push-pin-fill"></i>
                  <span>Sabitlenmiş</span>
                </span>
              )}
              {post.isFeatured && (
                <span className="social-post-card__badge social-post-card__badge--featured">
                  <i className="ph ph-star-fill"></i>
                  <span>Öne Çıkan</span>
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Post Stats */}
      <div className="social-post-card__stats">
        {(post.likeCount || 0) > 0 && (
          <div className="social-post-card__stat">
            <span className="social-post-card__stat-value">
              {formatEngagementCount(post.likeCount)}
            </span>
            <span className="social-post-card__stat-label">beğeni</span>
          </div>
        )}

        {(post.commentCount || 0) > 0 && (
          <div className="social-post-card__stat">
            <span className="social-post-card__stat-value">
              {formatEngagementCount(post.commentCount)}
            </span>
            <span className="social-post-card__stat-label">yorum</span>
          </div>
        )}

        {(post.viewCount || 0) > 0 && (
          <div className="social-post-card__stat">
            <span className="social-post-card__stat-value">
              {formatViewCount(post.viewCount)}
            </span>
            <span className="social-post-card__stat-label">görüntüleme</span>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="social-post-card__actions">
        <div className="social-post-card__action-group">
          <button
            className="social-post-card__action-btn social-post-card__action-btn--like"
            aria-label="Beğen"
          >
            <i className="ph ph-heart"></i>
            <span>Beğen</span>
          </button>

          <button
            className="social-post-card__action-btn social-post-card__action-btn--comment"
            aria-label="Yorum yap"
            onClick={handleCardClick}
          >
            <i className="ph ph-chat-circle"></i>
            <span>Yorum</span>
          </button>

          <button
            className="social-post-card__action-btn social-post-card__action-btn--share"
            aria-label="Paylaş"
          >
            <i className="ph ph-paper-plane-tilt"></i>
            <span>Paylaş</span>
          </button>
        </div>

        <div className="social-post-card__secondary-actions">
          <button
            className="social-post-card__action-btn social-post-card__action-btn--bookmark"
            aria-label="Kaydet"
          >
            <i className="ph ph-bookmark"></i>
          </button>
        </div>
      </div>

      {/* Post Footer */}
      <footer className="social-post-card__footer">
        <div className="social-post-card__meta">
          <span className="social-post-card__post-type">
            {formatPostType(post.postType)}
          </span>
        </div>
      </footer>
    </article>
  );
};

export default PostCard;
