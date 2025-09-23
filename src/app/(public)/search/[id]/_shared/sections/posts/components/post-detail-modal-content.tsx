import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui";
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
          {/* Post Type Badge */}
          <div className="d-flex align-items-center gap-8">
            <span className="badge bg-main-50 text-main-600 px-8 py-4 rounded-pill fs-12">
              <i className={`${getPostTypeIcon(post.postType)} me-4`} />
              {formatPostType(post.postType)}
            </span>
          </div>
        </div>
      </Modal.Header>

      {/* Minimal Body */}
      <Modal.Body className="p-0" scrollable={true}>
        {/* Content Section */}
        <div className="p-24">
          {/* Video Section */}
          {currentMedia && currentMedia.type === "video" && (
            <div className="video-section mb-20">
              <div
                className="position-relative"
                style={{ aspectRatio: "16/9", maxHeight: "200px" }}
              >
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
            <div className="featured-image position-relative mb-20">
              <div style={{ aspectRatio: "3/2", maxHeight: "240px" }}>
                <Image
                  src={currentMedia.url}
                  alt={post.title || ""}
                  fill
                  style={{ objectFit: "cover" }}
                  className="w-100 rounded-8"
                />
              </div>
            </div>
          )}
          {/* Media Attachments */}
          {mediaAttachments && mediaAttachments.length > 0 && (
            <div className="media-attachments mb-20">
              <h6 className="text-neutral-700 fw-medium fs-13 mb-12">
                <i className="ph ph-images me-8" />
                Ek Medya ({mediaAttachments.length})
              </h6>
              <div className="d-flex gap-8 flex-wrap">
                {/* Original Featured Image Thumbnail */}
                {post.featuredImageUrl && (
                  <div
                    className="media-thumbnail position-relative cursor-pointer"
                    onClick={handleOriginalImageClick}
                  >
                    <div style={{ width: "60px", height: "60px" }}>
                      <Image
                        src={post.featuredImageUrl}
                        alt="Ana görsel"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-6"
                      />
                    </div>
                    <div className="position-absolute bottom-2 end-2">
                      <span
                        className="badge bg-primary-500 text-white rounded-circle"
                        style={{ fontSize: "8px", padding: "2px 4px" }}
                      >
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
                    <div style={{ width: "60px", height: "60px" }}>
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
                    <div style={{ width: "60px", height: "60px" }}>
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
          )}
          {/* Title */}
          {post.title && (
            <div className="mb-16">
              <div className="d-flex align-items-start justify-content-between gap-12 mb-8">
                <h1 className="text-neutral-900 fw-semibold fs-18 lh-sm flex-1">
                  {post.title}
                </h1>
                <div className="d-flex align-items-center gap-8 flex-shrink-0">
                  {post.isPinned && (
                    <span className="badge bg-info-100 text-info-700 px-8 py-4 rounded-pill fs-11">
                      <i className="ph ph-push-pin-fill me-4" />
                      Sabitlendi
                    </span>
                  )}
                  {post.isFeatured && (
                    <span className="badge bg-warning-100 text-warning-700 px-8 py-4 rounded-pill fs-11">
                      <i className="ph ph-star-fill me-4" />
                      Öne Çıkan
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Content */}
          {post.content && (
            <div className="mb-20">
              <div
                className="text-neutral-700 fs-14 lh-lg"
                dangerouslySetInnerHTML={{
                  __html: showFullContent
                    ? highlightHashtags(post.content)
                    : highlightHashtags(
                        stripHtmlTags(post.content).substring(0, 200) +
                          (stripHtmlTags(post.content).length > 200
                            ? "..."
                            : "")
                      ),
                }}
              />
              {stripHtmlTags(post.content).length > 200 && (
                <button
                  className="btn btn-link btn-sm p-0 mt-8 text-main-600 fs-14"
                  onClick={() => setShowFullContent(!showFullContent)}
                >
                  {showFullContent ? "daha az göster" : "devamını oku"}
                </button>
              )}
            </div>
          )}
          {/* Hashtags */}
          {post.hashtags && (
            <div className="mb-20">
              <div className="d-flex flex-wrap gap-8">
                {post.hashtags.split(" ").map((hashtag, index) => (
                  <span
                    key={index}
                    className="text-main-600 fs-13 hover-text-main-700 cursor-pointer"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Media Attachments */}
          {mediaAttachments.length > 0 && (
            <div className="media-attachments mb-20">
              <div className="d-flex gap-8 overflow-auto">
                {mediaAttachments.map((media: any, index: number) => (
                  <div
                    key={index}
                    className="media-item flex-shrink-0"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <Image
                      src={media.url}
                      alt={`Ek ${index + 1}`}
                      width={80}
                      height={80}
                      style={{ objectFit: "cover" }}
                      className="rounded-6 border border-neutral-200 w-100 h-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Call to Action */}
          {post.callToAction && post.ctaUrl && (
            <div className="mb-20">
              <a
                href={post.ctaUrl}
                className="btn btn-main btn-sm rounded-8 px-16 py-8 text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ph ph-arrow-right me-8" />
                {post.callToAction}
              </a>
            </div>
          )}

          {/* Engagement Section */}
          <div className="border-top border-neutral-200 mt-24">
            {/* Engagement Stats */}
            <div className="py-20">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-16">
                <div className="d-flex align-items-center gap-20">
                  <button
                    className={`btn btn-sm px-12 py-8 rounded-pill d-flex align-items-center gap-8 transition-all ${
                      isLiked
                        ? "bg-danger-500 text-white border-danger-500"
                        : "bg-neutral-25 text-neutral-600 border border-neutral-200 hover-bg-danger-50 hover-border-danger-200 hover-text-danger-600"
                    }`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <i
                      className={`ph ${
                        isLiked ? "ph-heart-fill" : "ph-heart"
                      } fs-15`}
                    />
                    <span className="fs-13 fw-medium">
                      {formatEngagementCount(
                        (post.likeCount || 0) + (isLiked ? 1 : 0)
                      )}
                    </span>
                  </button>

                  <div className="d-flex align-items-center gap-8">
                    <i className="ph ph-chat-circle text-info-500 fs-18" />
                    <span className="text-neutral-700 fs-15 fw-semibold">
                      {formatEngagementCount(post.commentCount || 0)}
                    </span>
                  </div>

                  <div className="d-flex align-items-center gap-8">
                    <i className="ph ph-eye text-neutral-500 fs-18" />
                    <span className="text-neutral-700 fs-15 fw-semibold">
                      {formatViewCount(post.viewCount)}
                    </span>
                  </div>

                  {(post.shareCount || 0) > 0 && (
                    <div className="d-flex align-items-center gap-8">
                      <i className="ph ph-share text-neutral-500 fs-18" />
                      <span className="text-neutral-700 fs-15 fw-semibold">
                        {formatEngagementCount(post.shareCount || 0)}
                      </span>
                    </div>
                  )}
                </div>

                {(post.engagementScore || 0) > 0 && (
                  <div className="d-flex align-items-center gap-8">
                    <i className="ph ph-chart-line text-success-500 fs-18" />
                    <span className="text-success-600 fs-14 fw-medium">
                      {post.engagementScore?.toFixed(1)} skor
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Post Details Section */}
          <div className="border-top border-neutral-200 pt-20">
            {/* Location and Tags */}
            {(post.locationName || post.tags || post.slug) && (
              <div className="mb-16">
                <div className="d-flex align-items-center flex-wrap gap-16">
                  {post.locationName && (
                    <div className="d-flex align-items-center gap-6 text-neutral-600">
                      <i className="ph ph-map-pin fs-14" />
                      <span className="fs-13">{post.locationName}</span>
                    </div>
                  )}
                  {post.tags && (
                    <div className="d-flex align-items-center gap-6 text-neutral-600">
                      <i className="ph ph-tag fs-14" />
                      <span
                        className="fs-13 text-truncate"
                        style={{ maxWidth: "200px" }}
                      >
                        {post.tags.replace(/,/g, " • ")}
                      </span>
                    </div>
                  )}
                  {post.slug && (
                    <div className="d-flex align-items-center gap-6 text-neutral-600">
                      <i className="ph ph-link fs-14" />
                      <span
                        className="fs-13 text-truncate"
                        style={{ maxWidth: "150px" }}
                      >
                        {post.slug}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Advanced Analytics */}
            {(post.reachCount ||
              post.impressionCount ||
              post.clickCount ||
              post.averageReadTimeSeconds) && (
              <div className="mb-16">
                <div className="d-flex align-items-center gap-8 mb-12">
                  <div className="bg-main-50 p-6 rounded-6">
                    <i className="ph ph-chart-line-up text-main-600 fs-14" />
                  </div>
                  <h6 className="text-neutral-700 fs-13 fw-semibold mb-0">
                    Performans İstatistikleri
                  </h6>
                </div>

                <div className="bg-neutral-25 border border-neutral-100 rounded-8 p-16">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-16">
                    {post.reachCount && (
                      <div className="d-flex align-items-center gap-10">
                        <div className="bg-gradient-primary-soft p-8 rounded-6">
                          <i className="ph ph-users text-main-600 fs-16" />
                        </div>
                        <div>
                          <div className="text-neutral-900 fs-15 fw-semibold">
                            {formatEngagementCount(post.reachCount)}
                          </div>
                          <div className="text-neutral-500 fs-11">Erişim</div>
                        </div>
                      </div>
                    )}

                    {post.impressionCount && (
                      <div className="d-flex align-items-center gap-10">
                        <div className="bg-gradient-success-soft p-8 rounded-6">
                          <i className="ph ph-eye text-success-600 fs-16" />
                        </div>
                        <div>
                          <div className="text-neutral-900 fs-15 fw-semibold">
                            {formatEngagementCount(post.impressionCount)}
                          </div>
                          <div className="text-neutral-500 fs-11">Gösterim</div>
                        </div>
                      </div>
                    )}

                    {post.clickCount && (
                      <div className="d-flex align-items-center gap-10">
                        <div className="bg-gradient-warning-soft p-8 rounded-6">
                          <i className="ph ph-cursor-click text-warning-600 fs-16" />
                        </div>
                        <div>
                          <div className="text-neutral-900 fs-15 fw-semibold">
                            {formatEngagementCount(post.clickCount)}
                          </div>
                          <div className="text-neutral-500 fs-11">Tıklama</div>
                        </div>
                      </div>
                    )}

                    {post.averageReadTimeSeconds && (
                      <div className="d-flex align-items-center gap-10">
                        <div className="bg-gradient-info-soft p-8 rounded-6">
                          <i className="ph ph-timer text-info-600 fs-16" />
                        </div>
                        <div>
                          <div className="text-neutral-900 fs-15 fw-semibold">
                            {Math.floor(post.averageReadTimeSeconds / 60)}dk
                          </div>
                          <div className="text-neutral-500 fs-11">
                            Okuma Süresi
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Post Status and Settings */}
            <div className="border-top border-neutral-200 pt-16">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-12">
                <div className="d-flex align-items-center gap-16">
                  {post.isModerated && (
                    <div className="d-flex align-items-center gap-6">
                      <i className="ph ph-shield-check text-success-500 fs-14" />
                      <span className="text-neutral-600 fs-12">
                        Moderasyonlu
                      </span>
                    </div>
                  )}
                  {post.allowLikes && (
                    <div className="d-flex align-items-center gap-6">
                      <i className="ph ph-heart text-danger-500 fs-14" />
                      <span className="text-neutral-600 fs-12">
                        Beğeniler Açık
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-neutral-400 fs-11">
                  Oluşturulma: {formatDate(post.createdAt)}
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
