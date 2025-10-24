"use client";

import { useCallback } from "react";
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

  return {
    handleFileSelect,
    onDrop,
    handleUploadAreaClick,
    handleUpload,
  };
};
