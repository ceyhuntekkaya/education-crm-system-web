"use client";

import React, { useEffect, useRef } from "react";
import { FileInput } from "@/components/file-input";
import { useFormField, useForm } from "@/contexts/form-context";
import { useProductAddEdit } from "../../../context";
import { useProductsContext } from "../../../../../_shared/contexts";
import { CustomImage } from "@/components/ui";

/**
 * Product Images Form Content Component
 */
export const ProductImagesFormContent: React.FC = () => {
  // Product Add/Edit context'ten sadece action'ları al
  const {
    productId,
    createProductImage,
    createProductImageLoading: createLoading,
    deleteProductImage,
    deleteProductImageLoading: deleteLoading,
  } = useProductAddEdit();

  // Products context'ten veri al
  const {
    currentProductImages: images,
    currentProductImagesLoading: imagesLoading,
  } = useProductsContext();

  // Form context
  const { reset } = useForm();

  // Form field'ı izle - değişiklikleri otomatik yakalar
  const { value: productImageValue } = useFormField("productImage");
  const lastProcessedUrlRef = useRef<string | null>(null);
  const galleryHeaderRef = useRef<HTMLDivElement>(null);
  const productIdNum = productId ? parseInt(productId) : null;

  // Görsel silme handler
  const handleDeleteImage = async (
    imageId: number | undefined,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation(); // Overlay click'i engelle
    if (!imageId) return;

    // Direkt silme işlemi yap
    await deleteProductImage(imageId);
    // Ürün Görselleri alanının başına scroll yap
    setTimeout(() => {
      galleryHeaderRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // productImage değeri değiştiğinde POST isteği at
  useEffect(() => {
    if (!productIdNum) return;

    const imageUrl = productImageValue;

    // URL geçerli bir string ise ve daha önce işlenmemişse
    if (
      imageUrl &&
      typeof imageUrl === "string" &&
      imageUrl !== lastProcessedUrlRef.current &&
      imageUrl.trim() !== ""
    ) {
      // Son işlenen URL'yi kaydet
      lastProcessedUrlRef.current = imageUrl;

      // Dinamik displayOrder hesapla - mevcut görsellerin en yüksek displayOrder'ına +1 ekle
      const maxDisplayOrder =
        images.length > 0
          ? Math.max(...images.map((img) => img.displayOrder || 0), 0)
          : 0;
      const nextDisplayOrder = maxDisplayOrder + 1;

      // Product image oluştur
      createProductImage({
        imageUrl,
        displayOrder: nextDisplayOrder,
      }).then(() => {
        // Form'u sıfırla (FileInput da sıfırlanacak)
        reset();
        // Son işlenen URL'yi de sıfırla
        lastProcessedUrlRef.current = null;
        // Ürün Görselleri alanının başına scroll yap
        setTimeout(() => {
          galleryHeaderRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      });
    }
  }, [productImageValue, productIdNum, createProductImage, images, reset]);

  return (
    <div className="d-flex flex-column gap-24">
      {/* File Input */}
      <FileInput
        label="Görsel Yükle"
        type="img"
        variant="outline"
        multiple={false}
        placeholder="Görsel yüklemek için tıklayın veya sürükleyin"
        maxSize={10}
        name="productImage"
        isAutoUpload={true}
        loading={createLoading}
        disabled={createLoading}
      />

      {/* Mevcut Görseller Listesi */}
      {imagesLoading ? (
        <div className="text-center py-48">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="text-neutral-600 mt-16 mb-0">Görseller yükleniyor...</p>
        </div>
      ) : images.length > 0 ? (
        <div className="product-images-gallery">
          <div
            ref={galleryHeaderRef}
            className="d-flex align-items-center justify-content-between mb-20"
          >
            <div>
              <h5 className="mb-4 fw-semibold">Mevcut Görseller</h5>
              <p className="text-neutral-600 mb-0 text-sm">
                {images.length} görsel mevcut
              </p>
            </div>
          </div>
          <div className="row g-3">
            {images
              .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
              .map((image) => (
                <div key={image.id} className="col-6 col-md-4 col-lg-3">
                  <div className="product-image-card bg-white rounded-12 box-shadow-sm overflow-hidden position-relative transition-all h-100">
                    <div className="product-image-card__image position-relative">
                      <CustomImage
                        src={image.imageUrl || ""}
                        alt={`Ürün görseli ${image.displayOrder || ""}`}
                        className="w-100 h-100"
                        width={200}
                        height={200}
                        style={{
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                      />
                      {/* Display Order Badge */}
                      <div className="product-image-card__badge position-absolute top-0 start-0 m-12">
                        <span className="badge bg-dark bg-opacity-75 px-8 py-4 d-flex align-items-center gap-4">
                          <i
                            className="ph ph-list-numbers"
                            style={{ fontSize: "14px" }}
                          ></i>
                          <span className="fw-medium">
                            {image.displayOrder || "-"}
                          </span>
                        </span>
                      </div>
                      {/* Delete Button */}
                      <div className="product-image-card__delete position-absolute top-0 end-0 m-12">
                        <button
                          type="button"
                          className="btn btn-sm btn-danger rounded-circle p-0 d-flex align-items-center justify-content-center"
                          style={{ width: "32px", height: "32px" }}
                          onClick={(e) => handleDeleteImage(image.id, e)}
                          disabled={deleteLoading}
                          title="Görseli Sil"
                        >
                          {deleteLoading ? (
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : (
                            <i
                              className="ph ph-trash"
                              style={{ fontSize: "16px" }}
                            ></i>
                          )}
                        </button>
                      </div>
                      {/* Hover Overlay */}
                      <div className="product-image-card__overlay position-absolute inset-0 bg-dark bg-opacity-0 transition-all d-flex align-items-center justify-content-center">
                        <div className="text-white text-center opacity-0 transition-all">
                          <i
                            className="ph ph-eye"
                            style={{ fontSize: "24px" }}
                          ></i>
                          <p className="text-sm mt-8 mb-0 fw-medium">
                            Görüntüle
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-48">
          <div
            className="d-inline-flex align-items-center justify-content-center bg-neutral-100 rounded-circle mb-16"
            style={{ width: "64px", height: "64px" }}
          >
            <i
              className="ph ph-image text-neutral-400"
              style={{ fontSize: "32px" }}
            ></i>
          </div>
          <h6 className="mb-8 fw-medium">Henüz görsel eklenmemiş</h6>
          <p className="text-neutral-600 mb-0 text-sm">
            Ürününüz için görsel yükleyerek başlayın
          </p>
        </div>
      )}
    </div>
  );
};
