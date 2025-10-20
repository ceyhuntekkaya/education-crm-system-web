"use client";

import React from "react";
import Icon from "@/components/ui/icon";
import { FileInputType, FileUploadAreaProps } from "../types";
import { getFileIcon, getVariantClasses } from "../utils";
import { LoadingState } from "./loading-state";

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  variant,
  type,
  fullWidth,
  disabled,
  isLoading,
  dragActive,
  error,
  placeholder,
  multiple,
  maxSize,
  maxFiles,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onClick,
  children,
}) => {
  const getFileTypeDescription = () => {
    switch (type) {
      case "img":
        return "JPG, PNG, GIF formatları desteklenir";
      case "video":
        return "MP4, AVI, MOV formatları desteklenir";
      case "file":
        return "PDF, DOC, TXT, Excel, PowerPoint formatları desteklenir";
      case "all":
        return "Tüm dosya formatları desteklenir";
      default:
        return "";
    }
  };

  const getDescriptionText = () => {
    let description = getFileTypeDescription();

    if (maxSize) {
      description += ` • Maksimum dosya boyutu: ${maxSize}MB`;
    }

    if (multiple && maxFiles) {
      description += ` • Maksimum ${maxFiles} dosya`;
    }

    return description;
  };

  return (
    <div
      className={getVariantClasses(
        variant,
        fullWidth,
        disabled || isLoading,
        dragActive,
        error
      )}
      onDragEnter={!isLoading ? onDragEnter : undefined}
      onDragLeave={!isLoading ? onDragLeave : undefined}
      onDragOver={!isLoading ? onDragOver : undefined}
      onDrop={!isLoading ? onDrop : undefined}
      onClick={onClick}
    >
      {children}

      {isLoading ? (
        <LoadingState />
      ) : (
        <div className="d-flex flex-column align-items-center gap-8">
          <Icon
            icon={getFileIcon(type)}
            size="lg"
            className={
              dragActive
                ? "text-main-600"
                : error
                ? "text-danger-600"
                : "text-neutral-400"
            }
          />

          <div>
            <div className="fw-medium">
              {dragActive
                ? "Dosyaları buraya bırakın"
                : placeholder || "Dosya seçmek için tıklayın veya sürükleyin"}
            </div>
            <div className="text-sm text-neutral-500 mt-4">
              {getDescriptionText()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
