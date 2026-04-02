"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FileWithPreview, FileValidationResult } from "../types/file.types";
import { validateFiles, createPreviewUrl, cleanupPreviewUrls } from "../utils";
import { getFileServeUrl } from "@/lib/api/constants";

/**
 * Dosya yönetimi hook'u - dosya seçme, ekleme, çıkarma
 */
export const useFileManagement = (props: {
  value?: File[] | File | null;
  initialValue?: string | any[]; // Form'dan gelen URL değeri veya array
  onChange?: (files: File[] | File | null) => void;
  onError?: (error: string) => void;
  type: "img" | "video" | "file" | "all";
  multiple: boolean;
  maxSize?: number;
  maxFiles?: number;
  acceptAttribute: string;
}) => {
  const {
    value,
    initialValue,
    onChange,
    onError,
    type,
    multiple,
    maxSize,
    maxFiles,
    acceptAttribute,
  } = props;

  // Tip bazında varsayılan değerleri ayarla
  const defaultMaxSize =
    maxSize ??
    (type === "video"
      ? 500 // Video için 500MB
      : type === "img"
        ? 10 // Resim için 10MB
        : type === "file"
          ? 50 // Dosya için 50MB
          : 100); // Genel için 100MB
  const defaultMaxFiles = maxFiles ?? 5;

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const initialValueProcessed = useRef(false);

  // InitialValue'dan (URL veya array) files state'ini güncelle - sadece bir kez
  useEffect(() => {
    if (initialValue && !initialValueProcessed.current) {
      initialValueProcessed.current = true;

      // Array ise (çoklu dosya)
      if (Array.isArray(initialValue)) {
        const placeholderFiles: FileWithPreview[] = initialValue.map((item) => {
          // Backend'den gelen path field'ını kullan (fileUrl yerine)
          const fileUrl = item.path || item.fileUrl || "";
          const fileName = item.fileName || fileUrl.split("/").pop() || "file";
          const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";

          // MIME type'ı belirle
          let mimeType = item.mimeType || "application/octet-stream";
          if (!item.mimeType) {
            if (["jpg", "jpeg"].includes(fileExtension))
              mimeType = "image/jpeg";
            else if (["png"].includes(fileExtension)) mimeType = "image/png";
            else if (["gif"].includes(fileExtension)) mimeType = "image/gif";
            else if (["webp"].includes(fileExtension)) mimeType = "image/webp";
            else if (["svg"].includes(fileExtension))
              mimeType = "image/svg+xml";
            else if (["mp4", "webm", "ogg"].includes(fileExtension)) {
              mimeType = `video/${fileExtension}`;
            } else if (["pdf"].includes(fileExtension)) {
              mimeType = "application/pdf";
            }
          }

          // Preview URL'sini oluştur - backend'den gelen path'e serve prefix ekle
          // fileUrl zaten backend'den gelen path (örn: "uploads/1/postImages/...")
          const previewUrl =
            fileUrl.startsWith("http://") || fileUrl.startsWith("https://")
              ? fileUrl
              : getFileServeUrl(fileUrl);

          // Placeholder file oluştur
          const placeholderFile: FileWithPreview = {
            name: fileName,
            size: item.fileSizeBytes || 0,
            type: mimeType,
            preview: previewUrl,
            lastModified: Date.now(),
            arrayBuffer: async () => new ArrayBuffer(0),
            slice: () => new Blob(),
            stream: () => new ReadableStream(),
            text: async () => "",
            webkitRelativePath: "",
            isUploaded: true, // Mevcut dosya olarak işaretle
            id: item.id, // Backend'den gelen ID'yi sakla
            itemType: item.itemType, // MediaType bilgisini sakla
            sortOrder: item.sortOrder, // Sıralama bilgisini sakla
          } as any as FileWithPreview;

          return placeholderFile;
        });

        setFiles(placeholderFiles);
      }
      // String ise (tek dosya URL)
      else if (typeof initialValue === "string") {
        // URL'den bir placeholder file oluştur
        const fileName = initialValue.split("/").pop() || "image";
        const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";

        // MIME type'ı belirle
        let mimeType = "application/octet-stream";
        if (["jpg", "jpeg"].includes(fileExtension)) mimeType = "image/jpeg";
        else if (["png"].includes(fileExtension)) mimeType = "image/png";
        else if (["gif"].includes(fileExtension)) mimeType = "image/gif";
        else if (["webp"].includes(fileExtension)) mimeType = "image/webp";
        else if (["svg"].includes(fileExtension)) mimeType = "image/svg+xml";
        else if (["mp4", "webm", "ogg"].includes(fileExtension)) {
          mimeType = `video/${fileExtension}`;
        } else if (["pdf"].includes(fileExtension)) {
          mimeType = "application/pdf";
        } else if (["doc", "docx"].includes(fileExtension)) {
          mimeType = "application/msword";
        } else if (["xls", "xlsx"].includes(fileExtension)) {
          mimeType = "application/vnd.ms-excel";
        } else if (["ppt", "pptx"].includes(fileExtension)) {
          mimeType = "application/vnd.ms-powerpoint";
        }

        // Preview URL'sini oluştur - backend'den gelen path'e serve prefix ekle
        const previewUrl =
          initialValue.startsWith("http://") ||
          initialValue.startsWith("https://")
            ? initialValue
            : getFileServeUrl(initialValue);

        // Placeholder file oluştur
        const placeholderFile: FileWithPreview = {
          name: fileName,
          size: 0, // Boyut bilinmiyor
          type: mimeType,
          preview: previewUrl, // URL'yi preview olarak kullan
          lastModified: Date.now(),
          arrayBuffer: async () => new ArrayBuffer(0),
          slice: () => new Blob(),
          stream: () => new ReadableStream(),
          text: async () => "",
          webkitRelativePath: "",
          isUploaded: true, // Mevcut dosya olarak işaretle
        } as any as FileWithPreview;

        setFiles([placeholderFile]);
      }
    }
  }, [initialValue]);

  // Value prop'undan files state'ini güncelle
  useEffect(() => {
    if (value) {
      const fileArray = Array.isArray(value) ? value : [value];
      setFiles(fileArray.map((file) => file as FileWithPreview));
    } else if (!initialValue) {
      // initialValue yoksa ve value da yoksa temizle
      setFiles([]);
    }
  }, [value, initialValue]);

  // Component unmount'ta preview URL'lerini temizle
  useEffect(() => {
    return () => {
      cleanupPreviewUrls(files);
    };
  }, [files]);

  // Dosyaları işle
  const processFiles = useCallback(
    async (fileList: FileList) => {
      if (!fileList || fileList.length === 0) return;

      setLoading(true);

      try {
        const fileArray = Array.from(fileList);

        // Validation
        const validationResult: FileValidationResult = validateFiles(
          fileArray,
          {
            maxSize: defaultMaxSize,
            acceptedTypes: acceptAttribute
              .split(",")
              .map((type) => type.trim()),
            maxFiles: multiple ? defaultMaxFiles - files.length : 1,
          },
        );

        if (!validationResult.isValid) {
          onError?.(validationResult.errors.join(", "));
          return;
        }

        // Validation başarılı - önceki hataları temizle
        onError?.("");

        // Preview URL'leri oluştur
        const newFiles: FileWithPreview[] = await Promise.all(
          fileArray.map(async (file) => {
            const fileWithPreview = file as FileWithPreview;

            // Eğer dosyada zaten preview varsa (crop'tan geliyorsa), onu koru
            if (fileWithPreview.preview) {
              return fileWithPreview;
            }

            // Resim dosyaları için data URL oluştur
            if (
              file.type?.startsWith("image/") &&
              (type === "img" || type === "all")
            ) {
              try {
                fileWithPreview.preview = await createPreviewUrl(file);
              } catch (error) {
                console.warn("Resim preview oluşturulamadı:", error);
              }
            }

            // Video dosyaları için object URL oluştur
            if (
              file.type?.startsWith("video/") &&
              (type === "video" || type === "all")
            ) {
              try {
                fileWithPreview.preview = URL.createObjectURL(file);
              } catch (error) {
                console.warn("Video preview oluşturulamadı:", error);
              }
            }

            return fileWithPreview;
          }),
        );

        // Dosyaları güncelle
        const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
        setFiles(updatedFiles);

        // Parent component'i bilgilendir
        const outputValue = multiple ? updatedFiles : updatedFiles[0] || null;
        onChange?.(outputValue);
      } catch (error) {
        console.error("Dosya işleme hatası:", error);
        onError?.("Dosya işlenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    },
    [
      files,
      multiple,
      defaultMaxSize,
      defaultMaxFiles,
      acceptAttribute,
      type,
      onChange,
      onError,
    ],
  );

  // Dosya silme
  const removeFile = useCallback(
    (fileToRemove: FileWithPreview | number) => {
      // Index veya file object kabul et
      let indexToRemove: number;

      if (typeof fileToRemove === "number") {
        // Index verilmiş
        indexToRemove = fileToRemove;
      } else {
        // File object verilmiş - preview URL'e göre bul
        indexToRemove = files.findIndex((f) => {
          // Preview URL ile eşleştir (en güvenilir)
          if (f.preview && fileToRemove.preview) {
            return f.preview === fileToRemove.preview;
          }
          // Fallback: name + lastModified ile eşleştir
          return (
            f.name === fileToRemove.name &&
            f.lastModified === fileToRemove.lastModified
          );
        });

        if (indexToRemove === -1) {
          return;
        }
      }

      // Silinecek dosyanın preview URL'ini temizle
      const fileToClean = files[indexToRemove];
      if (fileToClean?.preview && fileToClean.preview.startsWith("blob:")) {
        URL.revokeObjectURL(fileToClean.preview);
      }

      const updatedFiles = files.filter((_, i) => i !== indexToRemove);
      setFiles(updatedFiles);

      // Dosya silindiğinde hataları temizle
      onError?.("");

      // Parent component'i bilgilendir - Bu önemli! Form state'i güncellensin
      const outputValue = multiple ? updatedFiles : updatedFiles[0] || null;
      onChange?.(outputValue);
    },
    [files, multiple, onChange, onError],
  );

  // Dosyaları "yüklenmiş" olarak işaretle
  const markFilesAsUploaded = useCallback(
    (uploadedFilesData?: any[], replaceAll?: boolean) => {
      // Eğer server response'u varsa, ondan placeholder dosyalar oluştur
      if (uploadedFilesData && Array.isArray(uploadedFilesData)) {
        const placeholderFiles: FileWithPreview[] = uploadedFilesData.map(
          (fileData) => {
            const fileName =
              fileData.originalFileName || fileData.fileName || "uploaded-file";
            // Backend'den gelen path field'ını kullan (fileUrl yerine)
            const rawFileUrl = fileData.path || fileData.fileUrl || "";

            // Preview URL'sini oluştur - backend'den gelen path'e serve prefix ekle
            // rawFileUrl backend'den gelen dosya path'i (örn: "uploads/1/postImages/...")
            const fileUrl =
              rawFileUrl.startsWith("http://") ||
              rawFileUrl.startsWith("https://")
                ? rawFileUrl
                : getFileServeUrl(rawFileUrl);

            // MIME type'ı belirle - documentType veya dosya uzantısından
            let mimeType = fileData.mimeType;

            if (!mimeType) {
              // documentType'tan MIME type çıkar
              const docType = fileData.documentType;
              if (docType === "IMAGE") {
                // Dosya uzantısına göre tam MIME type belirle
                const ext = fileName.split(".").pop()?.toLowerCase();
                if (ext === "png") mimeType = "image/png";
                else if (ext === "jpg" || ext === "jpeg")
                  mimeType = "image/jpeg";
                else if (ext === "webp") mimeType = "image/webp";
                else if (ext === "gif") mimeType = "image/gif";
                else if (ext === "svg") mimeType = "image/svg+xml";
                else mimeType = "image/jpeg"; // Default image type
              } else if (docType === "VIDEO") {
                mimeType = "video/mp4";
              } else if (docType === "AUDIO") {
                mimeType = "audio/mpeg";
              } else if (docType === "DOCUMENT") {
                mimeType = "application/pdf";
              } else {
                mimeType = "application/octet-stream";
              }
            }

            // Placeholder file oluştur
            const placeholderFile = {
              name: fileName,
              size: 0, // Placeholder için size 0
              type: mimeType,
              preview: fileUrl, // Server'dan gelen URL'yi preview olarak kullan
              lastModified: Date.now(),
              arrayBuffer: async () => new ArrayBuffer(0),
              slice: () => new Blob(),
              stream: () => new ReadableStream(),
              text: async () => "",
              webkitRelativePath: "",
              isUploaded: true, // Yüklenmiş olarak işaretle
              id: fileData.id || null, // ID bilgisini sakla
              itemType: fileData.itemType || fileData.mediaType, // MediaType bilgisini sakla
              sortOrder: fileData.sortOrder, // Sıralama bilgisini sakla
            } as unknown as FileWithPreview;

            return placeholderFile;
          },
        );

        // replaceAll true ise: Tüm dosyaları değiştir (çoklu upload için - allItems zaten birleştirilmiş)
        // replaceAll false ise: Eski dosyaları koru, yeni dosyaları ekle (normal upload için)
        let allFiles: FileWithPreview[];

        if (replaceAll === true) {
          // Tüm listeyi değiştir (use-file-upload.ts'den allItems geliyorsa)
          allFiles = placeholderFiles;
          // console.log(
          //   "📁 markFilesAsUploaded - Tüm dosyalar değiştirildi (replaceAll=true):",
          //   {
          //     totalCount: allFiles.length,
          //   }
          // );
        } else {
          // replaceAll=false: Eski yüklenmiş dosyaları koru, yeni dosyaları ekle
          const oldUploadedFiles = files.filter((f) => (f as any).isUploaded);
          allFiles = [...oldUploadedFiles, ...placeholderFiles];
          // console.log(
          //   "📁 markFilesAsUploaded - Dosyalar eklendi (replaceAll=false):",
          //   {
          //     oldCount: oldUploadedFiles.length,
          //     newCount: placeholderFiles.length,
          //     totalCount: allFiles.length,
          //   }
          // );
        }

        setFiles(allFiles);
      } else {
        // Response yoksa, mevcut dosyaları işaretle (eski davranış)
        const uploadedFiles = files.map((file) => {
          const uploadedFile = Object.assign(
            Object.create(Object.getPrototypeOf(file)),
            file,
            {
              isUploaded: true,
              size: 0,
            },
          );
          return uploadedFile as FileWithPreview;
        });
        setFiles(uploadedFiles);
      }
    },
    [files],
  );

  // Yeni dosya var mı kontrolü (placeholder olmayan ve yüklenmemiş)
  const hasNewFiles = files.some(
    (file) => file.size > 0 && !(file as any).isUploaded,
  );

  return {
    files,
    loading,
    processFiles,
    removeFile,
    markFilesAsUploaded,
    hasNewFiles,
  };
};
