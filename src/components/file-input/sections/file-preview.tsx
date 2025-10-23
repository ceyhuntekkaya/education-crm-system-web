"use client";

import React from "react";
import CustomImage from "@/components/ui/custom-image";
import Icon from "@/components/ui/icon";
import { FileWithPreview, FileInputType } from "../types/file.types";
import { getFileTypeIcon, formatFileSize, getFriendlyFileType } from "../utils";

import { useFileInputContext } from "../contexts";

interface FilePreviewProps {
  // Props kalmadı - hepsi context'ten gelecek
}

export const FilePreview: React.FC<FilePreviewProps> = () => {
  // Context'ten tüm gerekli verileri al
  const { files, type, multiple, disabled, openPreview, removeFile } =
    useFileInputContext();
  if (files.length === 0) return null;

  // Dosyaları türlerine göre gruplandır (type="all" olduğunda)
  const groupFilesByType = (files: FileWithPreview[]) => {
    const groups: { [key: string]: FileWithPreview[] } = {
      images: [],
      videos: [],
      documents: [],
    };

    files.forEach((file) => {
      if (file.type?.startsWith("image/")) {
        groups.images.push(file);
      } else if (file.type?.startsWith("video/")) {
        groups.videos.push(file);
      } else {
        groups.documents.push(file);
      }
    });

    return groups;
  };

  const shouldGroupFiles = type === "all" && multiple && files.length > 2;
  const fileGroups = shouldGroupFiles ? groupFilesByType(files) : null;

  const handleFileClick = (file: FileWithPreview) => {
    if (file.type?.startsWith("image/") || file.type?.startsWith("video/")) {
      openPreview(file);
    } else {
      // Diğer dosya türleri için doğrudan yeni sekmede aç
      const url = file.preview || URL.createObjectURL(file);
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        newWindow.location.href = url;
      }
    }
  };

  const renderFileContent = (file: FileWithPreview) => {
    if (file.type?.startsWith("image/") && file.preview) {
      return (
        <div
          className="position-relative cursor-pointer overflow-hidden rounded-12 file-preview-content"
          onClick={() => openPreview(file)}
          title="Büyük görünüm için tıklayın"
        >
          <CustomImage
            key={file.preview}
            src={file.preview}
            alt={file.name}
            width={200}
            height={160}
            className="w-100 h-160 object-cover"
            style={{ objectFit: "cover" }}
          />
          {/* Hover overlay */}
          <div className="preview-overlay">
            <div className="bg-white bg-opacity-90 rounded-circle p-8 d-flex align-items-center justify-content-center">
              <Icon
                icon="ph-magnifying-glass-plus"
                size="lg"
                className="text-main-600"
              />
            </div>
          </div>
        </div>
      );
    }

    if (file.type?.startsWith("video/")) {
      if (file.preview) {
        return (
          <div
            className="position-relative cursor-pointer overflow-hidden rounded-12 file-preview-content"
            onClick={() => openPreview(file)}
            title="Oynatmak için tıklayın"
          >
            <video
              src={file.preview}
              className="w-100 h-160 object-cover"
              controls={false}
              muted
              preload="metadata"
              style={{ objectFit: "cover" }}
            />
            {/* Play overlay */}
            <div className="preview-overlay video-overlay">
              <div className="bg-white bg-opacity-90 rounded-circle p-8 d-flex align-items-center justify-content-center">
                <Icon icon="ph-play" size="lg" className="text-main-600" />
              </div>
            </div>
          </div>
        );
      } else {
        // Video preview yoksa, video icon ile göster
        return (
          <div
            className="position-relative cursor-pointer overflow-hidden rounded-12 file-preview-content"
            onClick={() => openPreview(file)}
            title="Video dosyası - oynatmak için tıklayın"
          >
            <div className="w-100 h-160 bg-gradient-to-br from-red-50 to-red-100 d-flex align-items-center justify-content-center position-relative">
              <div className="d-flex flex-column align-items-center gap-12">
                <div className="bg-white rounded-circle p-12 shadow-sm">
                  <Icon
                    icon="ph-video-camera"
                    size="lg"
                    className="text-red-600"
                  />
                </div>
                <span className="text-xs text-neutral-700 fw-medium text-center px-8">
                  Video Dosyası
                </span>
              </div>
            </div>
            {/* Play overlay */}
            <div className="preview-overlay video-overlay">
              <div className="bg-white bg-opacity-90 rounded-circle p-8 d-flex align-items-center justify-content-center">
                <Icon icon="ph-play" size="lg" className="text-red-600" />
              </div>
            </div>
          </div>
        );
      }
    }

    // Diğer dosya türleri için
    return (
      <div
        className="position-relative cursor-pointer overflow-hidden rounded-12 file-preview-content"
        onClick={() => handleFileClick(file)}
        title="Açmak için tıklayın"
      >
        <div className="w-100 h-160 bg-gradient-to-br from-main-50 to-main-100 d-flex align-items-center justify-content-center position-relative transition-all hover-shadow-md">
          <div className="d-flex flex-column align-items-center gap-12">
            <div className="bg-white rounded-circle p-12 shadow-sm ">
              <Icon
                icon={getFileTypeIcon(file.name)}
                size="lg"
                className="text-main-600"
              />
            </div>
            <span className="text-xs text-neutral-700 fw-medium text-center px-8">
              Açmak için tıklayın
            </span>
          </div>
        </div>

        {/* Hover overlay effect */}
        <div className="preview-overlay">
          <div className="bg-white bg-opacity-90 rounded-circle p-8 d-flex align-items-center justify-content-center">
            <Icon
              icon="ph-arrow-square-out"
              size="md"
              className="text-main-600"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderFileName = (file: FileWithPreview) => {
    if (
      type === "file" ||
      (!file.type?.startsWith("image/") && !file.type?.startsWith("video/"))
    ) {
      return (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleFileClick(file);
          }}
          className="text-main-600 hover-text-main-700 fw-semibold truncate d-block text-decoration-none d-flex align-items-center cursor-pointer transition-colors"
          title={`${file.name} - Yeni sekmede açmak için tıklayın`}
        >
          <span className="truncate me-8 text-sm">{file.name}</span>
          <Icon
            icon="ph-arrow-square-out"
            size="sm"
            className="text-main-500 flex-shrink-0"
          />
        </a>
      );
    }

    return (
      <div
        className="text-neutral-800 fw-semibold truncate text-sm"
        title={file.name}
      >
        {file.name}
      </div>
    );
  };

  const renderFileCard = (file: FileWithPreview, index: number) => {
    // Placeholder file mı kontrol et (size = 0)
    const isPlaceholder = file.size === 0;

    return (
      <div key={index}>
        <div className="bg-white rounded-16 p-16 position-relative overflow-hidden d-flex flex-column box-shadow-md hover-box-shadow-lg transition-all h-100">
          {/* Silme butonu - Direkt Icon component kullanımı */}
          {!disabled && (
            <Icon
              icon="ph-x"
              size="md"
              onClick={() => removeFile(index)}
              variant="outline-danger"
              className="file-remove-icon"
            />
          )}

          {/* Placeholder badge */}
          {isPlaceholder && (
            <div className="position-absolute top-0 start-0 mt-24 ms-24 z-1">
              <span className="badge bg-info-100 text-info-700 text-xs fw-medium px-8 py-4 rounded-6">
                Mevcut
              </span>
            </div>
          )}

          {/* Önizleme içeriği */}
          <div className="mb-12 position-relative">
            {renderFileContent(file)}
          </div>

          {/* Dosya bilgileri */}
          <div className="flex-grow-1 d-flex flex-column">
            <div className="mb-8">{renderFileName(file)}</div>

            <div className="mt-auto">
              <div className="d-flex align-items-center justify-content-between">
                {/* Eğer dosya boyutu 0 ise (placeholder), boyutu gösterme */}
                {file.size > 0 && (
                  <span className="text-neutral-500 text-sm fw-medium">
                    {formatFileSize(file.size)}
                  </span>
                )}
                <span className="text-xs text-main-600 bg-main-50 px-8 py-4 rounded-6 fw-medium">
                  {getFriendlyFileType(file.name)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFileGroup = (
    groupTitle: string,
    groupFiles: FileWithPreview[],
    startIndex: number
  ) => {
    if (groupFiles.length === 0) return null;

    return (
      <div className="mb-24">
        <h4 className="text-lg fw-semibold text-neutral-800 mb-16 d-flex align-items-center gap-8">
          <Icon
            icon={
              groupTitle === "Resimler"
                ? "ph-image"
                : groupTitle === "Videolar"
                ? "ph-video-camera"
                : "ph-file"
            }
            size="md"
            className="text-main-600"
          />
          {groupTitle}
          <span className="text-sm text-neutral-500 fw-normal">
            ({groupFiles.length})
          </span>
        </h4>
        <div className="file-input-grid">
          {groupFiles.map((file, index) =>
            renderFileCard(file, startIndex + index)
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-16">
      {shouldGroupFiles && fileGroups ? (
        <div className="file-preview-grouped">
          {renderFileGroup("Resimler", fileGroups.images, 0)}
          {renderFileGroup(
            "Videolar",
            fileGroups.videos,
            fileGroups.images.length
          )}
          {renderFileGroup(
            "Belgeler",
            fileGroups.documents,
            fileGroups.images.length + fileGroups.videos.length
          )}
        </div>
      ) : (
        <div className={multiple ? "file-input-grid" : "w-100"}>
          {files.map((file, index) => renderFileCard(file, index))}
        </div>
      )}
    </div>
  );
};
