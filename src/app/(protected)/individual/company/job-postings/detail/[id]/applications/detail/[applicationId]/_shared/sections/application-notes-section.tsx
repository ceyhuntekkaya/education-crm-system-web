"use client";

import React from "react";
import { useApplicationDetailContext } from "../context";
import { CustomCard } from "@/components";
import { ApplicationNoteItem } from ".";

/**
 * ================================================================================
 * APPLICATION NOTES SECTION (Company)
 * ================================================================================
 * Başvuru notları görüntüleme (Sadece Okuma)
 */

export const ApplicationNotesSection: React.FC = () => {
  const { notes, isLoadingNotes } = useApplicationDetailContext();

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
        <div className="text-center py-48">
          <div className="mb-16">
            <i
              className="ph-note-blank text-muted"
              style={{ fontSize: "3.5rem" }}
            ></i>
          </div>
          <h6 className="text-dark mb-8">Henüz Not Eklenmemiş</h6>
          <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
            Başvuran henüz hiç not eklememiş.
          </p>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title="Notlar"
      subtitle={`Toplam ${notes.length} adet not`}
      className="mb-24"
    >
      <div className="row g-16 mt-12">
        {notes.map((note) => (
          <div className="col-6" key={note.id}>
            <ApplicationNoteItem note={note} />
          </div>
        ))}
      </div>
    </CustomCard>
  );
};
