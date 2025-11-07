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
          const fileUrl = item.fileUrl || "";
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

          // Preview URL'sini oluştur - eğer tam URL değilse serve prefix ekle
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
        let mimeType = "image/jpeg";
        if (["png"].includes(fileExtension)) mimeType = "image/png";
        else if (["gif"].includes(fileExtension)) mimeType = "image/gif";
        else if (["webp"].includes(fileExtension)) mimeType = "image/webp";
        else if (["svg"].includes(fileExtension)) mimeType = "image/svg+xml";
        else if (["mp4", "webm", "ogg"].includes(fileExtension)) {
          mimeType = `video/${fileExtension}`;
        }

        // Preview URL'sini oluştur - eğer tam URL değilse serve prefix ekle
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
          }
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
          })
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
    ]
  );

  // Dosya silme
  const removeFile = useCallback(
    (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);

      // Dosya silindiğinde hataları temizle
      onError?.("");

      const outputValue = multiple ? updatedFiles : updatedFiles[0] || null;
      onChange?.(outputValue);
    },
    [files, multiple, onChange, onError]
  );

  // Dosyaları "yüklenmiş" olarak işaretle
  const markFilesAsUploaded = useCallback(
    (uploadedFilesData?: any[]) => {
      // Eğer server response'u varsa, ondan placeholder dosyalar oluştur
      if (uploadedFilesData && Array.isArray(uploadedFilesData)) {
        const placeholderFiles: FileWithPreview[] = uploadedFilesData.map(
          (fileData) => {
            const fileName =
              fileData.originalFileName || fileData.fileName || "uploaded-file";
            const rawFileUrl = fileData.fileUrl || "";

            // Preview URL'sini oluştur - eğer tam URL değilse serve prefix ekle
            const fileUrl =
              rawFileUrl.startsWith("http://") ||
              rawFileUrl.startsWith("https://")
                ? rawFileUrl
                : getFileServeUrl(rawFileUrl);

            const mimeType = fileData.mimeType || "application/octet-stream";

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
          }
        );

        setFiles(placeholderFiles);
      } else {
        // Response yoksa, mevcut dosyaları işaretle (eski davranış)
        const uploadedFiles = files.map((file) => {
          const uploadedFile = Object.assign(
            Object.create(Object.getPrototypeOf(file)),
            file,
            {
              isUploaded: true,
              size: 0,
            }
          );
          return uploadedFile as FileWithPreview;
        });
        setFiles(uploadedFiles);
      }
    },
    [files]
  );

  // Yeni dosya var mı kontrolü (placeholder olmayan ve yüklenmemiş)
  const hasNewFiles = files.some(
    (file) => file.size > 0 && !(file as any).isUploaded
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
