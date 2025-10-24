"use client";

import React from "react";
import { FileInputContextProvider, useFileInputContext } from "./contexts";
import { SimpleFileInputProps } from "./types/component.types";
import {
  FileUploadArea,
  FilePreview,
  FilePreviewModal,
  UploadButton,
} from "./sections";

// FileInput İçerik Component'i - Context'ten veri alır
const FileInputContent: React.FC<
  Omit<
    SimpleFileInputProps,
    "type" | "multiple" | "maxFiles" | "maxSize" | "disabled" | "loading"
  >
> = ({
  label,
  variant = "outline",
  placeholder,
  className = "",
  required = false,
  error,
  uploadButtonText, // Bu varsa upload button gösterilir
}) => {
  // Context'ten sadece gerekli verileri al
  const {
    isLoading,
    internalError,
    fileInputRef,
    acceptAttribute,
    handleFileSelect,
    // Configuration values from context
    multiple,
    disabled,
  } = useFileInputContext();

  return (
    <div className={className}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptAttribute}
        multiple={multiple}
        disabled={disabled || isLoading}
        className="d-none"
        onChange={handleFileSelect}
      />

      {/* Label */}
      {label && (
        <label className="text-neutral-700 text-lg fw-medium mb-12 d-block">
          {label}
          {required && <span className="text-danger-600 ms-4">*</span>}
        </label>
      )}

      {/* File Upload Area */}
      <div className="mb-3">
        <FileUploadArea
          variant={variant}
          placeholder={placeholder}
          error={error}
        />
      </div>

      {/* File Preview */}
      <FilePreview />

      {/* Upload Button - uploadButtonText varsa göster */}
      {uploadButtonText && (
        <div className="d-flex justify-content-center mb-3 mt-16">
          <UploadButton>{uploadButtonText}</UploadButton>
        </div>
      )}

      {/* Error Message
      {(error || internalError) && (
        <div className="text-danger-600 text-sm mt-8">
          {error || internalError}
        </div>
      )} */}

      {/* Preview Modal */}
      <FilePreviewModal />
    </div>
  );
};

// Ana FileInput Component - Context wrapper ile
export const FileInput: React.FC<SimpleFileInputProps> = ({
  // Configuration props
  type = "all",
  multiple = false,
  maxFiles,
  maxSize,
  disabled = false,
  loading = false,

  // Upload API props
  name,
  onUpload,
  onUploadSuccess,
  onUploadError,

  // UI props (FileInputContent'e geçilecek)
  ...uiProps
}) => {
  return (
    <FileInputContextProvider
      type={type}
      multiple={multiple}
      maxFiles={maxFiles}
      maxSize={maxSize}
      disabled={disabled}
      loading={loading}
      name={name}
      onUpload={onUpload}
      onUploadSuccess={onUploadSuccess}
      onUploadError={onUploadError}
    >
      <FileInputContent {...uiProps} />
    </FileInputContextProvider>
  );
};
