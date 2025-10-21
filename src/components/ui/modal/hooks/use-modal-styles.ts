"use client";

import { useMemo } from "react";
import {
  getModalMaxWidth,
  getAlignItems,
  getAnimationTransform,
  getAnimationOpacity,
  getAnimationTransition,
} from "../utils";
import { ModalSize, ModalPosition } from "../types";

/**
 * Modal stil hesaplamaları için hook
 */
export const useModalStyles = (
  size: ModalSize,
  position: ModalPosition,
  animated: boolean,
  isOpen: boolean,
  zIndex: number,
  className: string
) => {
  const overlayStyles = useMemo(
    () => ({
      zIndex,
      alignItems: getAlignItems(position),
    }),
    [position, zIndex]
  );

  const contentStyles = useMemo(
    () => ({
      backgroundColor: "white",
      borderRadius: "12px",
      maxWidth: getModalMaxWidth(size),
      width: "100%",
      maxHeight: size === "fullscreen" ? "100vh" : "90vh",
      overflow: "hidden" as const,
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      position: "relative" as const,
      zIndex: zIndex + 1,
      transform: getAnimationTransform(animated, isOpen),
      opacity: getAnimationOpacity(animated, isOpen),
      transition: getAnimationTransition(animated),
      display: "flex" as const,
      flexDirection: "column" as const,
    }),
    [size, animated, isOpen, zIndex]
  );

  const contentClassName = `modal-content ${className}`;

  return {
    overlayStyles,
    contentStyles,
    contentClassName,
  };
};
