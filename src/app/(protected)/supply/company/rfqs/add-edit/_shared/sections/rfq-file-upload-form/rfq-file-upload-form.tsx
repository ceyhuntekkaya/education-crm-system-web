"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import { FileInput } from "@/components";
import { FormProvider, useForm } from "@/contexts/form-context";
import { CompanyProvider } from "@/app/(protected)/company/_shared/context";
import { CustomCard } from "@/components";
import { MediaGallery, MediaGalleryItem } from "@/components/ui";

export interface RFQFileUploadFormHandle {
  submitFiles: () => Promise<void>;
  getFiles: () => MediaGalleryItem[];
}

export interface RFQFileUploadFormProps {
  className?: string;
}

/**
 * RFQ dosya yükleme formu - Internal Component
 */
const RFQFileUploadFormContent = forwardRef<
  RFQFileUploadFormHandle,
  RFQFileUploadFormProps
>(({ className }, ref) => {
  const { getValue, setValue } = useForm();

  // Form'dan değerleri al
  const uploadedFiles = useMemo(
    () => (getValue("rfqDocuments") as any[]) || [],
    [getValue],
  );

  const fileInputKey = useMemo(
    () => (getValue("fileInputKey") as number) || 0,
    [getValue],
  );

  const currentIndex = useMemo(
    () => (getValue("currentIndex") as number) || 0,
    [getValue],
  );

  const uploadError = useMemo(
    () => (getValue("uploadError") as string | null) || null,
    [getValue],
  );

  // Dosya yükleme başarılı olduğunda
  const handleUploadSuccess = useCallback(
    (response: any) => {
      console.log("✅ Dosya yükleme başarılı:", response);

      // Response'tan dosya bilgilerini al
      if (Array.isArray(response) && response.length > 0) {
        const uploadedFile = response[0];

        // MediaGalleryItem formatına çevir
        const mediaItem: any = {
          id: uploadedFile.id || Date.now(),
          fileName: uploadedFile.fileName || uploadedFile.originalFileName,
          originalFileName: uploadedFile.originalFileName,
          fileUrl: uploadedFile.path || uploadedFile.fileUrl,
          mimeType: uploadedFile.mimeType,
          fileSizeBytes: uploadedFile.size,
          itemType: uploadedFile.mimeType?.includes("image")
            ? "IMAGE"
            : uploadedFile.mimeType?.includes("video")
              ? "VIDEO"
              : "DOCUMENT",
        };

        // Mevcut dosyalara ekle
        const currentFiles = (getValue("rfqDocuments") as any[]) || [];
        setValue("rfqDocuments", [...currentFiles, mediaItem]);
      }

      setValue("uploadError", null);
      // FileInput'u sıfırla - key değişince component yeniden render olur
      setValue("fileInputKey", fileInputKey + 1);
    },
    [getValue, setValue, fileInputKey],
  );

  // Dosya yükleme hatası olduğunda
  const handleUploadError = useCallback(
    (error: any) => {
      console.error("❌ Dosya yükleme hatası:", error);
      setValue("uploadError", "Dosya yüklenirken hata oluştu");
    },
    [setValue],
  );

  // Dosya silme - Form state'inden sil
  const handleDeleteFile = useCallback(() => {
    if (uploadedFiles.length === 0) return;

    const newFiles = uploadedFiles.filter((_, index) => index !== currentIndex);
    setValue("rfqDocuments", newFiles);

    // Index'i ayarla
    const newIndex =
      currentIndex >= newFiles.length && newFiles.length > 0
        ? newFiles.length - 1
        : newFiles.length === 0
          ? 0
          : currentIndex;

    setValue("currentIndex", newIndex);
  }, [uploadedFiles, currentIndex, setValue]);

  // Parent component'ten çağrılabilecek metodlar
  useImperativeHandle(
    ref,
    () => ({
      submitFiles: async () => {
        if (uploadedFiles.length === 0) {
          console.log("ℹ️ Yüklenmiş dosya yok");
          return;
        }
        console.log(
          "✅ Dosyalar zaten yüklendi:",
          uploadedFiles.length,
          "adet",
        );
      },
      getFiles: () => uploadedFiles,
    }),
    [uploadedFiles],
  );

  return (
    <div className={className}>
      <CustomCard
        title="Döküman Yükleme"
        subtitle="Alım ilanı için gerekli döküman, belge, resim veya videoları yükleyin"
        headerAction={
          uploadedFiles.length > 0 ? (
            <span className="badge bg-primary-50 text-primary-700 rounded-pill px-4 py-1 text-xs">
              {uploadedFiles.length} Döküman
            </span>
          ) : null
        }
      >
        <div className="row g-4">
          {/* Sol Taraf - Dosya Yükleme Alanı (col-4) */}
          <div className="col-4">
            <div className="d-flex flex-column gap-24">
              {/* Başlık */}
              <div className="d-flex align-items-center">
                <i className="bi bi-cloud-arrow-up text-primary-600 fs-5"></i>
                <h6 className="text-neutral-900 fw-semibold fs-15 mb-0">
                  Yeni Dosya Ekle
                </h6>
              </div>

              {/* FileInput */}
              <FileInput
                key={fileInputKey}
                name={`rfqDocuments_temp_${fileInputKey}`}
                label=""
                type="all"
                variant="outline"
                multiple={false}
                maxFiles={1}
                maxSize={50}
                placeholder="Dosyayı sürükleyin veya tıklayın"
                isAutoUpload={true}
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                required={false}
              />

              {/* Yükleme hatası */}
              {uploadError && (
                <div
                  className="alert alert-danger d-flex align-items-start p-3 mb-0 mt-3 text-xs rounded-8"
                  role="alert"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2 fs-6"></i>
                  <div>{uploadError}</div>
                </div>
              )}
            </div>
          </div>

          {/* Sağ Taraf - Yüklenen Dosyalar (col-8) */}
          <div className="col-8">
            {/* Başlık ve Kontroller */}
            <div className="d-flex flex-column gap-24">
              {/* Başlık */}
              <div className="d-flex align-items-center">
                <i className="bi bi-cloud-arrow-up text-primary-600 fs-5"></i>
                <h6 className="text-neutral-900 fw-semibold fs-15 mb-0">
                  Yüklenen Dosyalar
                </h6>
                {uploadedFiles.length > 0 && (
                  <span className="badge bg-primary-100 text-primary-700 rounded-pill px-4 py-1 text-xs ms-8">
                    {uploadedFiles.length}
                  </span>
                )}
              </div>

              {uploadedFiles.length === 0 ? (
                <div className="media-gallery-container empty">
                  <div className="gallery-empty-state">
                    <div className="empty-icon">
                      <i className="ph ph-images"></i>
                    </div>
                    <h3>Henüz Dosya Eklenmedi</h3>
                    <p>
                      Sol taraftaki yükleme alanından dosya ekleyebilirsiniz
                    </p>
                  </div>
                </div>
              ) : (
                <div className="position-relative">
                  <MediaGallery
                    key={uploadedFiles.length}
                    items={uploadedFiles as MediaGalleryItem[]}
                    showThumbnails={true}
                    showNavigation={true}
                    showCounter={true}
                    initialIndex={uploadedFiles.length - 1}
                    onIndexChange={(index) => setValue("currentIndex", index)}
                  />

                  {/* Delete Button */}
                  <button
                    type="button"
                    className="btn btn-danger btn-sm position-absolute rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      top: "16px",
                      right: "16px",
                      width: "40px",
                      height: "40px",
                      zIndex: 10,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                    onClick={handleDeleteFile}
                    title="Dosyayı Sil"
                  >
                    <i className="ph ph-trash" style={{ fontSize: "18px" }}></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CustomCard>
    </div>
  );
});

RFQFileUploadFormContent.displayName = "RFQFileUploadFormContent";

/**
 * RFQ dosya yükleme formu - Wrapper with providers
 */
export const RFQFileUploadForm = forwardRef<
  RFQFileUploadFormHandle,
  RFQFileUploadFormProps
>((props, ref) => {
  return (
    <CompanyProvider>
      <FormProvider
        initialValues={{
          rfqDocuments: [],
          fileInputKey: 0,
          currentIndex: 0,
          uploadError: null,
        }}
      >
        <RFQFileUploadFormContent {...props} ref={ref} />
      </FormProvider>
    </CompanyProvider>
  );
});

RFQFileUploadForm.displayName = "RFQFileUploadForm";
