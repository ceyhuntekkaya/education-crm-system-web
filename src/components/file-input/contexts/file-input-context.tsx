"use client";

import React, { createContext, useContext } from "react";
import { useForm } from "@/contexts/form-context";
import { getAcceptAttribute } from "../utils";
import {
  FileInputContextProps,
  FileInputContextValue,
} from "../types/context.types";
import {
  useFileManagement,
  useDragAndDrop,
  useFilePreview,
  useFileInputRef,
  useContextState,
  useContextHandlers,
  useFileUpload,
} from "../hooks";

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
  isAutoUpload = false,
  name,
  onUpload,
  onUploadSuccess,
  onUploadError,
  children,
}) => {
  // Form context'ten value al (eğer name varsa)
  const { getValue } = useForm();
  const initialValue = name ? getValue(name) : undefined;

  // Context state hook - Tüm internal state'ler
  const {
    internalError,
    handleInternalError,
    clearError,
    internalLoading,
    setInternalLoading,
    handleInternalChange,
    handleInternalUpload,
  } = useContextState();

  // Accept attribute
  const acceptAttribute = getAcceptAttribute(type);

  // Core hook'ları kullan
  const {
    files,
    loading,
    processFiles,
    removeFile,
    markFilesAsUploaded,
    hasNewFiles,
  } = useFileManagement({
    value: undefined,
    initialValue, // Form'dan gelen URL değeri
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

  // Upload hook - handleUpload fonksiyonunu sağlar
  const { handleUpload } = useFileUpload({
    files,
    name,
    onUpload,
    onUploadSuccess,
    onUploadError,
    onInternalError: handleInternalError,
    setInternalLoading, // Loading state setter'ını geç
    markFilesAsUploaded, // Yükleme başarılı olunca dosyaları işaretle
  });

  // Context handlers hook - Event handler'lar
  const { handleFileSelect, onDrop, handleUploadAreaClick } =
    useContextHandlers({
      files,
      processFiles,
      disabled,
      handleDrop,
      openFileDialog,
      isLoading,
      handleUpload,
      isAutoUpload,
    });

  // Context value
  const contextValue: FileInputContextValue = {
    // File Management
    files,
    processFiles,
    removeFile,
    markFilesAsUploaded,
    hasNewFiles,

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
    isAutoUpload,

    // Upload API
    name,
    onUploadSuccess,
    onUploadError,
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
