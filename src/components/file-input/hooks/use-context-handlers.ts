"use client";

import { useCallback } from "react";

interface UseContextHandlersProps {
  files: File[];
  processFiles: (fileList: FileList) => Promise<void>;
  disabled: boolean;
  handleDrop: (e: React.DragEvent) => FileList | null;
  openFileDialog: () => void;
  isLoading: boolean;
  handleInternalUpload: (files: File[]) => Promise<void>;
  handleInternalError: (error: string) => void;
}

// Context Event ve Upload Handlers - Tek yerde
export const useContextHandlers = ({
  files,
  processFiles,
  disabled,
  handleDrop,
  openFileDialog,
  isLoading,
  handleInternalUpload,
  handleInternalError,
}: UseContextHandlersProps) => {
  // File selection handler
  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (fileList && fileList.length > 0) {
        await processFiles(fileList);
      }
    },
    [processFiles]
  );

  // Drop handler
  const onDrop = useCallback(
    async (e: React.DragEvent) => {
      if (disabled) return;

      const fileList = handleDrop(e);
      if (fileList && fileList.length > 0) {
        await processFiles(fileList);
      }
    },
    [disabled, handleDrop, processFiles]
  );

  // Upload area click handler
  const handleUploadAreaClick = useCallback(() => {
    if (!disabled && !isLoading) {
      openFileDialog();
    }
  }, [disabled, isLoading, openFileDialog]);

  // Upload button handler
  const handleUpload = useCallback(async () => {
    if (files.length === 0) return;

    try {
      await handleInternalUpload(files);
    } catch (error) {
      console.error("Upload error:", error);
      handleInternalError("Dosya yüklenirken bir hata oluştu");
    }
  }, [files, handleInternalUpload, handleInternalError]);

  return {
    handleFileSelect,
    onDrop,
    handleUploadAreaClick,
    handleUpload,
  };
};
