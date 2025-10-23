"use client";

import React, { useState, forwardRef } from "react";
import Image, { ImageProps } from "next/image";

// Default error image - hatalı görselleri belirtir
const DEFAULT_ERROR_IMAGE =
  "https://static.thenounproject.com/png/504708-200.png";

interface CustomImageProps extends Omit<ImageProps, "src"> {
  src?: string | undefined | null;
  tempImage?: string;
  onError?: () => void;
}

const CustomImage = forwardRef<HTMLImageElement, CustomImageProps>(
  ({ src, tempImage, onError, alt, ...props }, ref) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
      onError?.(); // Kullanıcının onError handler'ını çağır
    };

    // Helper function to normalize image URL
    const normalizeImageUrl = (
      url: string | null | undefined
    ): string | null => {
      if (!url) return null;
      // If it's already a full URL, return it
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
      }
      // If it's a data URL (base64) or blob URL, return it as-is
      if (url.startsWith("data:") || url.startsWith("blob:")) {
        return url;
      }
      // If it starts with /, return it
      if (url.startsWith("/")) {
        return url;
      }
      // Otherwise, prepend /
      return `/${url}`;
    };

    // Fallback sistemi:
    // 1. Eğer tempImage varsa ve hata oluşmuşsa -> tempImage
    // 2. Eğer src varsa -> src (normalize edilmiş)
    // 3. Eğer tempImage yoksa ve hata oluşmuşsa -> DEFAULT_ERROR_IMAGE
    // 4. Eğer hiçbiri yoksa -> DEFAULT_ERROR_IMAGE
    const imageSrc = (() => {
      if (imageError) {
        return normalizeImageUrl(tempImage) || DEFAULT_ERROR_IMAGE;
      }
      if (src) {
        return normalizeImageUrl(src) || DEFAULT_ERROR_IMAGE;
      }
      return normalizeImageUrl(tempImage) || DEFAULT_ERROR_IMAGE;
    })();

    return (
      <Image
        ref={ref}
        {...props}
        src={imageSrc}
        alt={alt}
        onError={handleImageError}
      />
    );
  }
);

CustomImage.displayName = "CustomImage";

export default CustomImage;
