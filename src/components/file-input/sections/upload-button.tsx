"use client";

import React from "react";
import Button from "@/components/ui/button";

export interface UploadButtonProps {
  onUpload: () => Promise<void>;
  disabled?: boolean;
  loading?: boolean;
  hasFiles?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  onUpload,
  disabled = false,
  loading = false,
  hasFiles = false,
  className = "",
  children,
}) => {
  const handleClick = async () => {
    if (!disabled && !loading && hasFiles) {
      await onUpload();
    }
  };

  const getButtonText = () => {
    if (loading) return "Yükleniyor...";
    if (!hasFiles) return "Dosya Seçin";
    return children || "Yükle";
  };

  const getButtonIcon = () => {
    if (loading) return "ph-circle-notch";
    return hasFiles ? "ph-cloud-arrow-up" : "ph-file-plus";
  };

  return (
    <Button
      variant="success"
      size="sm"
      leftIcon={getButtonIcon()}
      onClick={handleClick}
      disabled={disabled || loading || !hasFiles}
      loading={loading}
      className={className}
    >
      {getButtonText()}
    </Button>
  );
};
