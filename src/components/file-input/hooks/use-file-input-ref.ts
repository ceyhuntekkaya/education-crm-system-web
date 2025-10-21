"use client";

import { useRef } from "react";

/**
 * Dosya input kontrolü için hook
 */
export const useFileInputRef = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    fileInputRef,
    openFileDialog,
    clearFileInput,
  };
};
