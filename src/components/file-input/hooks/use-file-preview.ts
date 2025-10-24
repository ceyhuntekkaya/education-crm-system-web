"use client";

import { useState, useCallback } from "react";
import { FileWithPreview } from "../types/file.types";

/**
 * Dosya preview işlemlerini yöneten hook
 */
export const useFilePreview = () => {
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPreview = useCallback((file: FileWithPreview) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  }, []);

  const closePreview = useCallback(() => {
    setIsModalOpen(false);
    setSelectedFile(null);
  }, []);

  return {
    selectedFile,
    isModalOpen,
    openPreview,
    closePreview,
  };
};
