"use client";

import { useState, useCallback } from "react";

// Context Internal State Hook - Tüm internal state'leri burada
export const useContextState = () => {
  const [internalError, setInternalError] = useState<string>("");
  const [internalLoading, setInternalLoading] = useState<boolean>(false);

  // Error management
  const handleInternalError = useCallback((errorMsg: string) => {
    setInternalError(errorMsg);
    console.error("File input error:", errorMsg);
  }, []);

  const clearError = useCallback(() => {
    setInternalError("");
  }, []);

  // Internal change handler
  const handleInternalChange = useCallback((files: File[] | File | null) => {
    console.log("Files selected:", files);
  }, []);

  // Internal upload handler
  const handleInternalUpload = useCallback(async (files: File[]) => {
    setInternalLoading(true);
    console.log("Uploading files:", files);

    // Simulated upload - 2 saniye bekle
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setInternalLoading(false);
    console.log("Upload complete:", files);
  }, []);

  return {
    // Error state
    internalError,
    handleInternalError,
    clearError,

    // Loading state
    internalLoading,

    // Callbacks
    handleInternalChange,
    handleInternalUpload,
  };
};
