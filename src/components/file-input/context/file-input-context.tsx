"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { FileInputProps, FileWithPreview } from "../types";
import { getAcceptAttribute } from "../utils";
import {
  useFileManagement,
  useDragAndDrop,
  useFilePreview,
  useFileInputRef,
} from "../hooks";

// Context Types
interface FileInputContextType {
  // State
  files: FileWithPreview[];
  dragActive: boolean;
  loading: boolean;
  isUploading: boolean;
  uploadState: any;
  selectedFile: FileWithPreview | null;
  isModalOpen: boolean;

  // Actions
  processFiles: (fileList: FileList) => Promise<void>;
  removeFile: (index: number) => void;
  openFileDialog: () => void;
  openPreview: (file: FileWithPreview) => void;
  closePreview: () => void;
  handleUpload: () => Promise<void>;

  // Drag & Drop
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => FileList | null;

  // Props & Config
  acceptAttribute: string;
  config: FileInputConfig;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

interface FileInputConfig {
  variant: "inline" | "outline";
  type: "img" | "video" | "file" | "all";
  multiple: boolean;
  disabled: boolean;
  fullWidth: boolean;
  required: boolean;
  maxSize: number;
  maxFiles: number;
  showUploadButton: boolean;
  uploadButtonText: string;
  placeholder?: string;
  error?: string;
  label?: string;
}

// Context oluşturma
const FileInputContext = createContext<FileInputContextType | null>(null);

// Provider Props
interface FileInputProviderProps extends FileInputProps {
  children: React.ReactNode;
}

// Provider Component - Temiz ve Hook Tabanlı
export const FileInputProvider: React.FC<FileInputProviderProps> = ({
  children,
  ...props
}) => {
  const {
    value,
    onChange,
    onError,
    onLoadingChange,
    onUpload,
    onUploadComplete,
    variant = "inline",
    type = "all",
    multiple = false,
    disabled = false,
    fullWidth = false,
    required = false,
    maxSize = 10,
    maxFiles = 5,
    showUploadButton = true,
    uploadButtonText = "Yükle",
    placeholder,
    error,
    label,
    loading: externalLoading = false,
  } = props;

  // Accept attribute
  const acceptAttribute = getAcceptAttribute(type, props.accept);

  // Hook'ları kullan
  const { files, loading, processFiles, removeFile } = useFileManagement({
    value,
    onChange,
    onError,
    type,
    multiple,
    maxSize,
    maxFiles,
    acceptAttribute,
  });

  const { dragActive, handleDrag, handleDrop } = useDragAndDrop(
    disabled,
    loading || externalLoading
  );

  const { selectedFile, isModalOpen, openPreview, closePreview } =
    useFilePreview();

  const { fileInputRef, openFileDialog } = useFileInputRef();

  // Config
  const config: FileInputConfig = {
    variant,
    type,
    multiple,
    disabled,
    fullWidth,
    required,
    maxSize,
    maxFiles,
    showUploadButton,
    uploadButtonText,
    placeholder,
    error,
    label,
  };

  // Loading state değişimini parent'a bildir
  const isLoading = loading || externalLoading;
  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  // Upload handler
  const handleUpload = useCallback(async () => {
    if (files.length === 0 || !onUpload) return;

    try {
      await onUpload(files);
      onUploadComplete?.(files);
    } catch (error) {
      console.error("Upload error:", error);
      onError?.("Dosya yüklenirken bir hata oluştu");
    }
  }, [files, onUpload, onUploadComplete, onError]);

  // Context value
  const contextValue: FileInputContextType = {
    // State
    files,
    dragActive,
    loading: isLoading,
    isUploading: false, // Basit implementasyon
    uploadState: {
      progress: 0,
      uploadedFiles: 0,
      totalFiles: 0,
      currentFileName: "",
    },
    selectedFile,
    isModalOpen,

    // Actions
    processFiles,
    removeFile,
    openFileDialog,
    openPreview,
    closePreview,
    handleUpload,

    // Drag & Drop
    handleDrag,
    handleDrop,

    // Props & Config
    acceptAttribute,
    config,
    fileInputRef,
  };

  return (
    <FileInputContext.Provider value={contextValue}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptAttribute}
        multiple={multiple}
        disabled={disabled || isLoading}
        className="d-none"
        onChange={async (e) => {
          const fileList = e.target.files;
          if (fileList && fileList.length > 0) {
            await processFiles(fileList);
          }
        }}
      />
      {children}
    </FileInputContext.Provider>
  );
};

// Hook for using the context
export const useFileInputContext = (): FileInputContextType => {
  const context = useContext(FileInputContext);
  if (!context) {
    throw new Error(
      "useFileInputContext must be used within a FileInputProvider"
    );
  }
  return context;
};
