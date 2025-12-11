"use client";

import { useCallback } from "react";
import { useCompany } from "@/app/(protected)/company/_shared/context";
import { useForm } from "@/contexts/form-context";
import { getUploadUrl, getFileServeUrl } from "@/lib/api/constants";
import { UseFileUploadOptions } from "../types/hook.types";
import { MediaType } from "@/enums";

/**
 * Backend'den gelen documentType'ı MediaType'a çevir
 */
const convertDocumentTypeToMediaType = (
  documentType?: string
): MediaType | undefined => {
  if (!documentType) return undefined;

  const upperType = documentType.toUpperCase();
  // Backend'den gelen documentType değerlerini MediaType enum'una map et
  if (upperType === "IMAGE") return MediaType.IMAGE;
  if (upperType === "VIDEO") return MediaType.VIDEO;
  if (upperType === "AUDIO") return MediaType.AUDIO;
  if (upperType === "DOCUMENT") return MediaType.DOCUMENT;
  if (upperType === "ARCHIVE") return MediaType.ARCHIVE;

  return MediaType.OTHER;
};

/**
 * Dosya MIME type'ına göre MediaType belirle
 */
const getMediaTypeFromMimeType = (
  mimeType: string,
  fileName: string
): MediaType => {
  // MIME type'a göre kontrol
  if (mimeType.startsWith("image/")) {
    return MediaType.IMAGE;
  }

  if (mimeType.startsWith("video/")) {
    return MediaType.VIDEO;
  }

  if (mimeType.startsWith("audio/")) {
    return MediaType.AUDIO;
  }

  // Dosya uzantısına göre kontrol
  const extension = fileName.split(".").pop()?.toLowerCase() || "";

  // Doküman uzantıları
  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "csv",
  ];
  if (documentExtensions.includes(extension)) {
    return MediaType.DOCUMENT;
  }

  // Arşiv uzantıları
  const archiveExtensions = ["zip", "rar", "7z", "tar", "gz"];
  if (archiveExtensions.includes(extension)) {
    return MediaType.ARCHIVE;
  }

  // MIME type'da application kontrolü
  if (
    mimeType.includes("pdf") ||
    mimeType.includes("document") ||
    mimeType.includes("spreadsheet") ||
    mimeType.includes("presentation") ||
    mimeType.includes("text")
  ) {
    return MediaType.DOCUMENT;
  }

  if (mimeType.includes("zip") || mimeType.includes("compressed")) {
    return MediaType.ARCHIVE;
  }

  return MediaType.OTHER;
};

