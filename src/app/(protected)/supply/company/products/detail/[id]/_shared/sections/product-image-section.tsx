import React, { useState, useMemo } from "react";
import { CustomImage } from "@/components/ui";
import { useProductDetail } from "../context";
import { getRandomPlaceholderImage } from "../utils";

export const ProductImageSection: React.FC = () => {
  const { product, statusInfo, isLowStock, isOutOfStock, images } =
    useProductDetail();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Ana görsel + ek görselleri birleştir
  const allImages = useMemo(() => {
    const imagesList = [];

    // Ana görseli ilk sıraya ekle
    if (product?.mainImageUrl) {
      imagesList.push({
        id: 0,
        imageUrl: product.mainImageUrl,
        displayOrder: 0,
        isMain: true,
      });
    }

    // Ek görselleri ekle (displayOrder'a göre sıralı)
    if (images && images.length > 0) {
      const sortedImages = [...images].sort(
        (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
      );
      imagesList.push(
        ...sortedImages.map((img) => ({
          ...img,
          isMain: false,
        }))
      );
    }

    return imagesList;
  }, [product?.mainImageUrl, images]);

  const selectedImage = allImages[selectedImageIndex];

  if (!product) return null;

  return (
    <div className="product-detail-page__image-section">
      <div className="product-detail-page__image-container">
        {allImages.length > 0 ? (
          <>
            {/* Ana Görsel Alanı */}
            <div className="product-detail-page__main-image">
              <CustomImage
                src={selectedImage?.imageUrl || ""}
                tempImage={getRandomPlaceholderImage(selectedImageIndex)}
                alt={product.name || "Ürün görseli"}
                fill
                className="rounded-12"
                style={{ objectFit: "contain" }}
              />
              {/* Low Stock Badge */}
              {isLowStock && !isOutOfStock && (
                <div
                  className="position-absolute"
                  style={{ top: "12px", left: "12px" }}
                >
                  <span
                    className="d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold text-white"
                    style={{
                      backgroundColor: "hsl(var(--warning-600))",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <i
                      className="ph-fill ph-warning-circle"
                      style={{ fontSize: "12px" }}
                    ></i>
                    Düşük Stok
                  </span>
                </div>
              )}
              {/* Status Badge */}
              <div
                className="position-absolute"
                style={{ top: "12px", right: "12px" }}
              >
                <span
                  className={`d-inline-flex align-items-center gap-6 px-12 py-6 rounded-8 text-xs fw-semibold ${statusInfo.bgClass} ${statusInfo.textClass}`}
                  style={{
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <span className="w-4 h-4 rounded-circle bg-white"></span>
                  {statusInfo.label}
                </span>
              </div>
              {/* Out of Stock Overlay */}
              {isOutOfStock && (
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.9)",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  <span className="text-white fw-bold fs-5">Stokta Yok</span>
                </div>
              )}
            </div>

            {/* Küçük Görseller (Thumbnail Gallery) */}
            {allImages.length > 1 && (
              <div className="product-detail-page__thumbnail-gallery mt-3">
                <div className="d-flex gap-2 flex-wrap">
                  {allImages.map((img, index) => (
                    <button
                      key={img.id || index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`product-detail-page__thumbnail ${
                        selectedImageIndex === index ? "active" : ""
                      }`}
                      style={{
                        width: "80px",
                        height: "80px",
                        position: "relative",
                        border:
                          selectedImageIndex === index
                            ? "2px solid hsl(var(--primary-600))"
                            : "1px solid hsl(var(--neutral-200))",
                        borderRadius: "8px",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        backgroundColor: "hsl(var(--neutral-0))",
                      }}
                    >
                      <CustomImage
                        src={img.imageUrl || ""}
                        tempImage={getRandomPlaceholderImage(index)}
                        alt={`Ürün görseli ${index + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      {(img as any).isMain && (
                        <div
                          className="position-absolute"
                          style={{
                            top: "4px",
                            left: "4px",
                            backgroundColor: "hsl(var(--primary-600))",
                            color: "white",
                            fontSize: "8px",
                            padding: "2px 4px",
                            borderRadius: "4px",
                            fontWeight: 600,
                          }}
                        >
                          ANA
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="product-detail-page__image-placeholder">
            <i className="ph-duotone ph-package"></i>
            <p className="mt-3">Görsel bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
};
