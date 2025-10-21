"use client";

import { useCallback } from "react";
import { useCompany } from "@/app/(protected)/company/_shared/context";
import { useForm } from "@/contexts/form-context";
import { getUploadUrl, getFileServeUrl } from "@/lib/api/constants";
import { UseFileUploadOptions } from "../types/hook.types";

export const useFileUpload = ({
  files,
  name,
  onUpload,
  onUploadSuccess,
  onUploadError,
  onInternalError,
}: UseFileUploadOptions) => {
  const { selectedSchool } = useCompany();
  const { setValue } = useForm();

  const handleUpload = useCallback(async () => {
    if (files.length === 0) return;

    try {
      if (onUpload) {
        await onUpload(files);
        onUploadSuccess?.(files);
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
              if (
                name &&
                response &&
                Array.isArray(response) &&
                response.length > 0
              ) {
                const firstFile = response[0];
                if (firstFile.fileUrl) {
                  const fullUrl = getFileServeUrl(firstFile.fileUrl);
                  setValue(name, fullUrl);
                }
              }
              onUploadSuccess?.(response);
              resolve();
            } catch (error) {
              const errorMsg = "Response parse edilemedi";
              onInternalError?.(errorMsg);
              onUploadError?.(errorMsg);
              reject(new Error(errorMsg));
            }
          } else {
            const errorMsg = `Upload failed with status: ${xhr.status}`;
            onInternalError?.(errorMsg);
            onUploadError?.(errorMsg);
            reject(new Error(errorMsg));
          }
        });

        xhr.addEventListener("error", () => {
          const errorMsg = "Dosya yüklenirken bir hata oluştu";
          onInternalError?.(errorMsg);
          onUploadError?.(errorMsg);
          reject(new Error(errorMsg));
        });

        xhr.addEventListener("abort", () => {
          const errorMsg = "Upload iptal edildi";
          onInternalError?.(errorMsg);
          onUploadError?.(errorMsg);
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
  ]);

  return { handleUpload };
};
