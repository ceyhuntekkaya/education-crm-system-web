import React from "react";
import { CustomImage } from "@/components/ui";

interface PostDetailMediaGalleryProps {
  post: any;
  mediaAttachments: any[];
  onMediaSwitch: (mediaItem: any) => void;
  onOriginalImageClick: () => void;
  onOriginalVideoClick: () => void;
}

const PostDetailMediaGallery: React.FC<PostDetailMediaGalleryProps> = ({
  post,
  mediaAttachments,
  onMediaSwitch,
  onOriginalImageClick,
  onOriginalVideoClick,
}) => {
  return (
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
            onClick={onOriginalImageClick}
          >
            <div className="post-detail-thumbnail">
              <CustomImage
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
            onClick={onOriginalVideoClick}
          >
            <div style={{ width: "80px", height: "80px" }}>
              {post.videoThumbnailUrl ? (
                <CustomImage
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
            onClick={() => onMediaSwitch(media)}
          >
            <div style={{ width: "80px", height: "80px" }}>
              {media.type === "image" ? (
                <CustomImage
                  src={media.url}
                  alt={`Ek medya ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-6"
                />
              ) : media.type === "video" ? (
                media.thumbnailUrl ? (
                  <CustomImage
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
                  media.type === "video" ? "bg-danger-500" : "bg-info-500"
                } text-white rounded-circle`}
                style={{ fontSize: "8px", padding: "2px 4px" }}
              >
                <i
                  className={`ph ${
                    media.type === "video" ? "ph-play-fill" : "ph-image-fill"
                  }`}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetailMediaGallery;
