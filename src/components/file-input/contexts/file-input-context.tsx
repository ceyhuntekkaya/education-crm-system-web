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
  initialValue,
  name,
  onUpload,
  onUploadSuccess,
  onUploadError,
  isCropPreview = false,
  cropWidth,
  cropHeight,
  cropAspectRatio,
  onCropComplete,
  children,
}) => {
  // Form context'ten value al (eğer name varsa)
  const { getValue, setValue } = useForm();
  const formInitialValue = name ? getValue(name) : undefined;

  // initialValue prop'u varsa onu kullan, yoksa form'dan gelen değeri kullan
  const finalInitialValue =
    initialValue !== undefined ? initialValue : formInitialValue;

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
    initialValue: finalInitialValue, // Form'dan veya prop'tan gelen değer
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

  // Upload hook - handleUpload fonksiyonunu sağlar (crop'tan önce tanımla)
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

  // Crop modal state
  const [isCropModalOpen, setIsCropModalOpen] = React.useState(false);
  const [cropFile, setCropFile] = React.useState<any | null>(null);

  const openCropModal = React.useCallback((file: any) => {
    setCropFile(file);
    setIsCropModalOpen(true);
  }, []);

  const closeCropModal = React.useCallback(() => {
    setIsCropModalOpen(false);
    setCropFile(null);
  }, []);

  const handleCropSave = React.useCallback(
    async (croppedFile: File) => {
      try {
        setInternalLoading(true);

        // Callback varsa çağır
        if (onCropComplete) {
          onCropComplete(croppedFile);
        }

        // Kırpılmış resme preview URL'i ekle - ÖNCE bunu yap ki processFiles içinde korunsun
        const previewUrl = URL.createObjectURL(croppedFile);
        Object.defineProperty(croppedFile, "preview", {
          value: previewUrl,
          writable: true,
          enumerable: true,
          configurable: true,
        });

        console.log("🎨 Crop save - Preview URL eklendi:", previewUrl);

        console.log(
          "📤 Crop save - handleUpload çağrılıyor (kırpılmış dosya ile)..."
        );

        // CROP SONRASI OTOMATIK UPLOAD - kırpılmış dosyayı direkt gönder
        // State güncellemesini beklemeye gerek yok, dosyayı parametre olarak gönder
        await handleUpload([croppedFile]);

        console.log("✅ Crop save - handleUpload tamamlandı!");

        // Upload başarılı olduktan SONRA files state'ine ekle (preview için)
        const fileList = new DataTransfer();
        fileList.items.add(croppedFile);
        await processFiles(fileList.files);

        closeCropModal();
      } catch (error: any) {
        const errorMessage = error?.message || "Crop islemi basarisiz oldu";
        handleInternalError(errorMessage);

        if (onUploadError) {
          onUploadError(errorMessage);
        }
      } finally {
        setInternalLoading(false);
      }
    },
    [
      onCropComplete,
      closeCropModal,
      setInternalLoading,
      handleInternalError,
      processFiles,
      handleUpload,
      onUploadError,
    ]
  );

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

    // Crop Modal
    isCropModalOpen,
    cropFile,
    openCropModal,
    closeCropModal,
    handleCropSave,

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

    // Crop Configuration
    isCropPreview,
    cropWidth,
    cropHeight,
    cropAspectRatio,
    onCropComplete,
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
