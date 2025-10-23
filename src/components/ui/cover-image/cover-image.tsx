import React from "react";
import { CustomCard, CustomImage } from "@/components/ui";

export interface CoverImageProps {
  /** Ana kapak görseli URL'i */
  coverImageUrl?: string;
  /** Logo görseli URL'i (opsiyonel - sağ üst köşede gösterilir) */
  logoUrl?: string;
  /** Başlık */
  title: string;
  /** Alt başlık veya açıklama */
  subtitle?: string;
  /** Yedek kapak görseli */
  fallbackCoverImage?: string;
  /** Yedek logo görseli */
  fallbackLogoImage?: string;
  /** Kapak görseli yüksekliği */
  height?: string | number;
  /** Logo boyutu */
  logoSize?: number;
  /** Card kullanılsın mı? */
  useCard?: boolean;
  /** Border radius */
  borderRadius?: string;
  /** Empty state mesajı */
  emptyStateMessage?: string;
  /** Empty state ikonu */
  emptyStateIcon?: string;
  /** Custom className */
  className?: string;
  /** Gradient overlay kullanılsın mı? */
  showGradient?: boolean;
  /** Logo pozisyonu */
  logoPosition?: "top-right" | "bottom-left" | "bottom-right" | "top-left";
  /** İçerik pozisyonu */
  contentPosition?:
    | "bottom-left"
    | "bottom-right"
    | "top-left"
    | "top-right"
    | "center";
}

const CoverImage: React.FC<CoverImageProps> = ({
  coverImageUrl,
  logoUrl,
  title,
  subtitle,
  fallbackCoverImage = "https://t4.ftcdn.net/jpg/02/14/31/63/360_F_214316329_vX8WM2z1DLYfzcyRxqOenc9SJV7gXOyJ.jpg",
  fallbackLogoImage = "https://img.freepik.com/premium-vector/school-icon-set-public-primary-high-school-vector-symbol-college-institute-building-sign-university-icon-black-filled-outlined-style_268104-13445.jpg",
  height = "300px",
  logoSize = 80,
  useCard = true,
  borderRadius = "rounded-16",
  emptyStateMessage = "Görsel mevcut değil",
  emptyStateIcon = "ph ph-image",
  className = "",
  showGradient = true,
  logoPosition = "top-right",
  contentPosition = "bottom-left",
}) => {
  // Empty state
  if (!coverImageUrl) {
    const emptyContent = (
      <div
        className={`position-relative ${borderRadius} overflow-hidden bg-neutral-100 d-flex align-items-center justify-content-center ${className}`}
        style={{ height }}
      >
        <div className="text-center text-neutral-500">
          <i className={`${emptyStateIcon} text-5xl mb-12`}></i>
          <p className="mb-0">{emptyStateMessage}</p>
        </div>
      </div>
    );

    return useCard ? (
      <CustomCard className="p-0">{emptyContent}</CustomCard>
    ) : (
      emptyContent
    );
  }

  // Logo pozisyon class'ları
  const getLogoPositionClass = () => {
    switch (logoPosition) {
      case "top-right":
        return "top-0 end-0";
      case "top-left":
        return "top-0 start-0";
      case "bottom-right":
        return "bottom-0 end-0";
      case "bottom-left":
        return "bottom-0 start-0";
      default:
        return "top-0 end-0";
    }
  };

  // İçerik pozisyon class'ları
  const getContentPositionClass = () => {
    switch (contentPosition) {
      case "bottom-left":
        return "bottom-0 start-0";
      case "bottom-right":
        return "bottom-0 end-0";
      case "top-left":
        return "top-0 start-0";
      case "top-right":
        return "top-0 end-0";
      case "center":
        return "top-50 start-50 translate-middle";
      default:
        return "bottom-0 start-0";
    }
  };

  const coverContent = (
    <div
      className={`position-relative ${borderRadius} overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Cover Image */}
      <CustomImage
        src={coverImageUrl}
        tempImage={fallbackCoverImage}
        alt={title}
        fill
        className="object-cover"
      />

      {/* Gradient Overlay */}
      {showGradient && (
        <div
          className="position-absolute inset-0"
          style={{
            background: contentPosition.includes("bottom")
              ? "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 30%, transparent 100%)"
              : contentPosition.includes("top")
              ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 30%, transparent 100%)"
              : "linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 100%)",
          }}
        />
      )}

      {/* Logo - Opsiyonel */}
      {logoUrl && (
        <div className={`position-absolute ${getLogoPositionClass()} p-24`}>
          <div className="bg-white rounded-circle p-8 shadow-sm">
            <CustomImage
              src={logoUrl}
              tempImage={fallbackLogoImage}
              alt={`${title} Logo`}
              width={logoSize}
              height={logoSize}
              className="rounded-circle aspect-ratio-1 object-cover"
            />
          </div>
        </div>
      )}

      {/* Content - Title & Subtitle */}
      <div
        className={`position-absolute ${getContentPositionClass()} p-24 text-white`}
      >
        <h2
          className="h3 fw-bold mb-8 text-white"
          style={{
            textShadow:
              "0 2px 8px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3)",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-white mb-0"
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
              textShadow:
                "0 1px 4px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  return useCard ? (
    <CustomCard className="p-0 overflow-hidden">{coverContent}</CustomCard>
  ) : (
    coverContent
  );
};

export default CoverImage;
