"use client";

import React, { useRef, useState } from "react";
import { useModal } from "@/hooks/use-modal";
import { FileInputProps, FileWithPreview } from "./types";
import {
  useFileInput,
  useDragAndDrop,
  useFileInputRef,
  useFileUpload,
} from "./hooks";
import {
  FileUploadArea,
  FilePreview,
  FilePreviewModal,
  UploadButton,
  UploadState,
} from "./sections";

export const FileInput: React.FC<FileInputProps> = (props) => {
  const {
    label,
    variant = "inline",
    type = "all",
    multiple = false,
    className = "",
    disabled = false,
    fullWidth = false,
    required = false,
    placeholder,
    error,
    loading: externalLoading = false,
    showUploadButton = true,
    uploadButtonText = "Yükle",
    onUpload,
    onUploadProgress,
    onUploadComplete,
  } = props;

  // Modal state management with useModal hook
  const previewModal = useModal();
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null
  );

  const { fileInputRef, openFileDialog } = useFileInputRef();
  const {
    files,
    processFiles,
    removeFile,
    acceptAttribute,
    loading: internalLoading,
  } = useFileInput(props);
  const { dragActive, handleDrag, handleDrop } = useDragAndDrop();

  // Upload hook'u
  const { uploadState, uploadFiles, isUploading } = useFileUpload({
    onProgress: onUploadProgress,
    onComplete: onUploadComplete,
    onError: props.onError,
  });

  // Internal ya da external loading durumlarından biri aktifse loading göster
  const isLoading = internalLoading || externalLoading;

  // Event handlers
  const handleFilePreview = (file: FileWithPreview) => {
    setSelectedFile(file);
    previewModal.open();
  };

  const handleClosePreviewModal = () => {
    previewModal.close();
    setSelectedFile(null);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      await processFiles(fileList);
    }
  };

  const onDrop = async (e: React.DragEvent) => {
    if (disabled) return;

    const fileList = handleDrop(e);
    if (fileList && fileList.length > 0) {
      await processFiles(fileList);
    }
  };

  const handleUploadAreaClick = () => {
    if (!disabled && !isLoading) {
      openFileDialog();
    }
  };

  // Upload handler
  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      await uploadFiles(files, onUpload);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="text-neutral-700 text-lg fw-medium mb-12 d-block">
          {label}
          {required && <span className="text-danger-600 ms-4">*</span>}
        </label>
      )}

      {/* File Upload Area with Upload Button */}
      <div className="d-flex align-items-start gap-12">
        <div className="flex-grow-1">
          <FileUploadArea
            variant={variant}
            type={type}
            fullWidth={fullWidth}
            disabled={disabled}
            isLoading={isLoading}
            dragActive={dragActive}
            error={error}
            placeholder={placeholder}
            multiple={multiple}
            maxSize={props.maxSize}
            maxFiles={props.maxFiles}
            onDragEnter={!isLoading ? handleDrag : undefined}
            onDragLeave={!isLoading ? handleDrag : undefined}
            onDragOver={!isLoading ? handleDrag : undefined}
            onDrop={!isLoading ? onDrop : undefined}
            onClick={handleUploadAreaClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptAttribute}
              multiple={multiple}
              onChange={handleFileSelect}
              disabled={disabled || isLoading}
              className="d-none"
            />
          </FileUploadArea>
        </div>

        {/* Upload Button - Sağ tarafta */}
        {showUploadButton && (
          <div className="flex-shrink-0">
            <UploadButton
              onUpload={handleUpload}
              disabled={disabled || isLoading}
              loading={isUploading}
              hasFiles={files.length > 0}
            >
              {uploadButtonText}
            </UploadButton>
          </div>
        )}
      </div>

      {/* File Preview */}
      <FilePreview
        files={files}
        type={type}
        multiple={multiple}
        disabled={disabled}
        onFilePreview={handleFilePreview}
        onRemoveFile={removeFile}
      />

      {/* Upload State */}
      <UploadState
        isUploading={isUploading}
        uploadProgress={uploadState.progress}
        uploadedFiles={uploadState.uploadedFiles}
        totalFiles={uploadState.totalFiles}
        currentFileName={uploadState.currentFileName}
        className="mt-16"
      />

      {/* Error Message */}
      {error && <div className="text-danger-600 text-sm mt-8">{error}</div>}

      {/* Preview Modal */}
      <FilePreviewModal
        isOpen={previewModal.isOpen}
        onClose={handleClosePreviewModal}
        selectedFile={selectedFile}
      />
    </div>
  );
};
