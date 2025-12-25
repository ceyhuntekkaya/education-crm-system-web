import React from "react";
import { CustomImage } from "@/components/ui";
import { useProductDetail } from "../../../../../context";
import { getRandomPlaceholderImage } from "../../../../../utils";

export const LightboxThumbnailsSection: React.FC = () => {
  const { selectedImageIndex, setSelectedImageIndex, allImages } =
    useProductDetail();

  if (allImages.length <= 1) return null;

  return (
    <div className="product-detail-page__lightbox-thumbnails-container">
      <div className="product-detail-page__lightbox-thumbnails">
        {allImages.map((img: any, index: number) => (
          <button
            key={img.id || index}
            onClick={() => setSelectedImageIndex(index)}
            className={`product-detail-page__lightbox-thumbnail ${
              selectedImageIndex === index ? "active" : ""
            }`}
            aria-label={`Görsel ${index + 1} seç`}
          >
            <div className="product-detail-page__lightbox-thumbnail-image">
              <CustomImage
                src={img.imageUrl || ""}
                tempImage={getRandomPlaceholderImage(index)}
                alt={`Görsel ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            {selectedImageIndex === index && (
              <div className="product-detail-page__lightbox-thumbnail-active"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
