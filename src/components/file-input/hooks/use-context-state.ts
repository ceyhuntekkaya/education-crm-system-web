"use client";

import { useState, useCallback } from "react";

// Context Internal State Hook - Tüm internal state'leri burada
export const useContextState = () => {
  const [internalError, setInternalError] = useState<string>("");
  const [internalLoading, setInternalLoadingState] = useState<boolean>(false);

  // Error management
  const handleInternalError = useCallback((errorMsg: string) => {
    setInternalError(errorMsg);
    if (errorMsg) {
      console.error("File input error:", errorMsg);
    }
  }, []);

  const clearError = useCallback(() => {
    setInternalError("");
  }, []);

  // Loading setter - useCallback ile wrap et
  const setInternalLoading = useCallback((loading: boolean) => {
    setInternalLoadingState(loading);
  }, []);

  // Internal change handler
  const handleInternalChange = useCallback((files: File[] | File | null) => {
    console.log("Files selected:", files);
  }, []);

  // Internal upload handler
  const handleInternalUpload = useCallback(async (files: File[]) => {
    setInternalLoadingState(true);
    console.log("Uploading files:", files);

    // Simulated upload - 2 saniye bekle
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setInternalLoadingState(false);
    console.log("Upload complete:", files);
  }, []);

  return {
    // Error state
    internalError,
    handleInternalError,
    clearError,

    // Loading state
    internalLoading,
    setInternalLoading, // Loading state setter'ını export et

    // Callbacks
    handleInternalChange,
    handleInternalUpload,
  };
};
