"use client";

import { useState, useEffect, useCallback } from "react";
import { FileWithPreview, FileValidationResult } from "../types/file.types";
import { validateFiles, createPreviewUrl, cleanupPreviewUrls } from "../utils";

/**
 * Dosya yönetimi hook'u - dosya seçme, ekleme, çıkarma
 */
export const useFileManagement = (props: {
  value?: File[] | File | null;
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

  // Value prop'undan files state'ini güncelle
  useEffect(() => {
    if (value) {
      const fileArray = Array.isArray(value) ? value : [value];
      setFiles(fileArray.map((file) => file as FileWithPreview));
    } else {
      setFiles([]);
    }
  }, [value]);

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

      const outputValue = multiple ? updatedFiles : updatedFiles[0] || null;
      onChange?.(outputValue);
    },
    [files, multiple, onChange]
  );

  return {
    files,
    loading,
    processFiles,
    removeFile,
  };
};
