"use client";

import React, { useMemo } from "react";
import { useApplicationDetailContext } from "../context";
import { MediaGallery, MediaGalleryItem } from "@/components/ui";
import { CustomCard } from "@/components";
import { getMediaItemType } from "./application-document-form/utils";

/**
 * ================================================================================
 * APPLICATION DOCUMENTS SECTION (Company)
 * ================================================================================
 * Başvuru belgeleri görüntüleme (Sadece Okuma)
 */

export const ApplicationDocumentsSection: React.FC = () => {
  const { documents, isLoadingDocuments } = useApplicationDetailContext();

  // Belgeleri MediaGallery formatına dönüştür
  const mediaItems = useMemo<MediaGalleryItem[]>(() => {
    if (!documents) return [];

    return documents.map((doc) => ({
      id: doc.id,
      itemType: getMediaItemType(doc.documentType, doc.documentUrl),
      fileUrl: doc.documentUrl,
      fileName: doc.documentName,
      fileSizeBytes: doc.fileSize,
      title: doc.documentName,
      description: doc.documentType,
    }));
  }, [documents]);

  // Loading State
  if (isLoadingDocuments) {
    return (
      <CustomCard title="Belgeler" subtitle="Yükleniyor..." className="mb-24">
        <div className="text-center py-32">
          <div className="spinner-border text-primary mb-12" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="text-muted mb-0">Belgeler yükleniyor...</p>
        </div>
      </CustomCard>
    );
  }

  // Empty State
  if (!documents || documents.length === 0) {
    return (
      <CustomCard
        title="Belgeler"
        subtitle="Belge bulunamadı"
        className="mb-24"
      >
        <div className="text-center py-48">
          <div className="mb-12">
            <i className="ph-files text-muted" style={{ fontSize: "3rem" }}></i>
          </div>
          <h6 className="text-muted mb-8">Henüz Belge Eklenmemiş</h6>
          <p className="text-muted small mb-0">
            Başvuran henüz hiç belge eklememiş.
          </p>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title="Belgeler"
      subtitle={`Toplam ${documents.length} adet belge`}
      className="mb-24"
    >
      <MediaGallery
        items={mediaItems}
        showThumbnails={true}
        showNavigation={true}
        showCounter={true}
      />
    </CustomCard>
  );
};
