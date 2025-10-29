"use client";

import { useCallback, useEffect, useRef } from "react";
import { UseContextHandlersProps } from "../types/hook.types";

// Context Event Handlers
export const useContextHandlers = ({
  files,
  processFiles,
  disabled,
  handleDrop,
  openFileDialog,
  isLoading,
  handleUpload,
  isAutoUpload,
}: UseContextHandlersProps) => {
  // Auto upload için flag - her dosya seçiminde true olacak
  const shouldAutoUploadRef = useRef(false);

  // Dosyalar değiştiğinde ve autoUpload aktifse otomatik yükle
  useEffect(() => {
    // Eğer autoUpload flag'i true ise ve dosyalar varsa
    if (shouldAutoUploadRef.current && isAutoUpload && files.length > 0) {
      // Flag'i hemen false yap (bir sonraki manuel değişiklik için)
      shouldAutoUploadRef.current = false;
      // Upload işlemini başlat
      handleUpload();
    }
  }, [files, isAutoUpload, handleUpload]);

  // File selection handler
  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (fileList && fileList.length > 0) {
        // Auto upload için flag'i set et
        if (isAutoUpload) {
          shouldAutoUploadRef.current = true;
        }
        await processFiles(fileList);
      }
    },
    [processFiles, isAutoUpload]
  );

  // Drop handler
  const onDrop = useCallback(
    async (e: React.DragEvent) => {
      if (disabled) return;

      const fileList = handleDrop(e);
      if (fileList && fileList.length > 0) {
        // Auto upload için flag'i set et
        if (isAutoUpload) {
          shouldAutoUploadRef.current = true;
        }
        await processFiles(fileList);
      }
    },
    [disabled, handleDrop, processFiles, isAutoUpload]
  );

  // Upload area click handler
  const handleUploadAreaClick = useCallback(() => {
    if (!disabled && !isLoading) {
      openFileDialog();
    }
  }, [disabled, isLoading, openFileDialog]);

  return {
    handleFileSelect,
    onDrop,
    handleUploadAreaClick,
    handleUpload,
  };
};
