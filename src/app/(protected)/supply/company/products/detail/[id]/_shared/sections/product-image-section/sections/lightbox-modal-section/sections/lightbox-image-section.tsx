import React from "react";
import { CustomImage } from "@/components/ui";
import { useProductDetail } from "../../../../../context";
import { getRandomPlaceholderImage } from "../../../../../utils";

export const LightboxImageSection: React.FC = () => {
  const {
    product,
    selectedImageIndex,
    lightboxImageRef,
    selectedImage,
    handleImageMouseMove,
  } = useProductDetail();

  if (!product) return null;

  return (
    <div
      className="product-detail-page__lightbox-image-wrapper"
      ref={lightboxImageRef}
      onMouseMove={(e) => handleImageMouseMove(e, true)}
    >
      <CustomImage
        src={selectedImage?.imageUrl || ""}
        tempImage={getRandomPlaceholderImage(selectedImageIndex)}
        alt={product.name || "Ürün görseli"}
        fill
        className="product-detail-page__lightbox-image"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};
