"use client";

import React, { useState, useMemo } from "react";
import { useApplicationDetailContext } from "../context";
import { Button, MediaGallery, MediaGalleryItem } from "@/components/ui";
import { CustomCard } from "@/components";
import { ApplicationDocumentForm } from "./application-document-form";
import { getMediaItemType } from "./application-document-form/utils";

/**
 * ================================================================================
 * APPLICATION DOCUMENTS SECTION
 * ================================================================================
 * Başvuru belgeleri listesi ve ekle formu
 */

export const ApplicationDocumentsSection: React.FC = () => {
  const { documents, isLoadingDocuments, deleteDocument, isDeletingDocument } =
    useApplicationDetailContext();

  const [showForm, setShowForm] = useState(false);

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

  const handleSuccess = () => {
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

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
        <div className="row g-20">
          {/* Sol: Form */}
          <div className="col-12 col-lg-6">
            <div className="border rounded-3 p-16 bg-light">
              <h6 className="mb-12 fw-semibold">
                <i className="ph-plus-circle me-2"></i>
                Belge Ekle
              </h6>
              <ApplicationDocumentForm
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />
            </div>
          </div>

          {/* Sağ: Empty State */}
          <div className="col-12 col-lg-6">
            <div className="text-center py-48">
              <div className="mb-12">
                <i
                  className="ph-files text-muted"
                  style={{ fontSize: "3rem" }}
                ></i>
              </div>
              <h6 className="text-muted mb-8">Henüz Belge Eklenmemiş</h6>
              <p className="text-muted small mb-0">
                Bu başvuru için henüz hiç belge eklenmemiş.
              </p>
            </div>
          </div>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title="Belgeler"
      subtitle={`Toplam ${documents.length} adet belge`}
      className="mb-24"
      headerAction={
        <Button
          variant={showForm ? "outline" : "inline"}
          size="sm"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? (
            <>
              <i className="ph-x me-2"></i>
              Formu Kapat
            </>
          ) : (
            <>
              <i className="ph-plus me-2"></i>
              Belge Ekle
            </>
          )}
        </Button>
      }
    >
      <div className="row g-20">
        {/* Form - showForm true ise göster */}
        {showForm && (
          <div className="col-6">
            <div>
              <h6 className="mb-12 fw-semibold">
                <i className="ph-plus-circle me-2"></i>
                Yeni Belge Ekle
              </h6>
              <ApplicationDocumentForm
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )}

        {/* MediaGallery - Form açıksa col-12, kapalıysa col-6 */}
        <div className={showForm ? "col-6" : "col-12"}>
          <div>
            <h6 className="mb-12 fw-semibold">
              <i className="ph-files me-2"></i>
              Belge Galerisi
            </h6>
            <MediaGallery
              items={mediaItems}
              showThumbnails={true}
              showNavigation={true}
              showCounter={true}
            />
          </div>
        </div>
      </div>
    </CustomCard>
  );
};