export const useFileUpload = ({
  files,
  name,
  onUpload,
  onUploadSuccess,
  onUploadError,
  onInternalError,
  setInternalLoading,
  markFilesAsUploaded,
}: UseFileUploadOptions) => {
  const { selectedSchool } = useCompany();
  const { setValue } = useForm();

  const handleUpload = useCallback(
    async (filesToUpload?: File[]) => {
      console.log(
        "🚀 handleUpload başladı - files:",
        files.length,
        "filesToUpload:",
        filesToUpload?.length
      );

      // Eğer filesToUpload parametresi varsa onu kullan (SADECE CROP İÇİN), yoksa state'ten al
      let newFiles: File[];
      const isCropUpload = filesToUpload && filesToUpload.length === 1; // Crop her zaman tek dosya

      if (isCropUpload) {
        // Direkt gönderilen dosyaları kullan (crop için - TEK DOSYA)
        newFiles = filesToUpload;
        console.log("📁 Crop upload - Tek dosya:", newFiles[0].name);
      } else {
        // State'ten dosyaları al (NORMAL UPLOAD veya ÇOKLu UPLOAD)
        if (files.length === 0) {
          console.log("❌ handleUpload - files.length === 0, çıkılıyor");
          return;
        }

        // Sadece yeni dosyaları filtrele (isUploaded olmayan dosyalar)
        newFiles = files.filter((file) => !(file as any).isUploaded);

        console.log("📊 handleUpload - State'ten dosya durumu:", {
          totalFiles: files.length,
          newFiles: newFiles.length,
          uploadedFiles: files.filter((f) => (f as any).isUploaded).length,
        });

        // Eğer yeni dosya yoksa, yükleme yapma
        if (newFiles.length === 0) {
          console.log("⚠️ Yüklenecek yeni dosya yok");
          return;
        }
      }

      console.log("📤 handleUpload - API'ye istek atılıyor...", {
        schoolId: selectedSchool?.id,
        name,
        fileCount: newFiles.length,
        isCropUpload,
      });

      // Loading başlat
      setInternalLoading?.(true);

      try {
        if (onUpload) {
          await onUpload(newFiles);
          onUploadSuccess?.(newFiles);
          // Yükleme başarılı olduktan sonra dosyaları işaretle
          markFilesAsUploaded?.();
          return;
        }

        const schoolId = selectedSchool?.id?.toString() || "1";
        // ** konuşulup düzenlenmesi lazım
        if (!schoolId || !name) {
          throw new Error("School ID veya upload type tanımlı değil");
        }

        const formData = new FormData();
        // Sadece yeni dosyaları FormData'ya ekle
        newFiles.forEach((file) => formData.append("files", file));

        const uploadUrl = getUploadUrl(schoolId, name);
        const xhr = new XMLHttpRequest();

        return new Promise<void>((resolve, reject) => {
          xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
              const progress = Math.round((e.loaded * 100) / e.total);
              console.log(`Upload progress: ${progress}%`);
            }
          });

          xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const response = JSON.parse(xhr.responseText);

                // Multi file upload kontrolü
                const isMultiFileUpload =
                  newFiles.length > 1 || files.length > 1;

                if (
                  name &&
                  response &&
                  Array.isArray(response) &&
                  response.length > 0
                ) {
                  if (isMultiFileUpload) {
                    // Eski dosyaları al (isUploaded olanlar)
                    const oldFiles = files.filter(
                      (file) => (file as any).isUploaded
                    );

                    // Eski dosyaları items formatına çevir
                    const oldItems = oldFiles.map(
                      (file: any, index: number) => {
                        let fileUrl = "";

                        // 1. Önce path field'ını kontrol et (önceki upload'tan gelenler)
                        if (file.path) {
                          fileUrl = file.path;
                        }
                        // 2. preview'dan çıkar (initialValue'dan gelenler)
                        else if (file.preview) {
                          // Eski dosyalarda preview zaten tam URL, serve prefix'ini çıkar
                          fileUrl = file.preview;
                          const servePrefix = getFileServeUrl("");
                          if (fileUrl.startsWith(servePrefix)) {
                            fileUrl = fileUrl.substring(servePrefix.length);
                          }
                        }

                        console.log("🔄 oldItems - Eski dosya işleniyor:", {
                          name: file.name,
                          hasPath: !!file.path,
                          hasPreview: !!file.preview,
                          fileUrl,
                          id: file.id,
                        });

                        // Dosya tipini MIME type ve dosya adına göre belirle
                        const itemType = getMediaTypeFromMimeType(
                          file.type || "",
                          file.name || ""
                        );

                        return {
                          id: file.id || null, // Mevcut item ID'sini sakla, yoksa null
                          itemType: file.itemType || itemType, // Önce file.itemType'a bak, yoksa hesapla
                          fileUrl: fileUrl, // Sadece path kısmı
                          fileName: file.name,
                          sortOrder: file.sortOrder || index + 1,
                        };
                      }
                    );

                    // Yeni yüklenen dosyaları items formatına çevir
                    const newItems = response.map(
                      (file: any, index: number) => {
                        const filePath = file.path || file.fileUrl; // Backend'den gelen path field'ı

                        // itemType'ı belirle - documentType'ı MediaType'a çevir
                        const itemType =
                          file.itemType ||
                          file.mediaType ||
                          convertDocumentTypeToMediaType(file.documentType) ||
                          MediaType.IMAGE;

                        return {
                          id: null, // Yeni dosyalar için ID her zaman null
                          itemType: itemType,
                          fileUrl: filePath, // path değerini fileUrl olarak kullan
                          fileName:
                            file.fileName ||
                            file.originalFileName ||
                            file.fileOriginalName,
                          sortOrder:
                            file.sortOrder || oldItems.length + index + 1,
                        };
                      }
                    );

                    // Eski ve yeni dosyaları birleştir
                    const allItems = [...oldItems, ...newItems];

                    // Tüm dosyaları form'a kaydet
                    setValue(name, allItems);
                    console.log(
                      `Multi file upload başarılı (${oldItems.length} eski + ${newItems.length} yeni = ${allItems.length} toplam dosya):`,
                      allItems
                    );

                    // Yükleme başarılı olduktan sonra tüm dosyaları işaretle
                    // allItems'ı kullanarak placeholder dosyalar oluştur
                    // replaceAll: true -> allItems zaten eski+yeni birleştirilmiş, tekrar ekleme!
                    markFilesAsUploaded?.(
                      allItems.map((item) => {
                        // itemType'a göre uygun MIME type belirle
                        let mimeType = "application/octet-stream";
                        if (item.itemType === MediaType.IMAGE) {
                          mimeType = "image/jpeg";
                        } else if (item.itemType === MediaType.VIDEO) {
                          mimeType = "video/mp4";
                        } else if (item.itemType === MediaType.AUDIO) {
                          mimeType = "audio/mpeg";
                        } else if (item.itemType === MediaType.DOCUMENT) {
                          // Dosya uzantısına göre MIME type belirle
                          const ext = item.fileName
                            .split(".")
                            .pop()
                            ?.toLowerCase();
                          if (ext === "pdf") mimeType = "application/pdf";
                          else if (ext === "doc" || ext === "docx")
                            mimeType =
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                          else if (ext === "xls" || ext === "xlsx")
                            mimeType =
                              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                          else if (ext === "txt") mimeType = "text/plain";
                          else mimeType = "application/pdf";
                        }

                        // Backend'den gelen path field'ını kullan (item.fileUrl zaten path değerini içeriyor)
                        // Bu path'i tam URL'ye çevirmeye gerek yok, markFilesAsUploaded içinde yapılacak
                        return {
                          id: item.id, // ID bilgisini placeholder'a ekle
                          path: item.fileUrl, // allItems'dan gelen fileUrl aslında path değeri
                          fileUrl: item.fileUrl, // Geriye dönük uyumluluk için
                          originalFileName: item.fileName,
                          fileName: item.fileName,
                          mediaType: item.itemType,
                          itemType: item.itemType,
                          mimeType: mimeType,
                          sortOrder: item.sortOrder,
                        };
                      }),
                      true // replaceAll: true - allItems zaten eski+yeni birleştirilmiş
                    );
                  } else {
                    // Tek dosya için mevcut mantık
                    const firstFile = response[0];
                    // Backend'den gelen path field'ını kullan
                    const filePath = firstFile.path || firstFile.fileUrl;
                    if (filePath) {
                      const fullUrl = getFileServeUrl(filePath);
                      setValue(name, fullUrl);
                    }

                    // Tek dosya için de işaretle
                    markFilesAsUploaded?.(response);
                  }
                }

                // Her iki durumda da onUploadSuccess callback'ini çağır
                onUploadSuccess?.(response);

                // Loading kapat
                setInternalLoading?.(false);

                resolve();
              } catch (error) {
                const errorMsg = "Response parse edilemedi";
                onInternalError?.(errorMsg);
                onUploadError?.(errorMsg);

                // Loading kapat
                setInternalLoading?.(false);

                reject(new Error(errorMsg));
              }
            } else {
              const errorMsg = `Upload failed with status: ${xhr.status}`;
              onInternalError?.(errorMsg);
              onUploadError?.(errorMsg);

              // Loading kapat
              setInternalLoading?.(false);

              reject(new Error(errorMsg));
            }
          });

          xhr.addEventListener("error", () => {
            const errorMsg = "Dosya yüklenirken bir hata oluştu";
            onInternalError?.(errorMsg);
            onUploadError?.(errorMsg);

            // Loading kapat
            setInternalLoading?.(false);

            reject(new Error(errorMsg));
          });

          xhr.addEventListener("abort", () => {
            const errorMsg = "Upload iptal edildi";
            onInternalError?.(errorMsg);
            onUploadError?.(errorMsg);

            // Loading kapat
            setInternalLoading?.(false);

            reject(new Error(errorMsg));
          });

          xhr.open("POST", uploadUrl);
          xhr.send(formData);
        });
      } catch (error) {
        console.error("Upload error:", error);
        const errorMsg =
          error instanceof Error
            ? error.message
            : "Dosya yüklenirken bir hata oluştu";
        onInternalError?.(errorMsg);
        onUploadError?.(errorMsg);

        // Loading kapat
        setInternalLoading?.(false);

        throw error;
      }
    },
    [
      files,
      selectedSchool?.id,
      name,
      setValue,
      onUpload,
      onUploadSuccess,
      onUploadError,
      onInternalError,
      setInternalLoading,
      markFilesAsUploaded,
    ]
  );

  return { handleUpload };
};
