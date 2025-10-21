"use client";

import { useState, useCallback } from "react";

/**
 * Drag & Drop işlemlerini yöneten hook
 */
export const useDragAndDrop = (disabled: boolean, loading: boolean) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled || loading) return;

      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    },
    [disabled, loading]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent): FileList | null => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled || loading) return null;

      return e.dataTransfer.files;
    },
    [disabled, loading]
  );

  return {
    dragActive,
    handleDrag,
    handleDrop,
  };
};
