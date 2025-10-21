"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { getAcceptAttribute } from "../utils";
import { FileWithPreview } from "../types";
import {
  useFileManagement,
  useDragAndDrop,
  useFilePreview,
  useFileInputRef,
  useContextState,
  useContextHandlers,
} from "../hooks";

// FileInput Context Props
interface FileInputContextProps {
  // Konfigürasyon
  type?: "img" | "video" | "file" | "all";
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  loading?: boolean;

  // Children
  children: ReactNode;
}

// Context Value Interface
interface FileInputContextValue {
  // File Management
  files: FileWithPreview[];
  processFiles: (fileList: FileList) => Promise<void>;
  removeFile: (index: number) => void;

  // Loading States
  loading: boolean;
  internalLoading: boolean;
  isLoading: boolean;

  // Error Management
  internalError: string;
  handleInternalError: (error: string) => void;
  clearError: () => void;

  // Upload Management
  handleInternalUpload: (files: FileWithPreview[]) => Promise<void>;
  handleUpload: () => Promise<void>;

  // Drag & Drop
  dragActive: boolean;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => FileList | null;
  onDrop: (e: React.DragEvent) => Promise<void>;

  // File Preview
  selectedFile: FileWithPreview | null;
  isModalOpen: boolean;
  openPreview: (file: FileWithPreview) => void;
  closePreview: () => void;

  // File Input Ref
  fileInputRef: React.RefObject<HTMLInputElement>;
  openFileDialog: () => void;

  // Event Handlers
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleUploadAreaClick: () => void;

  // Configuration
  acceptAttribute: string;
  type: "img" | "video" | "file" | "all";
  multiple: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled: boolean;
}

const FileInputContext = createContext<FileInputContextValue | undefined>(
  undefined
);

// FileInput Context Provider
export const FileInputContextProvider: React.FC<FileInputContextProps> = ({
  type = "all",
  multiple = false,
  maxFiles,
  maxSize,
  disabled = false,
  loading: externalLoading = false,
  children,
}) => {
  // Context state hook - Tüm internal state'ler
  const {
    internalError,
    handleInternalError,
    clearError,
    internalLoading,
    handleInternalChange,
    handleInternalUpload,
  } = useContextState();

  // Accept attribute
  const acceptAttribute = getAcceptAttribute(type);

  // Core hook'ları kullan
  const { files, loading, processFiles, removeFile } = useFileManagement({
    value: undefined,
    onChange: handleInternalChange,
    onError: handleInternalError,
    type,
    multiple,
    maxSize,
    maxFiles,
    acceptAttribute,
  });

  const { dragActive, handleDrag, handleDrop } = useDragAndDrop(
    disabled,
    loading || externalLoading || internalLoading
  );

  const { selectedFile, isModalOpen, openPreview, closePreview } =
    useFilePreview();
  const { fileInputRef, openFileDialog } = useFileInputRef();

  // Combined loading state
  const isLoading = loading || externalLoading || internalLoading;

  // Context handlers hook - Tüm event handler'lar
  const { handleFileSelect, onDrop, handleUploadAreaClick, handleUpload } =
    useContextHandlers({
      files,
      processFiles,
      disabled,
      handleDrop,
      openFileDialog,
      isLoading,
      handleInternalUpload,
      handleInternalError,
    });

  // Context value
  const contextValue: FileInputContextValue = {
    // File Management
    files,
    processFiles,
    removeFile,

    // Loading States
    loading,
    internalLoading,
    isLoading,

    // Error Management
    internalError,
    handleInternalError,
    clearError,

    // Upload Management
    handleInternalUpload,
    handleUpload,

    // Drag & Drop
    dragActive,
    handleDrag,
    handleDrop,
    onDrop,

    // File Preview
    selectedFile,
    isModalOpen,
    openPreview,
    closePreview,

    // File Input Ref
    fileInputRef,
    openFileDialog,

    // Event Handlers
    handleFileSelect,
    handleUploadAreaClick,

    // Configuration
    acceptAttribute,
    type,
    multiple,
    maxFiles,
    maxSize,
    disabled,
  };

  return (
    <FileInputContext.Provider value={contextValue}>
      {children}
    </FileInputContext.Provider>
  );
};

// Custom hook to use FileInput context
export const useFileInputContext = () => {
  const context = useContext(FileInputContext);
  if (context === undefined) {
    throw new Error(
      "useFileInputContext must be used within a FileInputContextProvider"
    );
  }
  return context;
};
