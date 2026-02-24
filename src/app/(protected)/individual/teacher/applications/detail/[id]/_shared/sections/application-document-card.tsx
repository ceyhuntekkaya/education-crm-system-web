"use client";

import React from "react";
import { ApplicationDocumentDto } from "../../../../_shared/types";
import { formatDate } from "@/utils";
import { Button } from "@/components/ui";

interface ApplicationDocumentCardProps {
  document: ApplicationDocumentDto;
  onDelete: (documentId: number) => void;
  isDeleting: boolean;
}

export const ApplicationDocumentCard: React.FC<
  ApplicationDocumentCardProps
> = ({ document: doc, onDelete, isDeleting }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getDocumentIcon = (type?: string | null, fileName?: string) => {
    const typeMap: Record<string, { icon: string; color: string }> = {
      pdf: { icon: "ph-file-pdf", color: "danger" },
      doc: { icon: "ph-file-doc", color: "primary" },
      docx: { icon: "ph-file-doc", color: "primary" },
      xls: { icon: "ph-file-xls", color: "success" },
      xlsx: { icon: "ph-file-xls", color: "success" },
      ppt: { icon: "ph-file-ppt", color: "warning" },
      pptx: { icon: "ph-file-ppt", color: "warning" },
      txt: { icon: "ph-file-text", color: "secondary" },
      jpg: { icon: "ph-file-image", color: "info" },
      jpeg: { icon: "ph-file-image", color: "info" },
      png: { icon: "ph-file-image", color: "info" },
      gif: { icon: "ph-file-image", color: "info" },
      zip: { icon: "ph-file-zip", color: "secondary" },
      rar: { icon: "ph-file-zip", color: "secondary" },
      image: { icon: "ph-file-image", color: "success" },
      cv: { icon: "ph-file-text", color: "info" },
      diploma: { icon: "ph-certificate", color: "warning" },
      sertifika: { icon: "ph-certificate", color: "warning" },
    };

    // Eğer type varsa onu kullan
    if (type) {
      const lowerType = type.toLowerCase();
      if (typeMap[lowerType]) {
        return typeMap[lowerType];
      }
    }

    // Type yoksa dosya adından uzantıyı çıkar
    if (fileName) {
      const extension = fileName.split(".").pop()?.toLowerCase();
      if (extension && typeMap[extension]) {
        return typeMap[extension];
      }
    }

    return { icon: "ph-file", color: "secondary" };
  };

  const { icon, color } = getDocumentIcon(doc.documentType, doc.documentName);

  return (
    <div className="card border shadow-sm hover-shadow-lg transition-shadow">
      <div className="card-body p-16">
        <div className="d-flex align-items-start gap-12">
          {/* Document Icon */}
          <div
            className={`d-flex align-items-center justify-content-center bg-${color}-subtle text-${color} rounded-3 flex-shrink-0`}
            style={{ width: "48px", height: "48px" }}
          >
            <i className={`${icon} fs-3`}></i>
          </div>

          {/* Document Info */}
          <div className="flex-grow-1 min-w-0">
            <h6 className="mb-4 fw-semibold text-dark text-truncate">
              <a
                href={doc.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-decoration-none hover-text-primary-emphasis"
              >
                {doc.documentName}
              </a>
            </h6>
            <div className="d-flex flex-wrap align-items-center gap-8 text-muted small">
              {doc.documentType && (
                <span className="badge bg-light text-dark border px-8 py-4">
                  {doc.documentType}
                </span>
              )}
              {doc.fileSize > 0 && (
                <>
                  <span>•</span>
                  <span>{formatFileSize(doc.fileSize)}</span>
                </>
              )}
              <span>•</span>
              <span>{formatDate(doc.createdAt)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="d-flex flex-column gap-8 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(doc.documentUrl, "_blank")}
              className="px-12"
            >
              <i className="ph-eye me-2"></i>
              Görüntüle
            </Button>
            <Button
              variant="error"
              size="sm"
              onClick={() => onDelete(doc.id)}
              disabled={isDeleting}
              className="px-12"
            >
              <i className="ph-trash me-2"></i>
              Sil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
