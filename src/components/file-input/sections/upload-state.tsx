"use client";

import React from "react";
import Icon from "@/components/ui/icon";

export interface UploadStateProps {
  isUploading?: boolean;
  uploadProgress?: number;
  uploadedFiles?: number;
  totalFiles?: number;
  currentFileName?: string;
  className?: string;
}

export const UploadState: React.FC<UploadStateProps> = ({
  isUploading = false,
  uploadProgress = 0,
  uploadedFiles = 0,
  totalFiles = 0,
  currentFileName,
  className = "",
}) => {
  if (!isUploading) return null;

  return (
    <div
      className={`upload-state bg-main-50 border border-main-200 rounded-lg p-16 ${className}`}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-12">
        <div className="d-flex align-items-center gap-8">
          <Icon
            icon="upload"
            size="sm"
            className="text-main-600 animate-bounce"
          />
          <span className="text-main-700 fw-medium">
            Dosyalar Yükleniyor...
          </span>
        </div>
        <span className="text-sm text-main-600">
          {uploadedFiles}/{totalFiles}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="progress-container mb-8">
        <div className="progress bg-main-100 rounded-full h-6 overflow-hidden">
          <div
            className="progress-bar bg-main-600 h-full transition-all duration-300 ease-in-out"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
        <div className="d-flex justify-content-between mt-4">
          <span className="text-xs text-main-600">
            {Math.round(uploadProgress)}% tamamlandı
          </span>
          <span className="text-xs text-main-500">
            {uploadProgress === 100 ? "Tamamlandı" : "Devam ediyor..."}
          </span>
        </div>
      </div>

      {/* Current File Info */}
      {currentFileName && (
        <div className="current-file bg-white rounded-md p-8 border border-main-200">
          <div className="d-flex align-items-center gap-8">
            <Icon icon="file" size="sm" className="text-main-500" />
            <span className="text-sm text-main-700 truncate">
              {currentFileName}
            </span>
          </div>
        </div>
      )}

      {/* Upload Statistics */}
      <div className="d-flex align-items-center justify-content-between mt-12 pt-12 border-t border-main-200">
        <div className="d-flex align-items-center gap-16">
          <div className="d-flex align-items-center gap-4">
            <div className="w-8 h-8 bg-success-500 rounded-full d-flex align-items-center justify-content-center">
              <Icon icon="check" size="sm" className="text-white" />
            </div>
            <span className="text-sm text-success-600">
              {uploadedFiles} yüklendi
            </span>
          </div>

          {totalFiles > uploadedFiles && (
            <div className="d-flex align-items-center gap-4">
              <div className="w-8 h-8 bg-warning-500 rounded-full d-flex align-items-center justify-content-center">
                <Icon icon="clock" size="sm" className="text-white" />
              </div>
              <span className="text-sm text-warning-600">
                {totalFiles - uploadedFiles} bekliyor
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
