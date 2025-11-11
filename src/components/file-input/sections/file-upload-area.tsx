"use client";

import React from "react";
import Icon from "@/components/ui/icon";
import { FileInputType } from "../types/file.types";
import { getFileIcon, getVariantClasses } from "../utils";
import { useFileInputContext } from "../contexts";
import { FileInputLoadingState } from "./loading-state";

interface FileUploadAreaProps {
  variant?: "inline" | "outline";
  placeholder?: string;
  error?: string;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  variant = "outline",
  placeholder,
  error,
}) => {
  // Context'ten tüm gerekli verileri al
  const {
    type,
    multiple,
    maxFiles,
    maxSize,
    disabled,
    isLoading,
    dragActive,
    internalError,
    handleDrag,
    onDrop,
    handleUploadAreaClick,
  } = useFileInputContext();

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

  const displayError = error || internalError;

  return (
    <div
      className={getVariantClasses(
        variant,
        true, // fullWidth
        disabled || isLoading,
        dragActive,
        displayError
      )}
      onDragEnter={!isLoading ? handleDrag : undefined}
      onDragLeave={!isLoading ? handleDrag : undefined}
      onDragOver={!isLoading ? handleDrag : undefined}
      onDrop={!isLoading ? onDrop : undefined}
      onClick={handleUploadAreaClick}
    >
      {isLoading ? (
        <FileInputLoadingState />
      ) : (
        <div className="d-flex flex-column align-items-center gap-8">
          <Icon
            icon={getFileIcon(type)}
            size="lg"
            className={
              dragActive
                ? "text-main-600"
                : displayError
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
            {displayError && (
              <div className="text-sm text-danger-600 mt-2">{displayError}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
