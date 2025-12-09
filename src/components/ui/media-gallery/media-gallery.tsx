"use client";

import React, { useState, useRef, useCallback } from "react";
import { CustomImage } from "@/components/ui";
import { getFileServeUrl } from "@/lib/api/constants";

export interface MediaGalleryItem {
  id?: number;
  itemType?: "IMAGE" | "VIDEO" | "DOCUMENT" | string;
  fileUrl?: string;
  thumbnailUrl?: string;
  fileName?: string;
  originalFileName?: string;
  fileSizeBytes?: number;
  altText?: string;
  title?: string;
  description?: string;
  mimeType?: string;
}

interface MediaGalleryProps {
  items: MediaGalleryItem[];
  className?: string;
  showThumbnails?: boolean;
  showNavigation?: boolean;
  showCounter?: boolean;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({
  items,
  className = "",
  showThumbnails = true,
  showNavigation = true,
  showCounter = true,
  initialIndex = 0,
  onIndexChange,
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(initialIndex);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Thumbnail'ı görünür alana scroll et
  const scrollThumbnailIntoView = useCallback((index: number) => {
    const thumbnailElement = thumbnailRefs.current[index];
    const container = thumbnailContainerRef.current;

    if (thumbnailElement && container) {
      const containerRect = container.getBoundingClientRect();
      const thumbnailRect = thumbnailElement.getBoundingClientRect();

      // Thumbnail container'ın sol ve sağ kenarlarına göre kontrol
      const isOutOfViewLeft = thumbnailRect.left < containerRect.left;
      const isOutOfViewRight = thumbnailRect.right > containerRect.right;

      if (isOutOfViewLeft || isOutOfViewRight) {
        thumbnailElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, []);

  const handleIndexChange = useCallback(
    (index: number) => {
      setCurrentItemIndex(index);
      onIndexChange?.(index);

      // Thumbnail scroll işlemi
      setTimeout(() => {
        scrollThumbnailIntoView(index);
      }, 50);
    },
    [onIndexChange, scrollThumbnailIntoView]
  );

  // URL helper - eğer tam URL değilse serve prefix ekle
  const getFullUrl = (url: string | undefined): string => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return getFileServeUrl(url);
  };

  const hasItems = items && items.length > 0;
  const currentItem = hasItems ? items[currentItemIndex] : null;

  const nextImage = () => {
    if (hasItems && currentItemIndex < items.length - 1) {
      handleIndexChange(currentItemIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentItemIndex > 0) {
      handleIndexChange(currentItemIndex - 1);
    }
  };

  const goToImage = (index: number) => {
    handleIndexChange(index);
  };

  // Medya tipine göre içerik render etme
  const renderMediaItem = (item: MediaGalleryItem) => {
    if (!item) return null;

    switch (item.itemType) {
      case "IMAGE":
        return (
          <div className="media-item-wrapper image-wrapper">
            <CustomImage
              src={getFullUrl(item.fileUrl)}
              alt={
                item.altText ||
                item.title ||
                `Media item ${currentItemIndex + 1}`
              }
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 70vw"
              style={{ objectFit: "contain" }}
              className="main-image"
              priority
            />
          </div>
        );

      case "VIDEO":
        return (
          <div className="media-item-wrapper video-wrapper">
            <video
              src={getFullUrl(item.fileUrl)}
              controls
              className="video-player"
            >
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
          </div>
        );

      case "DOCUMENT":
        return (
          <div className="media-item-wrapper document-wrapper">
            <div className="document-preview-card">
              <div className="document-header">
                <div className="file-type-badge">
                  {item.fileName?.split(".").pop()?.toUpperCase() || "DOC"}
                </div>
              </div>

              <div className="document-icon-wrapper">
                <div className="document-icon-circle">
                  <i className="ph-fill ph-file-text"></i>
                </div>
              </div>

              <div className="document-details">
                <h3 className="document-title">{item.fileName || "Belge"}</h3>

                <div className="document-meta">
                  {item.fileSizeBytes && (
                    <div className="meta-item">
                      <i className="ph ph-database"></i>
                      <span>
                        {(item.fileSizeBytes / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  )}
                  <div className="meta-item">
                    <i className="ph ph-file"></i>
                    <span>
                      {item.fileName?.split(".").pop()?.toUpperCase() || "DOC"}{" "}
                      Dosyası
                    </span>
                  </div>
                </div>

                <div className="document-button-wrapper">
                  <a
                    href={getFullUrl(item.fileUrl)}
                    download={item.fileName}
                    className="btn btn-main rounded-pill flex-align gap-8 document-download-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ph-bold ph-download"></i>
                    <span>Belgeyi İndir</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="media-item-wrapper unsupported-wrapper">
            <div className="unsupported-content">
              <i className="ph ph-file text-neutral-400"></i>
              <p className="text-neutral-500">Desteklenmeyen medya türü</p>
            </div>
          </div>
        );
    }
  };

  // Farklı medya tipleri için thumbnail kaynağı al
  const getThumbnailSrc = (item: MediaGalleryItem) => {
    if (item.thumbnailUrl) return getFullUrl(item.thumbnailUrl);
    if (item.itemType === "IMAGE") return getFullUrl(item.fileUrl);
    return getFullUrl(item.fileUrl);
  };

  if (!hasItems) {
    return (
      <div className={`media-gallery-container ${className}`}>
        <style jsx>{`
          .media-gallery-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            background: #f8f9fa;
            border-radius: 12px;
          }

          .gallery-empty-state {
            text-align: center;
            padding: 3rem;
          }

          .empty-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 1.5rem;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
          }

          .empty-icon i {
            font-size: 36px;
            color: white;
          }

          .gallery-empty-state h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 0.5rem;
          }

          .gallery-empty-state p {
            color: #6b7280;
            font-size: 0.9375rem;
          }

          @media (max-width: 768px) {
            .media-gallery-container {
              min-height: 300px;
            }

            .gallery-empty-state {
              padding: 2rem;
            }

            .empty-icon {
              width: 64px;
              height: 64px;
            }

            .empty-icon i {
              font-size: 28px;
            }
          }
        `}</style>
        <div className="gallery-empty-state">
          <div className="empty-icon">
            <i className="ph ph-images"></i>
          </div>
          <h3>Medya Yok</h3>
          <p>Bu içerikte henüz medya bulunmuyor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`media-gallery-container ${className}`}>
      <style jsx>{`
        .media-gallery-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          gap: 1rem;
          overflow: hidden;
        }

        /* Main viewer area */
        .gallery-main-viewer {
          position: relative;
          flex: 1;
          min-height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          border-radius: 12px;
          overflow: hidden;
        }

        .main-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Media item wrappers */
        .media-item-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .video-wrapper {
          padding: 1rem;
          max-height: 100%;
          max-width: 100%;
        }

        .video-player {
          max-width: 100%;
          max-height: 100%;
          width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .document-wrapper,
        .unsupported-wrapper {
          padding: 2rem;
          width: 100%;
        }

        .unsupported-content {
          text-align: center;
        }

        .unsupported-content i {
          font-size: 48px;
          margin-bottom: 1rem;
          display: block;
        }

        /* Document preview card */
        .document-preview-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          max-width: 500px;
          margin: 0 auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .document-header {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .file-type-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.5px;
        }

        .document-icon-wrapper {
          display: flex;
          justify-content: center;
          margin: 2rem 0;
        }

        .document-icon-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
        }

        .document-icon-circle i {
          font-size: 48px;
          color: white;
        }

        .document-details {
          text-align: center;
        }

        .document-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
          word-break: break-word;
        }

        .document-meta {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 1.5rem 0;
        }

        .meta-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .meta-item i {
          font-size: 1.125rem;
        }

        .document-button-wrapper {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
        }

        .document-download-btn {
          padding: 0.75rem 1.5rem;
        }

        /* Navigation buttons */
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #e5e7eb;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .nav-button:hover:not(:disabled) {
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-50%) scale(1.05);
        }

        .nav-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .nav-button i {
          font-size: 24px;
          color: #374151;
        }

        .nav-prev {
          left: 1rem;
        }

        .nav-next {
          right: 1rem;
        }

        /* Counter */
        .image-counter {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.75);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          z-index: 10;
          backdrop-filter: blur(8px);
        }

        /* Thumbnail strip */
        .thumbnail-strip {
          flex-shrink: 0;
          width: 100%;
          padding: 0.5rem 0;
        }

        .thumbnail-container {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0.5rem;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .thumbnail-container::-webkit-scrollbar {
          height: 6px;
        }

        .thumbnail-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .thumbnail-container::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .thumbnail-container::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .thumbnail-item {
          position: relative;
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s ease;
          background: #f1f5f9;
        }

        .thumbnail-item:hover {
          border-color: #cbd5e1;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .thumbnail-item.active {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .thumbnail-video,
        .thumbnail-document {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .video-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          color: #64748b;
        }

        .video-placeholder i {
          font-size: 28px;
        }

        .video-text {
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .play-icon-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 32px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .document-bg {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: #64748b;
        }

        .document-bg i {
          font-size: 32px;
        }

        .document-badge {
          position: absolute;
          bottom: 0.25rem;
          right: 0.25rem;
          background: rgba(102, 126, 234, 0.9);
          color: white;
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          font-size: 0.625rem;
          font-weight: 600;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .media-gallery-container {
            gap: 0.75rem;
          }

          .gallery-main-viewer {
            border-radius: 8px;
          }

          .nav-button {
            width: 40px;
            height: 40px;
          }

          .nav-button i {
            font-size: 20px;
          }

          .nav-prev {
            left: 0.5rem;
          }

          .nav-next {
            right: 0.5rem;
          }

          .image-counter {
            bottom: 0.5rem;
            font-size: 0.75rem;
            padding: 0.375rem 0.75rem;
          }

          .thumbnail-item {
            width: 64px;
            height: 64px;
          }

          .thumbnail-container {
            gap: 0.5rem;
          }

          .document-preview-card {
            padding: 1.5rem;
          }

          .document-icon-circle {
            width: 80px;
            height: 80px;
          }

          .document-icon-circle i {
            font-size: 36px;
          }

          .document-title {
            font-size: 1.125rem;
          }
        }

        @media (max-width: 480px) {
          .thumbnail-item {
            width: 56px;
            height: 56px;
          }

          .document-preview-card {
            padding: 1rem;
          }
        }
      `}</style>

      {/* Main Media Display */}
      <div className="gallery-main-viewer">
        {currentItem && (
          <div className="main-image-container">
            {renderMediaItem(currentItem)}

            {/* Navigation Controls */}
            {showNavigation && items.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={currentItemIndex === 0}
                  className="nav-button nav-prev"
                  aria-label="Önceki medya"
                >
                  <i className="ph ph-caret-left"></i>
                </button>
                <button
                  onClick={nextImage}
                  disabled={currentItemIndex === items.length - 1}
                  className="nav-button nav-next"
                  aria-label="Sonraki medya"
                >
                  <i className="ph ph-caret-right"></i>
                </button>
              </>
            )}

            {/* Counter */}
            {showCounter && (
              <div className="image-counter">
                <span>
                  {currentItemIndex + 1} / {items.length}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {showThumbnails && items.length > 1 && (
        <div className="thumbnail-strip">
          <div className="thumbnail-container" ref={thumbnailContainerRef}>
            {items.map((item, index) => (
              <div
                key={`thumb-${item.id || index}`}
                ref={(el) => {
                  thumbnailRefs.current[index] = el;
                }}
                onClick={() => goToImage(index)}
                className={`thumbnail-item ${
                  index === currentItemIndex ? "active" : ""
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    goToImage(index);
                  }
                }}
                aria-label={`${index + 1}. medyayı göster`}
              >
                {item.itemType === "IMAGE" ? (
                  <CustomImage
                    src={getThumbnailSrc(item)}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                ) : item.itemType === "VIDEO" ? (
                  <div className="thumbnail-video">
                    <div className="video-placeholder">
                      <i className="ph-fill ph-film-slate"></i>
                      <span className="video-text">VIDEO</span>
                    </div>
                    <div className="play-icon-overlay">
                      <i className="ph-fill ph-play-circle"></i>
                    </div>
                  </div>
                ) : (
                  <div className="thumbnail-document">
                    <div className="document-bg">
                      <i className="ph ph-file-text"></i>
                    </div>
                    <div className="document-badge">
                      {item.fileName && (
                        <span className="file-extension">
                          {item.fileName.split(".").pop()?.toUpperCase() ||
                            "DOC"}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
