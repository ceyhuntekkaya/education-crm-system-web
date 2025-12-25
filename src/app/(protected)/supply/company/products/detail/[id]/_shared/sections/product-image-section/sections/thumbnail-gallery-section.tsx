import React from "react";
import { CustomImage } from "@/components/ui";
import { useProductDetail } from "../../../context";
import { getRandomPlaceholderImage } from "../../../utils";

export const ThumbnailGallerySection: React.FC = () => {
  const { selectedImageIndex, setSelectedImageIndex, allImages } =
    useProductDetail();

  if (allImages.length <= 1) return null;

  return (
    <div className="product-detail-page__thumbnail-gallery">
      <div className="product-detail-page__thumbnail-scroll">
        {allImages.map((img: any, index: number) => (
          <button
            key={img.id || index}
            onClick={() => setSelectedImageIndex(index)}
            className={`product-detail-page__thumbnail ${
              selectedImageIndex === index ? "active" : ""
            }`}
            aria-label={`Görsel ${index + 1} seç`}
          >
            <div className="product-detail-page__thumbnail-image">
              <CustomImage
                src={img.imageUrl || ""}
                tempImage={getRandomPlaceholderImage(index)}
                alt={`Ürün görseli ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            {(img as any).isMain && (
              <div className="product-detail-page__thumbnail-main-badge">
                ANA
              </div>
            )}
            {selectedImageIndex === index && (
              <div className="product-detail-page__thumbnail-active-indicator"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
