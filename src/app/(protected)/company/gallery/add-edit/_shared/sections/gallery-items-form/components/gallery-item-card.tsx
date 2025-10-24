import React from "react";
import { CustomImage } from "@/components/ui";
import { GalleryItemDto } from "@/types";
import { MediaType } from "@/enums";

interface GalleryItemCardProps {
  item: GalleryItemDto;
  isSelected: boolean;
  onClick: (item: GalleryItemDto) => void;
}

const GalleryItemCard: React.FC<GalleryItemCardProps> = ({
  item,
  isSelected,
  onClick,
}) => {
  const handleClick = () => {
    onClick(item);
  };

  const getMediaIcon = (type?: MediaType) => {
    if (!type) return "ph ph-file";

    switch (type) {
      case MediaType.IMAGE:
        return "ph ph-image";
      case MediaType.VIDEO:
        return "ph ph-video";
      case MediaType.AUDIO:
        return "ph ph-speaker-high";
      case MediaType.DOCUMENT:
        return "ph ph-file-text";
      case MediaType.ARCHIVE:
        return "ph ph-file-zip";
      default:
        return "ph ph-file";
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "0 KB";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div
      className={`gallery-item-card bg-white rounded-12 h-100 box-shadow-sm cursor-pointer transition-all ${
        isSelected ? "gallery-item-card--selected box-shadow-lg" : ""
      }`}
      onClick={handleClick}
    >
      {/* Item Image/Thumbnail */}
      <div className="gallery-item-card__image">
        {item.thumbnailUrl || item.fileUrl ? (
          <div className="position-relative w-100 h-100">
            <CustomImage
              src={item.thumbnailUrl || item.fileUrl || ""}
              alt={item.altText || item.title || ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-100 h-100 bg-neutral-100 d-flex align-items-center justify-content-center">
            <i
              className={`${getMediaIcon(item.itemType)} text-neutral-400`}
              style={{ fontSize: "40px" }}
            ></i>
          </div>
        )}

        {/* Media Type Badge */}
        <div className="gallery-item-card__type-badge">
          <i className={getMediaIcon(item.itemType)}></i>
        </div>

        {/* Featured Badge */}
        {item.isFeatured && (
          <div className="gallery-item-card__featured-badge">
            <i className="ph ph-star-fill"></i>
          </div>
        )}

        {/* Cover Badge */}
        {item.isCover && (
          <div className="gallery-item-card__cover-badge">
            <i className="ph ph-check-circle-fill"></i>
            <span>Kapak</span>
          </div>
        )}

        {/* Selected Indicator */}
        {isSelected && (
          <div className="gallery-item-card__selected-indicator">
            <i className="ph ph-check-circle-fill"></i>
          </div>
        )}
      </div>

      {/* Item Content */}
      <div className="gallery-item-card__content">
        <h6 className="gallery-item-card__title">
          {item.title || item.fileName || "İsimsiz"}
        </h6>

        {/* Meta Info */}
        <div className="gallery-item-card__meta">
          <div className="gallery-item-card__meta-item">
            <i className="ph ph-hard-drives"></i>
            <span>{formatFileSize(item.fileSizeBytes)}</span>
          </div>
          {item.width && item.height && (
            <div className="gallery-item-card__meta-item">
              <i className="ph ph-resize"></i>
              <span>
                {item.width}×{item.height}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryItemCard;
