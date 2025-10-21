"use client";

import { useState, useCallback } from "react";
import { getUploadUrl } from "@/lib/api/constants";

interface UseFileUploadOptions {
  schoolId: string;
  uploadType: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

/**
 * Dosya yükleme hook'u
 * XHR kullanarak dosyaları API'ye yükler
 */
export const useFileUpload = ({
  schoolId,
  uploadType,
  onSuccess,
  onError,
}: UseFileUploadOptions) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFiles = useCallback(
    async (files: File[]): Promise<any> => {
      if (files.length === 0) {
        const error = "Yüklenecek dosya bulunamadı";
        setUploadError(error);
        onError?.(error);
        return null;
      }

      setIsUploading(true);
      setProgress(0);
      setUploadError(null);

      try {
        // FormData oluştur
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });

        // API URL oluştur
        const uploadUrl = getUploadUrl(schoolId, uploadType);

        // XHR ile yükleme
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          // Progress event
          xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
              const progressPercent = Math.round((e.loaded * 100) / e.total);
              setProgress(progressPercent);
            }
          });

          // Load event (başarılı)
          xhr.addEventListener("load", () => {
            setIsUploading(false);

            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const response = JSON.parse(xhr.responseText);
                setUploadError(null);
                onSuccess?.(response);
                resolve(response);
              } catch (error) {
                const errorMsg = "Yanıt işlenirken hata oluştu";
                setUploadError(errorMsg);
                onError?.(errorMsg);
                reject(new Error(errorMsg));
              }
            } else {
              const errorMsg = `Yükleme başarısız: ${xhr.status} ${xhr.statusText}`;
              setUploadError(errorMsg);
              onError?.(errorMsg);
              reject(new Error(errorMsg));
            }
          });

          // Error event
          xhr.addEventListener("error", () => {
            setIsUploading(false);
            const errorMsg = "Dosya yüklenirken bir hata oluştu";
            setUploadError(errorMsg);
            onError?.(errorMsg);
            reject(new Error(errorMsg));
          });

          // Abort event
          xhr.addEventListener("abort", () => {
            setIsUploading(false);
            const errorMsg = "Yükleme iptal edildi";
            setUploadError(errorMsg);
            onError?.(errorMsg);
            reject(new Error(errorMsg));
          });

          // Upload başlat
          xhr.open("POST", uploadUrl);
          xhr.send(formData);
        });
      } catch (error) {
        setIsUploading(false);
        const errorMsg =
          error instanceof Error
            ? error.message
            : "Dosya yüklenirken bir hata oluştu";
        setUploadError(errorMsg);
        onError?.(errorMsg);
        throw error;
      }
    },
    [schoolId, uploadType, onSuccess, onError]
  );

  return {
    uploadFiles,
    isUploading,
    progress,
    uploadError,
  };
};
