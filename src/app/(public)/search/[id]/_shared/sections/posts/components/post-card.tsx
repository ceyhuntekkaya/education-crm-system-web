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
    <div
      className="border border-neutral-30 rounded-12 bg-white hover-shadow-md transition-all cursor-pointer h-100 d-flex flex-column"
      onClick={handleCardClick}
    >
      {/* Kart Başlığı */}
      <div className="p-16 border-bottom border-neutral-30">
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
                backgroundColor: "#6366f120",
                color: "#6366f1",
              }}
            >
              <i className={`${getPostTypeIcon(post.postType)} me-4`}></i>
              {formatPostType(post.postType)}
            </span>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="p-16 flex-grow-1 d-flex flex-column">
        {post.title && (
          <h5 className="mb-12 fw-semibold text-neutral-800 line-height-1-4 flex-grow-1">
            {truncateText(post.title, 100)}
          </h5>
        )}

        {/* Medya Görseli */}
        {post.featuredImageUrl && (
          <div className="mb-16">
            <div
              className="position-relative rounded-8 overflow-hidden"
              style={{ height: "200px" }}
            >
              <Image
                src={post.featuredImageUrl}
                alt={post.title || "Post görseli"}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              {/* Rozet İşaretleri */}
              <div className="position-absolute top-0 end-0 p-8">
                {post.isPinned && (
                  <span className="badge bg-info text-white me-4">
                    <i className="ph ph-push-pin-fill me-4"></i>
                    Sabitlenmiş
                  </span>
                )}
                {post.isFeatured && (
                  <span className="badge bg-warning text-white">
                    <i className="ph ph-star-fill me-4"></i>
                    Öne Çıkan
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* İstatistikler */}
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-16">
            {(post.likeCount || 0) > 0 && (
              <div className="d-flex align-items-center gap-4 text-neutral-600">
                <i className="ph ph-heart text-danger-600"></i>
                <span className="text-sm">
                  {formatEngagementCount(post.likeCount)}
                </span>
              </div>
            )}

            {(post.commentCount || 0) > 0 && (
              <div className="d-flex align-items-center gap-4 text-neutral-600">
                <i className="ph ph-chat-circle text-info-600"></i>
                <span className="text-sm">
                  {formatEngagementCount(post.commentCount)}
                </span>
              </div>
            )}

            {(post.viewCount || 0) > 0 && (
              <div className="d-flex align-items-center gap-4 text-neutral-600">
                <i className="ph ph-eye text-neutral-500"></i>
                <span className="text-sm">
                  {formatViewCount(post.viewCount)}
                </span>
              </div>
            )}
          </div>

          {/* Aksiyon Butonları */}
          <div className="d-flex align-items-center gap-8">
            <button
              className="btn btn-ghost btn-sm px-8 py-4"
              aria-label="Beğen"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="ph ph-heart"></i>
            </button>

            <button
              className="btn btn-ghost btn-sm px-8 py-4"
              aria-label="Yorum yap"
              onClick={handleCardClick}
            >
              <i className="ph ph-chat-circle"></i>
            </button>

            <button
              className="btn btn-ghost btn-sm px-8 py-4"
              aria-label="Paylaş"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="ph ph-paper-plane-tilt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
