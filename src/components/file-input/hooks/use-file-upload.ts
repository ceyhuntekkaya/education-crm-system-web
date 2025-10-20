"use client";

import { useState, useCallback } from "react";

export interface UseFileUploadOptions {
  onProgress?: (progress: number) => void;
  onComplete?: (uploadedFiles: File[]) => void;
  onError?: (error: string) => void;
}

export interface FileUploadState {
  isUploading: boolean;
  progress: number;
  uploadedFiles: number;
  totalFiles: number;
  currentFileName: string;
}

/**
 * Dosya yükleme işlemlerini yöneten hook
 */
export const useFileUpload = (options: UseFileUploadOptions = {}) => {
  const { onProgress, onComplete, onError } = options;

  const [uploadState, setUploadState] = useState<FileUploadState>({
    isUploading: false,
    progress: 0,
    uploadedFiles: 0,
    totalFiles: 0,
    currentFileName: "",
  });

  // Dosyaları yükle
  const uploadFiles = useCallback(
    async (
      files: File[],
      uploadFunction?: (files: File[]) => Promise<void>
    ) => {
      if (!files.length) return;

      setUploadState({
        isUploading: true,
        progress: 0,
        uploadedFiles: 0,
        totalFiles: files.length,
        currentFileName: "",
      });

      try {
        // Eğer özel upload fonksiyonu verilmişse onu kullan
        if (uploadFunction) {
          await uploadFunction(files);

          // Başarılı upload simülasyonu
          for (let i = 0; i < files.length; i++) {
            const progress = ((i + 1) / files.length) * 100;

            setUploadState((prev: FileUploadState) => ({
              ...prev,
              progress,
              uploadedFiles: i + 1,
              currentFileName: files[i].name,
            }));

            onProgress?.(progress);

            // Her dosya için biraz bekle (simülasyon)
            await new Promise((resolve) => setTimeout(resolve, 300));
          }
        } else {
          // Default upload simülasyonu
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const progress = ((i + 1) / files.length) * 100;

            setUploadState((prev: FileUploadState) => ({
              ...prev,
              progress,
              uploadedFiles: i + 1,
              currentFileName: file.name,
            }));

            onProgress?.(progress);

            // Dosya yükleme simülasyonu
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 + Math.random() * 2000)
            );
          }
        }

        // Upload tamamlandı
        setUploadState((prev: FileUploadState) => ({
          ...prev,
          isUploading: false,
          progress: 100,
        }));

        onComplete?.(files);

        // 2 saniye sonra state'i temizle
        setTimeout(() => {
          setUploadState({
            isUploading: false,
            progress: 0,
            uploadedFiles: 0,
            totalFiles: 0,
            currentFileName: "",
          });
        }, 2000);
      } catch (error) {
        setUploadState((prev: FileUploadState) => ({
          ...prev,
          isUploading: false,
        }));

        const errorMessage =
          error instanceof Error
            ? error.message
            : "Upload işlemi başarısız oldu";
        onError?.(errorMessage);
      }
    },
    [onProgress, onComplete, onError]
  );

  // Upload durumunu sıfırla
  const resetUpload = useCallback(() => {
    setUploadState({
      isUploading: false,
      progress: 0,
      uploadedFiles: 0,
      totalFiles: 0,
      currentFileName: "",
    });
  }, []);

  return {
    uploadState,
    uploadFiles,
    resetUpload,
    isUploading: uploadState.isUploading,
  };
};
