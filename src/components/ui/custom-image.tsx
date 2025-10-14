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

    // Fallback sistemi:
    // 1. Eğer tempImage varsa ve hata oluşmuşsa -> tempImage
    // 2. Eğer src varsa -> src
    // 3. Eğer tempImage yoksa ve hata oluşmuşsa -> DEFAULT_ERROR_IMAGE
    // 4. Eğer hiçbiri yoksa -> DEFAULT_ERROR_IMAGE
    const imageSrc = (() => {
      if (imageError) {
        return tempImage || DEFAULT_ERROR_IMAGE;
      }
      if (src) {
        return src;
      }
      return tempImage || DEFAULT_ERROR_IMAGE;
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
