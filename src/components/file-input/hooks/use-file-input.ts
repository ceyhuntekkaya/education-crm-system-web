"use client";

import { useState, useEffect, useCallback } from "react";
import { FileWithPreview, FileInputProps } from "../types";
import {
  getAcceptAttribute,
  validateFiles,
  createPreviewUrl,
  cleanupPreviewUrls,
} from "../utils";

/**
 * File input işlemlerini yöneten ana hook
 */
export const useFileInput = (props: FileInputProps) => {
  const {
    value,
    onChange,
    onError,
    onLoadingChange,
    type = "img",
    accept,
    multiple = false,
    maxSize = 10,
    maxFiles = 5,
  } = props;

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [loading, setLoading] = useState(false);

  // Value prop'undan files state'ini güncelle
  useEffect(() => {
    if (value) {
      const fileArray = Array.isArray(value) ? value : [value];
      // File objelerini direkt FileWithPreview olarak cast et, spread yapmadan
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

      // Loading başlat
      setLoading(true);
      onLoadingChange?.(true);

      try {
        const acceptAttribute = getAcceptAttribute(type, accept);
        const maxFileCount = multiple ? maxFiles : 1;

        // Validation
        const validation = validateFiles(fileList, {
          maxSize,
          acceptedTypes: [acceptAttribute],
          maxFiles: maxFileCount,
        });

        if (!validation.isValid && onError) {
          onError(validation.errors.join(", "));
          return;
        }

        const validFiles: FileWithPreview[] = [];

        for (let i = 0; i < Math.min(fileList.length, maxFileCount); i++) {
          const file = fileList[i] as FileWithPreview;

          // Img ve video için önizleme oluştur
          const shouldCreatePreview =
            type === "img" ||
            type === "video" ||
            (type === "all" &&
              (file.type?.startsWith("image/") ||
                file.type?.startsWith("video/")));

          if (shouldCreatePreview) {
            try {
              file.preview = await createPreviewUrl(file);
            } catch (error) {
              console.warn(`Önizleme oluşturulamadı: ${file.name}`, error);
            }
          }

          validFiles.push(file);
        }

        const newFiles = multiple ? [...files, ...validFiles] : validFiles;
        setFiles(newFiles);

        // onChange callback'ini çağır
        if (onChange) {
          if (multiple) {
            onChange(newFiles.length > 0 ? newFiles : null);
          } else {
            onChange(newFiles[0] || null);
          }
        }
      } finally {
        // Loading bitir
        setLoading(false);
        onLoadingChange?.(false);
      }
    },
    [
      files,
      type,
      accept,
      multiple,
      maxSize,
      maxFiles,
      onChange,
      onError,
      onLoadingChange,
    ]
  );

  // Dosya silme
  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);

      // onChange callback'ini çağır
      if (onChange) {
        if (multiple) {
          onChange(newFiles.length > 0 ? newFiles : null);
        } else {
          onChange(null);
        }
      }
    },
    [files, multiple, onChange]
  );

  return {
    files,
    processFiles,
    removeFile,
    acceptAttribute: getAcceptAttribute(type, accept),
    loading,
  };
};
