"use client";

import React, { useState, useEffect, forwardRef } from "react";
import Image, { ImageProps } from "next/image";
import { UPLOAD_SERVE_URL } from "@/lib/api/constants";

// Default error image - hatalı görselleri belirtir
const DEFAULT_ERROR_IMAGE =
  "https://static.thenounproject.com/png/504708-200.png";

export type ImageVariant =
  | "default"
  | "rounded"
  | "rounded-sm"
  | "rounded-lg"
  | "card"
  | "circle"
  | "square";

interface CustomImageProps extends Omit<ImageProps, "src"> {
  src?: string | undefined | null;
  tempImage?: string;
  onError?: () => void;
  variant?: ImageVariant;
}

// Variant'a göre CSS class'ları
const variantStyles: Record<ImageVariant, string> = {
  default: "",
  "rounded-sm": "rounded-4",
  rounded: "rounded-8",
  "rounded-lg": "rounded-16",
  card: "rounded-16",
  circle: "rounded-circle",
  square: "rounded-0",
};

const CustomImage = forwardRef<HTMLImageElement, CustomImageProps>(
  (
    { src, tempImage, onError, alt, variant = "default", className, ...props },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    // src veya tempImage değiştiğinde imageError state'ini sıfırla
    useEffect(() => {
      setImageError(false);
    }, [src, tempImage]);

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

      // If it's a relative path from upload API (e.g., "0/logoUrl/...")
      // prepend UPLOAD_SERVE_URL
      if (url.match(/^\d+\//)) {
        return `${UPLOAD_SERVE_URL}${url}`;
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

    // Error image kontrolü
    const isErrorImage = imageSrc === DEFAULT_ERROR_IMAGE;

    // Circle variant için özel işlem
    if (variant === "circle") {
      const { width, height, style, ...restProps } = props;

      // Width veya height verilmişse, en büyük olanı kullan (kare yap)
      const size = width || height || 100;

      return (
        <div
          style={{
            width: typeof size === "number" ? `${size}px` : size,
            height: typeof size === "number" ? `${size}px` : size,
            position: "relative",
            overflow: "hidden",
            borderRadius: "50%",
            flexShrink: 0,
            backgroundColor: isErrorImage ? "#f5f6f7" : "transparent",
            ...style,
          }}
          className={className}
        >
          <Image
            ref={ref}
            {...restProps}
            fill
            src={imageSrc}
            alt={alt}
            onError={handleImageError}
            style={{
              objectFit: isErrorImage ? "contain" : "cover",
              padding: isErrorImage ? "20%" : "0",
            }}
          />
        </div>
      );
    }

    // Card variant için özel işlem
    if (variant === "card") {
      const { width, height, style, ...restProps } = props;

      return (
        <div
          style={{
            width: width
              ? typeof width === "number"
                ? `${width}px`
                : width
              : "100%",
            height: height
              ? typeof height === "number"
                ? `${height}px`
                : height
              : "auto",
            position: "relative",
            overflow: "hidden",
            borderRadius: "16px",
            backgroundColor: isErrorImage ? "#f5f6f7" : "transparent",
            ...style,
          }}
          className={className}
        >
          <Image
            ref={ref}
            {...restProps}
            fill={!!(width && height)}
            width={!width || !height ? width : undefined}
            height={!width || !height ? height : undefined}
            src={imageSrc}
            alt={alt}
            onError={handleImageError}
            style={{
              objectFit: isErrorImage ? "contain" : "cover",
              padding: isErrorImage ? "15%" : "0",
            }}
          />
        </div>
      );
    }

    // Diğer variant'lar için normal işlem
    const imageClassName = [variantStyles[variant], className]
      .filter(Boolean)
      .join(" ");

    return (
      <Image
        ref={ref}
        {...props}
        src={imageSrc}
        alt={alt}
        onError={handleImageError}
        className={imageClassName || undefined}
      />
    );
  }
);

CustomImage.displayName = "CustomImage";

export default CustomImage;
