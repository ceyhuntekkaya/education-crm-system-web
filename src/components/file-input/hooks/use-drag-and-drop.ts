"use client";

import { useState, useCallback } from "react";

/**
 * Drag & Drop işlemlerini yöneten hook
 */
export const useDragAndDrop = () => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    return e.dataTransfer.files;
  }, []);

  return {
    dragActive,
    handleDrag,
    handleDrop,
  };
};
