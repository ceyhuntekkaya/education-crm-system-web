"use client";

import React, { useState } from "react";
import { useApplicationDetailContext } from "../context";
import { Button } from "@/components/ui";
import { CustomCard } from "@/components";
import { ApplicationNoteItem } from "./application-note-item";
import { ApplicationNoteForm } from "./application-note-form";

/**
 * ================================================================================
 * APPLICATION NOTES SECTION
 * ================================================================================
 * Başvuru notları listesi ve ekle formu
 */

export const ApplicationNotesSection: React.FC = () => {
  const { notes, isLoadingNotes } = useApplicationDetailContext();
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = () => {
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  // Loading State
  if (isLoadingNotes) {
    return (
      <CustomCard title="Notlar" subtitle="Yükleniyor..." className="mb-24">
        <div className="text-center py-32">
          <div className="spinner-border text-primary mb-12" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="text-muted mb-0">Notlar yükleniyor...</p>
        </div>
      </CustomCard>
    );
  }

  // Empty State
  if (!notes || notes.length === 0) {
    return (
      <CustomCard title="Notlar" subtitle="Not bulunamadı" className="mb-24">
        <div className="row g-24 mt-16">
          {/* Sol: Form */}
          <div className="col-6">
            <ApplicationNoteForm
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </div>

          {/* Sağ: Empty State */}
          <div className="col-6">
            <div className="text-center py-48">
              <div className="mb-16">
                <i
                  className="ph-note-blank text-muted"
                  style={{ fontSize: "3.5rem" }}
                ></i>
              </div>
              <h6 className="text-dark mb-8">Henüz Not Eklenmemiş</h6>
              <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                Bu başvuru için henüz hiç not eklenmemiş.
              </p>
            </div>
          </div>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title="Notlar"
      subtitle={`Toplam ${notes.length} adet not`}
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
              Not Ekle
            </>
          )}
        </Button>
      }
    >
      <div className="row g-20 mt-16">
        {/* Form - showForm true ise göster */}
        {showForm && (
          <div className="col-6">
            <div className="">
              <ApplicationNoteForm
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )}

        {/* Not Listesi - Form açıksa col-6, kapalıysa col-12 */}
        <div className={showForm ? "col-6" : "col-12"}>
          <div>
            <h6 className="pb-16 fw-semibold text-dark">
              <i className="ph-note-blank me-2"></i>
              Not Listesi
            </h6>
            <div className="row">
              {notes.map((note) => (
                <div
                  className={showForm ? "col-12 mb-16" : "col-6 mb-16"}
                  key={note.id}
                >
                  <ApplicationNoteItem note={note} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomCard>
  );
};
