import React from "react";
import { CustomImage } from "@/components/ui";
import {
  formatDate,
  formatViewCount,
  formatGalleryType,
  getGalleryTypeIcon,
} from "../utils";
import { getFileServeUrl } from "@/lib/api/constants";

interface GalleryInfoColumnProps {
  gallery: any;
}

const GalleryInfoColumn: React.FC<GalleryInfoColumnProps> = ({ gallery }) => {
  // URL helper - eğer tam URL değilse serve prefix ekle
  const getFullUrl = (url: string | undefined): string => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return getFileServeUrl(url);
  };

  return (
    <div className="gallery-info-column p-16">
      {/* Gallery Header */}
      <div className="gallery-header">
        <div className="gallery-badge">
          <i className={`ph ${getGalleryTypeIcon(gallery.galleryType)}`}></i>
          <span>{formatGalleryType(gallery.galleryType)}</span>
        </div>
        <h2 className="gallery-title">{gallery.title}</h2>
      </div>

      {/* Institution Card */}
      {gallery.school && (
        <div className="institution-card">
          <div className="institution-avatar">
            <CustomImage
              src={getFullUrl(gallery.school.logoUrl)}
              alt={gallery.school.name || "School logo"}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="institution-info">
            <h4>{gallery.school.name}</h4>
            <p>{gallery.school.institutionTypeName}</p>
          </div>
          <div className="verified-badge">
            <i className="ph ph-check-circle"></i>
          </div>
        </div>
      )}

      {/* Gallery Stats */}
      <div className="gallery-stats-grid">
        <div className="stat-item">
          <i className="ph ph-eye"></i>
          <div>
            <span className="stat-value">
              {formatViewCount(gallery.viewCount)}
            </span>
            <span className="stat-label">Görüntülenme</span>
          </div>
        </div>
        <div className="stat-item">
          <i className="ph ph-calendar"></i>
          <div>
            <span className="stat-value">{formatDate(gallery.createdAt)}</span>
            <span className="stat-label">Tarih</span>
          </div>
        </div>
        {gallery.items && gallery.items.length > 0 && (
          <div className="stat-item">
            <i className="ph ph-images"></i>
            <div>
              <span className="stat-value">{gallery.items.length}</span>
              <span className="stat-label">Öğe</span>
            </div>
          </div>
        )}
        <div className="stat-item">
          <i className="ph ph-tag"></i>
          <div>
            <span className="stat-value">
              {formatGalleryType(gallery.galleryType)}
            </span>
            <span className="stat-label">Kategori</span>
          </div>
        </div>
      </div>

      {/* Gallery Description */}
      {gallery.description && (
        <div className="gallery-description">
          <h4>
            <i className="ph ph-text-align-left me-8"></i>
            Açıklama
          </h4>
          <p>{gallery.description}</p>
        </div>
      )}
    </div>
  );
};

export default GalleryInfoColumn;
