import React, { useState } from "react";
import Image from "next/image";
import { usePostContext } from "../context";
import { postMockData } from "../mock";
import {
  formatDate,
  formatViewCount,
  formatPostType,
  getPostTypeIcon,
  formatEngagementCount,
  stripHtmlTags,
  highlightHashtags,
} from "../utils";

const PostDetailModalContent: React.FC = () => {
  const { selectedPostId, close } = usePostContext();
  const [showFullContent, setShowFullContent] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const post = postMockData.find((p) => p.id === selectedPostId);

  if (!post) {
    return (
      <div className="social-post-modal-error text-center py-80">
        <i
          className="ph ph-warning-circle text-warning-500 mb-16"
          style={{ fontSize: "48px" }}
        ></i>
        <h3 className="text-neutral-700 mb-8">Gönderi Bulunamadı</h3>
        <p className="text-neutral-500 mb-24">
          İstediğiniz gönderi mevcut değil.
        </p>
        <button onClick={close} className="btn btn-outline-main">
          <i className="ph ph-arrow-left me-8"></i>
          Geri Dön
        </button>
      </div>
    );
  }

  const mediaAttachments = post.mediaAttachments
    ? JSON.parse(post.mediaAttachments)
    : [];

  return (
    <div className="social-post-modal">
      {/* Instagram-style Modal Layout */}
      <div className="row h-100 g-0">
        {/* Left Side - Media */}
        <div className="col-md-7 col-lg-8">
          <div className="social-post-modal__media-section h-100 bg-black d-flex align-items-center justify-content-center">
            {post.featuredImageUrl ? (
              <div className="position-relative w-100 h-100">
                <Image
                  src={post.featuredImageUrl}
                  alt={post.title || ""}
                  fill
                  style={{ objectFit: "contain" }}
                  className="social-post-modal__main-image"
                />
              </div>
            ) : post.videoUrl ? (
              <div className="social-post-modal__video-player w-100 h-100 d-flex align-items-center justify-content-center">
                <div className="text-center text-white">
                  <i
                    className="ph ph-play-circle mb-16"
                    style={{ fontSize: "64px" }}
                  ></i>
                  <p className="mb-8">Video Oynatıcı</p>
                  <p className="text-sm opacity-75">
                    Süre:{" "}
                    {post.videoDurationSeconds
                      ? Math.floor(post.videoDurationSeconds / 60)
                      : 0}
                    :
                    {String((post.videoDurationSeconds || 0) % 60).padStart(
                      2,
                      "0"
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <div className="social-post-modal__no-media d-flex align-items-center justify-content-center h-100">
                <div className="text-center text-white">
                  <i
                    className="ph ph-image mb-16"
                    style={{ fontSize: "64px" }}
                  ></i>
                  <p>Görsel bulunmuyor</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Content & Interactions */}
        <div className="col-md-5 col-lg-4">
          <div className="social-post-modal__content-section h-100 d-flex flex-column">
            {/* Header with Author Info */}
            <div className="social-post-modal__header border-bottom p-16">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-12">
                  <div className="social-post-modal__avatar">
                    <div className="avatar avatar-sm">
                      <i
                        className="ph ph-user-circle text-main-600"
                        style={{ fontSize: "32px" }}
                      ></i>
                    </div>
                  </div>
                  <div>
                    <div className="fw-semibold text-neutral-900 fs-14">
                      {post.author?.fullName}
                    </div>
                    <div className="text-neutral-600 fs-12">
                      {post.school?.name}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-8">
                  {post.isFeatured && (
                    <i
                      className="ph ph-star-fill text-warning-500"
                      title="Öne Çıkan"
                    ></i>
                  )}
                  {post.isPinned && (
                    <i
                      className="ph ph-push-pin-fill text-info-500"
                      title="Sabitlenmiş"
                    ></i>
                  )}
                  <button onClick={close} className="btn btn-ghost btn-sm">
                    <i className="ph ph-x"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Post Content - Scrollable */}
            <div
              className="social-post-modal__content flex-1 p-16"
              style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
            >
              {/* Post Title & Content */}
              <div className="mb-16">
                <h5 className="fw-bold text-neutral-900 mb-8">{post.title}</h5>

                {post.content && (
                  <div className="social-post-modal__text">
                    <div
                      className={`post-content lh-base ${
                        !showFullContent && post.content.length > 300
                          ? "post-content--truncated"
                          : ""
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: showFullContent
                          ? highlightHashtags(post.content)
                          : highlightHashtags(
                              post.content.substring(0, 300) +
                                (post.content.length > 300 ? "..." : "")
                            ),
                      }}
                    />

                    {post.content.length > 300 && (
                      <button
                        className="btn btn-link btn-sm p-0 mt-4 text-main-600"
                        onClick={() => setShowFullContent(!showFullContent)}
                      >
                        {showFullContent ? "daha az" : "devamını oku"}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Hashtags */}
              {post.hashtags && (
                <div className="mb-12">
                  <div className="d-flex flex-wrap gap-4">
                    {post.hashtags.split(",").map((tag, index) => (
                      <button
                        key={index}
                        className="btn btn-link btn-sm p-0 text-main-600 fs-13"
                      >
                        {tag.trim()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Post Meta */}
              <div className="social-post-modal__meta mb-16">
                <div className="text-neutral-500 fs-12">
                  {formatDate(post.publishedAt)}
                </div>
              </div>

              {/* Location */}
              {post.locationName && (
                <div className="social-post-modal__location mb-16">
                  <div className="d-flex align-items-center gap-8 text-neutral-600">
                    <i className="ph ph-map-pin fs-12"></i>
                    <span className="fs-12">{post.locationName}</span>
                  </div>
                </div>
              )}

              {/* Additional Media Attachments */}
              {mediaAttachments.length > 0 && (
                <div className="social-post-modal__attachments mb-16">
                  <div className="row g-8">
                    {mediaAttachments
                      .slice(0, 4)
                      .map((media: any, index: number) => (
                        <div key={index} className="col-6">
                          <div
                            className="social-attachment rounded-8 overflow-hidden position-relative"
                            style={{ aspectRatio: "1" }}
                          >
                            <Image
                              src={media.url}
                              alt={`Ek ${index + 1}`}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                            {index === 3 && mediaAttachments.length > 4 && (
                              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
                                <span className="text-white fw-bold">
                                  +{mediaAttachments.length - 4}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              {post.callToAction && post.ctaUrl && (
                <div className="social-post-modal__cta mb-16">
                  <a
                    href={post.ctaUrl}
                    className="btn btn-main btn-sm w-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.callToAction}
                    <i className="ph ph-arrow-square-out ms-8"></i>
                  </a>
                </div>
              )}
            </div>

            {/* Bottom Actions - Fixed */}
            <div className="social-post-modal__actions border-top">
              {/* Action Buttons */}
              <div className="p-16 pb-8">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-16">
                    <button
                      className={`btn btn-ghost btn-sm ${
                        isLiked ? "text-danger" : "text-neutral-600"
                      }`}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <i
                        className={`ph ${
                          isLiked ? "ph-heart-fill" : "ph-heart"
                        }`}
                        style={{ fontSize: "20px" }}
                      ></i>
                    </button>

                    <button className="btn btn-ghost btn-sm text-neutral-600">
                      <i
                        className="ph ph-chat-circle"
                        style={{ fontSize: "20px" }}
                      ></i>
                    </button>

                    <button className="btn btn-ghost btn-sm text-neutral-600">
                      <i
                        className="ph ph-paper-plane-tilt"
                        style={{ fontSize: "20px" }}
                      ></i>
                    </button>
                  </div>

                  <button
                    className={`btn btn-ghost btn-sm ${
                      isBookmarked ? "text-main-600" : "text-neutral-600"
                    }`}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <i
                      className={`ph ${
                        isBookmarked
                          ? "ph-bookmark-simple-fill"
                          : "ph-bookmark-simple"
                      }`}
                      style={{ fontSize: "20px" }}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="px-16 pb-16">
                <div className="social-post-modal__stats">
                  <div className="d-flex align-items-center gap-16 mb-8">
                    <span className="fw-semibold fs-14">
                      {formatEngagementCount(
                        (post.likeCount || 0) + (isLiked ? 1 : 0)
                      )}{" "}
                      beğeni
                    </span>
                    <span className="text-neutral-600 fs-14">
                      {formatEngagementCount(post.commentCount || 0)} yorum
                    </span>
                  </div>

                  <div className="d-flex align-items-center gap-16 text-neutral-500 fs-12">
                    <span>{formatViewCount(post.viewCount)} görüntülenme</span>
                    <span>
                      {formatEngagementCount(post.shareCount)} paylaşım
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModalContent;
