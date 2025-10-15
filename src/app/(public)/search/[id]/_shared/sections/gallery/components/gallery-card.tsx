import React from "react";
import { CustomImage } from "@/components/ui";
import { GalleryCardProps } from "../types";
import {
  getGalleryTypeIcon,
  formatViewCount,
  formatDate,
  formatGalleryType,
} from "../utils";

const GalleryCard: React.FC<GalleryCardProps> = ({ gallery, onCardClick }) => {
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(gallery.id);
    }
  };

  return (
    <div
      className={`gallery-card bg-white rounded-16 h-100 box-shadow-md cursor-pointer ${
        gallery.isFeatured ? "gallery-card--featured" : ""
      }`}
      onClick={handleCardClick}
    >
      {/* Gallery Image */}
      <div className="gallery-card__image">
        {gallery.coverImageUrl ? (
          <div className="position-relative w-100 h-100">
            <CustomImage
              src={gallery.coverImageUrl}
              alt={gallery.title || ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-100 h-100 bg-main-600 d-flex align-items-center justify-content-center position-relative">
            <div className="text-center text-white z-2">
              <i
                className={`${getGalleryTypeIcon(gallery.galleryType)} mb-8`}
                style={{ fontSize: "32px" }}
              ></i>
              <p className="fw-medium mb-0 text-sm">Görsel Yok</p>
            </div>
            <div className="position-absolute inset-0 bg-gradient-to-br from-main-600 to-main-800 opacity-90"></div>
          </div>
        )}

        {/* Gallery Type Badge */}
        <div className="gallery-card__type-badge">
          <i className={getGalleryTypeIcon(gallery.galleryType)}></i>
          <span>{formatGalleryType(gallery.galleryType)}</span>
        </div>

        {/* Featured Badge */}
        {gallery.isFeatured && (
          <div className="gallery-card__featured-badge">
            <i className="ph ph-star-fill"></i>
            <span>Öne Çıkan</span>
          </div>
        )}

        {/* Stats Overlay */}
        <div className="gallery-card__image-overlay">
          <div className="gallery-card__stats">
            <div className="gallery-card__stats-item">
              <i className="ph ph-images"></i>
              <span>{gallery.itemCount || 0}</span>
            </div>
            <div className="gallery-card__stats-item">
              <i className="ph ph-eye"></i>
              <span>{formatViewCount(gallery.viewCount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="gallery-card__content">
        <h5 className="gallery-card__title">{gallery.title}</h5>
        <p className="gallery-card__institution">{gallery.institutionName}</p>

        {/* Footer */}
        <div className="gallery-card__footer">
          <span className="gallery-card__footer-date">
            {formatDate(gallery.createdAt)}
          </span>
          <i className="ph ph-arrow-right gallery-card__footer-arrow"></i>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
