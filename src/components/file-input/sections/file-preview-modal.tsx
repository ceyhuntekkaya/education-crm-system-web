"use client";

import React from "react";
import CustomImage from "@/components/ui/custom-image";
import Icon from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import { FileWithPreview, FilePreviewModalProps } from "../types";
import { formatFileSize } from "../utils";

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  selectedFile,
}) => {
  if (!selectedFile) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={selectedFile.type?.startsWith("video/") ? "lg" : "xl"}
      closeOnBackdropClick={true}
      closeOnEscape={true}
      className="file-preview-modal"
    >
      <Modal.Header className="file-modal-header">
        <div className="modal-header-content">
          <div className="file-header-info">
            <div className="file-type-icon">
              <Icon
                icon={
                  selectedFile.type?.startsWith("image/")
                    ? "ph-image"
                    : selectedFile.type?.startsWith("video/")
                    ? "ph-video-camera"
                    : "ph-file-text"
                }
                size="lg"
                className="text-white"
              />
            </div>
            <div className="file-info">
              <h4 className="file-title">{selectedFile.name}</h4>
              <div className="file-meta">
                <span className="file-size">
                  {formatFileSize(selectedFile.size || 0)}
                </span>
                <span className="file-type-badge">
                  {selectedFile.type?.split("/")[1]?.toUpperCase() || "FILE"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="file-modal-body">
        <div className="preview-content">
          {selectedFile.type?.startsWith("image/") && selectedFile.preview ? (
            <div className="image-preview-container">
              <CustomImage
                src={selectedFile.preview}
                alt={selectedFile.name}
                width={800}
                height={600}
                className="preview-image"
                style={{
                  objectFit: "contain",
                  maxHeight: "70vh",
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          ) : selectedFile.type?.startsWith("video/") &&
            selectedFile.preview ? (
            <div className="video-preview-container">
              <video
                src={selectedFile.preview}
                className="preview-video"
                controls={true}
                autoPlay={false}
                muted={false}
                style={{
                  maxHeight: "70vh",
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                }}
              >
                Tarayıcınız video oynatmayı desteklemiyor.
              </video>
            </div>
          ) : (
            <div className="file-preview-container">
              <div className="file-icon-wrapper">
                <Icon icon="ph-file-text" size="lg" className="text-main-500" />
              </div>
              <div className="file-preview-info">
                <p className="preview-message">
                  Bu dosya türü için önizleme mevcut değil.
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer className="file-modal-footer">
        <div className="footer-info">
          <div className="file-details">
            <span className="detail-item">
              <Icon icon="ph-file" size="sm" className="text-neutral-400" />
              <span>{selectedFile.name}</span>
            </span>
            <span className="detail-item">
              <Icon
                icon="ph-hard-drives"
                size="sm"
                className="text-neutral-400"
              />
              <span>{formatFileSize(selectedFile.size || 0)}</span>
            </span>
            <span className="detail-item">
              <Icon icon="ph-tag" size="sm" className="text-neutral-400" />
              <span>
                {selectedFile.type?.split("/")[1]?.toUpperCase() || "FILE"}
              </span>
            </span>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
