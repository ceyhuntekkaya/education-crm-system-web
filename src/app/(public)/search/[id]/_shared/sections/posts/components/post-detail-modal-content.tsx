import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Modal, Button } from "@/components/ui";
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
  const [currentMedia, setCurrentMedia] = useState<{
    type: "image" | "video";
    url: string;
    thumbnailUrl?: string;
    duration?: number;
  } | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const post = postMockData.find((p) => p.id === selectedPostId);

  // Initialize current media on component mount
  useEffect(() => {
    if (post) {
      if (post.videoUrl) {
        setCurrentMedia({
          type: "video",
          url: post.videoUrl,
          thumbnailUrl: post.videoThumbnailUrl,
          duration: post.videoDurationSeconds,
        });
      } else if (post.featuredImageUrl) {
        setCurrentMedia({
          type: "image",
          url: post.featuredImageUrl,
        });
      }
    }
  }, [post]);

  // Handle media switching
  const handleMediaSwitch = (mediaItem: any) => {
    if (mediaItem.type === "video") {
      setCurrentMedia({
        type: "video",
        url: mediaItem.url,
        thumbnailUrl: mediaItem.thumbnailUrl,
        duration: mediaItem.duration,
      });
      setIsVideoPlaying(false);
    } else if (mediaItem.type === "image") {
      setCurrentMedia({
        type: "image",
        url: mediaItem.url,
      });
      setIsVideoPlaying(false);
    }
  };

  // Handle video play
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  // Handle thumbnail clicks (switch back to original)
  const handleOriginalImageClick = () => {
    if (post?.featuredImageUrl) {
      setCurrentMedia({
        type: "image",
        url: post.featuredImageUrl,
      });
      setIsVideoPlaying(false);
    }
  };

  const handleOriginalVideoClick = () => {
    if (post?.videoUrl) {
      setCurrentMedia({
        type: "video",
        url: post.videoUrl,
        thumbnailUrl: post.videoThumbnailUrl,
        duration: post.videoDurationSeconds,
      });
      setIsVideoPlaying(false);
    }
  };

  if (!post) {
    return (
      <Modal.Body className="p-40">
        <div className="text-center">
          <div className="mb-24">
            <i
              className="ph ph-warning-circle text-warning-500"
              style={{ fontSize: "48px" }}
            />
          </div>
          <h3 className="text-neutral-900 fs-20 fw-semibold mb-8">
            Gönderi Bulunamadı
          </h3>
          <p className="text-neutral-600 fs-14 mb-24">
            İstediğiniz gönderi mevcut değil veya kaldırılmış olabilir.
          </p>
          <button onClick={close} className="btn btn-outline-main btn-sm">
            <i className="ph ph-arrow-left me-8" />
            Geri Dön
          </button>
        </div>
      </Modal.Body>
    );
  }

  const mediaAttachments = post.mediaAttachments
    ? JSON.parse(post.mediaAttachments)
    : [];

  return (
    <>
      {/* Minimal Header */}
      <Modal.Header onClose={close} className="border-bottom px-24 py-20">
        <div className="d-flex align-items-center gap-12">
          <div className="avatar avatar-sm">
            <Image
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                post.author?.fullName || "User"
              )}&background=6366f1&color=fff&size=32&rounded=true`}
              alt={post.author?.fullName || "User"}
              width={32}
              height={32}
              className="rounded-circle"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-neutral-900 fw-medium fs-14 mb-2">
              {post.author?.fullName || "Anonim Kullanıcı"}
            </h4>
            <div className="d-flex align-items-center gap-8">
              <span className="text-neutral-500 fs-12">
                {post.school?.name || "Okul Belirtilmemiş"}
              </span>
              <span className="text-neutral-400">•</span>
              <time className="text-neutral-500 fs-12">
                {formatDate(post.publishedAt)}
              </time>
            </div>
          </div>
        </div>
      </Modal.Header>

      {/* Minimal Body */}
      <Modal.Body className="p-0">
        {/* Two Column Layout */}
        <div className="row g-0 post-detail-layout">
          {/* Left Column - Media Gallery */}
          <div className="col-6">
            <div className="p-24 post-detail-media-column">
              {/* Main Media Display */}
              <div className="mb-20">
                {/* Video Section */}
                {currentMedia && currentMedia.type === "video" && (
                  <div className="video-section">
                    <div className="position-relative post-detail-video-container">
                      {isVideoPlaying ? (
                        <video
                          src={currentMedia.url}
                          controls
                          autoPlay
                          className="w-100 h-100 rounded-8"
                          style={{ objectFit: "cover" }}
                        />
                      ) : currentMedia.thumbnailUrl ? (
                        <div
                          className="position-relative w-100 h-100"
                          onClick={handleVideoPlay}
                        >
                          <Image
                            src={currentMedia.thumbnailUrl}
                            alt="Video thumbnail"
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-8 cursor-pointer"
                          />
                          <div className="position-absolute top-50 start-50 translate-middle">
                            <div className="bg-dark bg-opacity-75 rounded-circle p-12 d-flex align-items-center justify-content-center">
                              <i className="ph ph-play-fill text-white fs-20" />
                            </div>
                          </div>
                          {currentMedia.duration && (
                            <div className="position-absolute bottom-8 end-8 bg-dark bg-opacity-75 text-white px-8 py-4 rounded-4 fs-12">
                              {Math.floor(currentMedia.duration / 60)}:
                              {(currentMedia.duration % 60)
                                .toString()
                                .padStart(2, "0")}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          className="bg-neutral-100 rounded-8 h-100 d-flex align-items-center justify-content-center cursor-pointer"
                          onClick={handleVideoPlay}
                        >
                          <div className="text-center">
                            <i className="ph ph-video text-neutral-400 fs-32 mb-8" />
                            <p className="text-neutral-600 fs-12 mb-0">
                              Video Mevcut
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Current Image Section */}
                {currentMedia && currentMedia.type === "image" && (
                  <div className="featured-image position-relative">
                    <div className="post-detail-image-container">
                      <Image
                        src={currentMedia.url}
                        alt={post.title || ""}
                        fill
                        className="w-100 rounded-8 post-detail-image"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Media Gallery Thumbnails */}
              <div className="media-gallery">
                <h6 className="text-neutral-700 fw-medium fs-13 mb-12">
                  <i className="ph ph-images me-8" />
                  Medya Galerisi
                </h6>
                <div className="d-flex gap-8 flex-wrap">
                  {/* Original Featured Image Thumbnail */}
                  {post.featuredImageUrl && (
                    <div
                      className="media-thumbnail position-relative cursor-pointer"
                      onClick={handleOriginalImageClick}
                    >
                      <div className="post-detail-thumbnail">
                        <Image
                          src={post.featuredImageUrl}
                          alt="Ana görsel"
                          fill
                          className="rounded-6 post-detail-thumbnail-image"
                        />
                      </div>
                      <div className="position-absolute bottom-2 end-2">
                        <span className="badge bg-primary-500 text-white rounded-circle post-detail-badge">
                          <i className="ph ph-image-fill" />
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Original Video Thumbnail */}
                  {post.videoUrl && (
                    <div
                      className="media-thumbnail position-relative cursor-pointer"
                      onClick={handleOriginalVideoClick}
                    >
                      <div style={{ width: "80px", height: "80px" }}>
                        {post.videoThumbnailUrl ? (
                          <Image
                            src={post.videoThumbnailUrl}
                            alt="Ana video"
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-6"
                          />
                        ) : (
                          <div className="bg-neutral-100 rounded-6 h-100 d-flex align-items-center justify-content-center">
                            <i className="ph ph-video text-neutral-400 fs-16" />
                          </div>
                        )}
                      </div>
                      <div className="position-absolute bottom-2 end-2">
                        <span
                          className="badge bg-danger-500 text-white rounded-circle"
                          style={{ fontSize: "8px", padding: "2px 4px" }}
                        >
                          <i className="ph ph-play-fill" />
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Media Attachments */}
                  {mediaAttachments.map((media: any, index: number) => (
                    <div
                      key={index}
                      className="media-thumbnail position-relative cursor-pointer"
                      onClick={() => handleMediaSwitch(media)}
                    >
                      <div style={{ width: "80px", height: "80px" }}>
                        {media.type === "image" ? (
                          <Image
                            src={media.url}
                            alt={`Ek medya ${index + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-6"
                          />
                        ) : media.type === "video" ? (
                          media.thumbnailUrl ? (
                            <Image
                              src={media.thumbnailUrl}
                              alt={`Video ${index + 1}`}
                              fill
                              style={{ objectFit: "cover" }}
                              className="rounded-6"
                            />
                          ) : (
                            <div className="bg-neutral-100 rounded-6 h-100 d-flex align-items-center justify-content-center">
                              <i className="ph ph-video text-neutral-400 fs-16" />
                            </div>
                          )
                        ) : null}
                      </div>
                      <div className="position-absolute bottom-2 end-2">
                        <span
                          className={`badge ${
                            media.type === "video"
                              ? "bg-danger-500"
                              : "bg-info-500"
                          } text-white rounded-circle`}
                          style={{ fontSize: "8px", padding: "2px 4px" }}
                        >
                          <i
                            className={`ph ${
                              media.type === "video"
                                ? "ph-play-fill"
                                : "ph-image-fill"
                            }`}
                          />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Post Information */}
          <div className="col-6">
            <div className="post-detail-content-column h-100 overflow-y-auto">
              <div className="p-24">
                {/* Title */}
                {post.title && (
                  <div className="mb-20">
                    <div className="d-flex align-items-start justify-content-between gap-12 mb-12">
                      <h1 className="text-neutral-900 fw-bold fs-20 lh-base flex-1">
                        {post.title}
                      </h1>
                      <div className="d-flex flex-column gap-12 flex-shrink-0">
                        {/* Post Type Badge - Moved here */}
                        <span className="badge bg-main-50 text-main-600 px-12 py-6 rounded-pill fs-13 fw-medium">
                          <i
                            className={`${getPostTypeIcon(post.postType)} me-6`}
                          />
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
                )}

                {/* Engagement Section - Moved Up */}
                <div className="engagement-section mb-24">
                  <div className="engagement-header mb-16">
                    <h6 className="text-neutral-800 fs-14 fw-semibold mb-0 d-flex align-items-center gap-10">
                      <div className="engagement-icon">
                        <i className="ph ph-heart fs-14" />
                      </div>
                      Etkileşim Metrikleri
                    </h6>
                  </div>

                  <div className="engagement-card">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-16">
                      <div className="engagement-actions">
                        <button
                          className={`like-button ${
                            isLiked ? "liked" : "unliked"
                          }`}
                          onClick={() => setIsLiked(!isLiked)}
                        >
                          <i
                            className={`ph ${
                              isLiked ? "ph-heart" : "ph-heart"
                            }`}
                          />
                          <span>
                            {formatEngagementCount(
                              (post.likeCount || 0) + (isLiked ? 1 : 0)
                            )}
                          </span>
                        </button>

                        <div className="engagement-metric">
                          <div className="engagement-icon-circle engagement-view-icon">
                            <i className="ph ph-eye fs-16" />
                          </div>
                          <span className="metric-value">
                            {formatViewCount(post.viewCount)}
                          </span>
                        </div>
                      </div>

                      {(post.engagementScore || 0) > 0 && (
                        <div className="engagement-score-container">
                          <div className="engagement-icon-circle engagement-score-icon">
                            <i className="ph ph-chart-line fs-16" />
                          </div>
                          <span className="score-value">
                            {post.engagementScore?.toFixed(1)} skor
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                {post.content && (
                  <div className="mb-24 content-section">
                    <div className="content-header mb-16">
                      <h6 className="text-neutral-800 fs-14 fw-semibold mb-0 d-flex align-items-center gap-10">
                        <div className="content-icon">
                          <i className="ph ph-article fs-14" />
                        </div>
                        İçerik
                      </h6>
                    </div>

                    <div className="content-card">
                      <div
                        className="post-content"
                        dangerouslySetInnerHTML={{
                          __html: showFullContent
                            ? highlightHashtags(post.content)
                            : highlightHashtags(
                                stripHtmlTags(post.content).substring(0, 250) +
                                  (stripHtmlTags(post.content).length > 250
                                    ? "..."
                                    : "")
                              ),
                        }}
                        data-aos={showFullContent ? "fade-in" : ""}
                        data-aos-duration="500"
                      />

                      {stripHtmlTags(post.content).length > 250 && (
                        <div className="position-relative">
                          {/* Gradient Fade Effect */}
                          {!showFullContent && <div className="content-fade" />}

                          <div className="text-center mt-16">
                            <span
                              className="text-main-600 fw-medium fs-14 cursor-pointer hover-text-main-700 transition-all d-inline-flex align-items-center gap-6"
                              onClick={() =>
                                setShowFullContent(!showFullContent)
                              }
                              data-aos="fade-up"
                              data-aos-duration="300"
                            >
                              {showFullContent
                                ? "Daha Az Göster"
                                : "Devamını Oku"}
                              <i
                                className={`ph ${
                                  showFullContent
                                    ? "ph-caret-up"
                                    : "ph-caret-down"
                                } transition-all`}
                              />
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Hashtags */}
                {post.hashtags && (
                  <div className="mb-24">
                    <div className="d-flex flex-wrap gap-8">
                      {post.hashtags.split(" ").map((hashtag, index) => (
                        <span
                          key={index}
                          className="badge bg-main-50 text-main-700 px-12 py-6 rounded-pill fs-13 fw-medium hover-bg-main-100 cursor-pointer transition-all"
                        >
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                {post.callToAction && post.ctaUrl && (
                  <div className="mb-24">
                    <Button
                      href={post.ctaUrl}
                      variant="inline"
                      size="xs"
                      rightIcon="ph-arrow-right"
                      className="shadow-sm"
                    >
                      {post.callToAction}
                    </Button>
                  </div>
                )}

                {/* Post Details Section */}
                <div className="border-top border-neutral-200 pt-20">
                  {/* Location and Tags */}
                  {(post.locationName || post.tags || post.slug) && (
                    <div className="mb-20 post-details-section">
                      <div className="details-header mb-16">
                        <h6 className="text-neutral-800 fs-14 fw-semibold mb-0 d-flex align-items-center gap-10">
                          <div className="details-icon">
                            <i className="ph ph-info fs-14" />
                          </div>
                          Gönderi Detayları
                        </h6>
                      </div>

                      <div className="details-card">
                        <div className="d-flex flex-column gap-4">
                          {post.locationName && (
                            <div className="detail-item">
                              <div className="detail-icon location-icon">
                                <i className="ph ph-map-pin fs-14" />
                              </div>
                              <div className="detail-text">
                                {post.locationName}
                              </div>
                            </div>
                          )}

                          {post.tags && (
                            <div className="detail-item">
                              <div className="detail-icon tag-icon">
                                <i className="ph ph-tag fs-14" />
                              </div>
                              <div className="detail-text">
                                {post.tags.replace(/,/g, " • ")}
                              </div>
                            </div>
                          )}

                          {post.slug && (
                            <div className="detail-item">
                              <div className="detail-icon link-icon">
                                <i className="ph ph-link fs-14" />
                              </div>
                              <div className="detail-text">{post.slug}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Advanced Analytics */}
                  {(post.reachCount ||
                    post.impressionCount ||
                    post.clickCount ||
                    post.averageReadTimeSeconds) && (
                    <div className="mb-20 analytics-section">
                      <div className="analytics-header mb-16">
                        <h6 className="text-neutral-800 fs-14 fw-semibold mb-0 d-flex align-items-center gap-10">
                          <div className="analytics-icon">
                            <i className="ph ph-chart-line-up fs-14" />
                          </div>
                          Performans Metrikleri
                        </h6>
                      </div>

                      <div className="analytics-grid">
                        {post.reachCount && (
                          <div className="analytics-card reach-card">
                            <div className="analytics-value">
                              {formatEngagementCount(post.reachCount)}
                            </div>
                            <div className="analytics-label">Erişim</div>
                          </div>
                        )}

                        {post.impressionCount && (
                          <div className="analytics-card impression-card">
                            <div className="analytics-value">
                              {formatEngagementCount(post.impressionCount)}
                            </div>
                            <div className="analytics-label">Gösterim</div>
                          </div>
                        )}

                        {post.clickCount && (
                          <div className="analytics-card click-card">
                            <div className="analytics-value">
                              {formatEngagementCount(post.clickCount)}
                            </div>
                            <div className="analytics-label">Tıklama</div>
                          </div>
                        )}

                        {post.averageReadTimeSeconds && (
                          <div className="analytics-card read-time-card">
                            <div className="analytics-value">
                              {Math.floor(post.averageReadTimeSeconds / 60)}dk
                            </div>
                            <div className="analytics-label">Okuma Süresi</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Post Status and Settings */}
                  <div className="border-top border-neutral-200 pt-20 pb-60 post-status-section">
                    <div className="status-card">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-16">
                        <div className="d-flex flex-column gap-4">
                          {post.isModerated && (
                            <div className="status-item">
                              <div className="status-icon moderated-icon">
                                <i className="ph ph-shield-check fs-14" />
                              </div>
                              <span className="status-text">
                                Moderasyonlu İçerik
                              </span>
                            </div>
                          )}

                          {post.allowLikes && (
                            <div className="status-item">
                              <div className="status-icon likes-icon">
                                <i className="ph ph-heart fs-14" />
                              </div>
                              <span className="status-text">
                                Beğeniler Aktif
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="creation-date">
                          <i className="ph ph-calendar fs-12" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default PostDetailModalContent;
