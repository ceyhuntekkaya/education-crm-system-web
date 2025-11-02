"use client";

import { useCallback } from "react";
import { useCompany } from "@/app/(protected)/company/_shared/context";
import { useForm } from "@/contexts/form-context";
import { getUploadUrl, getFileServeUrl } from "@/lib/api/constants";
import { UseFileUploadOptions } from "../types/hook.types";
import { MediaType } from "@/enums";

export const useFileUpload = ({
  files,
  name,
  onUpload,
  onUploadSuccess,
  onUploadError,
  onInternalError,
  setInternalLoading,
  markFilesAsUploaded,
}: UseFileUploadOptions) => {
  const { selectedSchool } = useCompany();
  const { setValue } = useForm();

  const handleUpload = useCallback(async () => {
    if (files.length === 0) return;

    // Loading başlat
    setInternalLoading?.(true);

    try {
      if (onUpload) {
        await onUpload(files);
        onUploadSuccess?.(files);
        // Yükleme başarılı olduktan sonra dosyaları işaretle
        markFilesAsUploaded?.();
        return;
      }

      const schoolId = selectedSchool?.id?.toString();
      if (!schoolId || !name) {
        throw new Error("School ID veya upload type tanımlı değil");
      }

      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const uploadUrl = getUploadUrl(schoolId, name);
      const xhr = new XMLHttpRequest();

      return new Promise<void>((resolve, reject) => {
        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded * 100) / e.total);
            console.log(`Upload progress: ${progress}%`);
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);

              // Multi file upload kontrolü
              const isMultiFileUpload = files.length > 1;

              if (
                name &&
                response &&
                Array.isArray(response) &&
                response.length > 0
              ) {
                if (isMultiFileUpload) {
                  // Multi file upload için items array'i oluştur
                  const items = response.map((file: any, index: number) => ({
                    itemType: file.mediaType || MediaType.IMAGE,
                    fileUrl: getFileServeUrl(file.fileUrl),
                    fileName: file.originalFileName || file.fileName,
                    sortOrder: index + 1,
                  }));

                  // Items array'ini form'a kaydet
                  setValue(name, items);
                  console.log(
                    `Multi file upload başarılı (${items.length} dosya):`,
                    items
                  );

                  // Yükleme başarılı olduktan sonra dosyaları işaretle
                  // Response'u geçerek placeholder dosyalar oluştur
                  markFilesAsUploaded?.(response);
                } else {
                  // Tek dosya için mevcut mantık
                  const firstFile = response[0];
                  if (firstFile.fileUrl) {
                    const fullUrl = getFileServeUrl(firstFile.fileUrl);
                    setValue(name, fullUrl);
                  }

                  // Tek dosya için de işaretle
                  markFilesAsUploaded?.(response);
                }
              }

              // Her iki durumda da onUploadSuccess callback'ini çağır
              onUploadSuccess?.(response);

              // Loading kapat
              setInternalLoading?.(false);

              resolve();
            } catch (error) {
              const errorMsg = "Response parse edilemedi";
              onInternalError?.(errorMsg);
              onUploadError?.(errorMsg);

              // Loading kapat
              setInternalLoading?.(false);

              reject(new Error(errorMsg));
            }
          } else {
            const errorMsg = `Upload failed with status: ${xhr.status}`;
            onInternalError?.(errorMsg);
            onUploadError?.(errorMsg);

            // Loading kapat
            setInternalLoading?.(false);

            reject(new Error(errorMsg));
          }
        });

        xhr.addEventListener("error", () => {
          const errorMsg = "Dosya yüklenirken bir hata oluştu";
          onInternalError?.(errorMsg);
          onUploadError?.(errorMsg);

          // Loading kapat
          setInternalLoading?.(false);

          reject(new Error(errorMsg));
        });

        xhr.addEventListener("abort", () => {
          const errorMsg = "Upload iptal edildi";
          onInternalError?.(errorMsg);
          onUploadError?.(errorMsg);

          // Loading kapat
          setInternalLoading?.(false);

          reject(new Error(errorMsg));
        });

        xhr.open("POST", uploadUrl);
        xhr.send(formData);
      });
    } catch (error) {
      console.error("Upload error:", error);
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Dosya yüklenirken bir hata oluştu";
      onInternalError?.(errorMsg);
      onUploadError?.(errorMsg);

      // Loading kapat
      setInternalLoading?.(false);

      throw error;
    }
  }, [
    files,
    selectedSchool?.id,
    name,
    setValue,
    onUpload,
    onUploadSuccess,
    onUploadError,
    onInternalError,
    setInternalLoading,
    markFilesAsUploaded,
  ]);

  return { handleUpload };
};
