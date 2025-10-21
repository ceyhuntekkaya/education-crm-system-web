"use client";

import React from "react";
import Button from "@/components/ui/button";
import { useFileInputContext } from "../contexts";

export interface UploadButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  className = "",
  children,
}) => {
  // Context'ten tüm gerekli verileri al
  const { handleUpload, disabled, isLoading, files, handleUploadAreaClick } =
    useFileInputContext();

  const hasFiles = files.length > 0;
  const handleClick = async () => {
    if (!disabled && !isLoading) {
      if (hasFiles) {
        await handleUpload();
      } else {
        // Dosya yoksa dosya seçme ekranını aç
        handleUploadAreaClick();
      }
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Yükleniyor...";
    if (!hasFiles) return "Dosya Seçin";
    return children || "Yükle";
  };

  const getButtonIcon = () => {
    if (isLoading) return "ph-circle-notch";
    return hasFiles ? "ph-cloud-arrow-up" : "ph-file-plus";
  };

  return (
    <Button
      variant={hasFiles ? "success" : "outline"}
      size="sm"
      leftIcon={getButtonIcon()}
      onClick={handleClick}
      disabled={disabled || isLoading}
      loading={isLoading}
      className={className}
    >
      {getButtonText()}
    </Button>
  );
};
