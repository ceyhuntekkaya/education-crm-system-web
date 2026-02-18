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
      <CustomCard
        title="Notlar"
        subtitle="Not bulunamadı"
        className="mb-24"
        headerAction={
          !showForm ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowForm(true)}
            >
              <i className="ph-plus me-2"></i>
              Not Ekle
            </Button>
          ) : undefined
        }
      >
        {showForm ? (
          <ApplicationNoteForm
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        ) : (
          <div className="text-center py-32">
            <div className="mb-12">
              <i
                className="ph-note-blank text-muted"
                style={{ fontSize: "3rem" }}
              ></i>
            </div>
            <h6 className="text-muted mb-8">Henüz Not Eklenmemiş</h6>
            <p className="text-muted small mb-0">
              Bu başvuru için henüz hiç not eklenmemiş.
            </p>
          </div>
        )}
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title="Notlar"
      subtitle={`Toplam ${notes.length} adet not`}
      className="mb-24"
      headerAction={
        !showForm ? (
          <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
            <i className="ph-plus me-2"></i>
            Not Ekle
          </Button>
        ) : undefined
      }
    >
      {showForm && (
        <div className="mb-20 pb-20 border-bottom">
          <ApplicationNoteForm
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="row g-16">
        {notes.map((note) => (
          <div key={note.id} className="col-12">
            <ApplicationNoteItem note={note} />
          </div>
        ))}
      </div>
    </CustomCard>
  );
};
