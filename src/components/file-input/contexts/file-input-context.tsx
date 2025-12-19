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
    handleInternalChange: baseHandleInternalChange,
    handleInternalUpload,
  } = useContextState();

  // Form state'ini de güncelleyen onChange handler
  const handleInternalChangeWithForm = React.useCallback(
    (files: File[] | File | null) => {
      baseHandleInternalChange(files);

      // Form state'ini de güncelle (eğer name varsa ve multiple ise)
      if (name && multiple) {
        // Çoklu dosya yüklemede, sadece yüklenmiş dosyaları form'a kaydet
        // Yeni dosyalar henüz yüklenmediği için form'a kaydetmeyelim
        // Form güncellemesi handleUpload içinde yapılacak
      }
    },
    [baseHandleInternalChange, name, multiple, setValue]
  );

  // Accept attribute
  const acceptAttribute = getAcceptAttribute(type);

  // Core hook'ları kullan
  const {
    files,
    loading,
    processFiles,
    removeFile: baseRemoveFile,
    markFilesAsUploaded,
    hasNewFiles,
  } = useFileManagement({
    value: undefined,
    initialValue: finalInitialValue, // Form'dan veya prop'tan gelen değer
    onChange: handleInternalChangeWithForm,
    onError: handleInternalError,
    type,
    multiple,
    maxSize,
    maxFiles,
    acceptAttribute,
  });

  // Form state'ini de güncelleyen removeFile wrapper
  const removeFile = React.useCallback(
    (fileToRemove: any) => {
      // Önce base removeFile'ı çağır
      baseRemoveFile(fileToRemove);

      // Form state'ini de güncelle (eğer name varsa ve multiple ise)
      if (name && multiple) {
        // Silme sonrası kalan dosyaları form'a kaydet
        // Sadece yüklenmiş dosyaları form'a kaydet (isUploaded olanlar)
        const remainingUploadedFiles = files
          .filter((f, index) => {
            // Silinecek dosyayı hariç tut
            if (typeof fileToRemove === "number") {
              return index !== fileToRemove && (f as any).isUploaded;
            } else {
              return (
                f.preview !== fileToRemove.preview && (f as any).isUploaded
              );
            }
          })
          .map((file: any) => {
            let fileUrl = "";

            // 1. Önce path field'ını kontrol et
            if (file.path) {
              fileUrl = file.path;
            }
            // 2. preview'dan çıkar
            else if (file.preview) {
              fileUrl = file.preview;
              // Serve prefix'ini çıkar
              const servePrefix = "/api/files/serve/";
              if (fileUrl.includes(servePrefix)) {
                fileUrl = fileUrl.substring(
                  fileUrl.indexOf(servePrefix) + servePrefix.length
                );
              }
            }

            return {
              id: file.id || null,
              itemType: file.itemType,
              fileUrl: fileUrl,
              fileName: file.name,
              sortOrder: file.sortOrder,
            };
          });

        setValue(name, remainingUploadedFiles);
      }
    },
    [baseRemoveFile, files, name, multiple, setValue]
  );

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

        // console.log("🎨 Crop save - Preview URL eklendi:", previewUrl);

        // console.log(
        //   "📤 Crop save - handleUpload çağrılıyor (kırpılmış dosya ile)..."
        // );

        // CROP SONRASI OTOMATIK UPLOAD - kırpılmış dosyayı direkt gönder
        // State güncellemesini beklemeye gerek yok, dosyayı parametre olarak gönder
        await handleUpload([croppedFile]);

        // console.log("✅ Crop save - handleUpload tamamlandı!");

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
