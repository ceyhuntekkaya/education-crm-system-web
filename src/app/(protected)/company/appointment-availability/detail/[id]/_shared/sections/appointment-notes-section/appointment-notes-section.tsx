"use client";

import React from "react";
import { CustomCard } from "@/components";
import { useAppointmentDetail } from "../../context";
import { NoteItem } from "./note-item";

export const AppointmentNotesSection: React.FC = () => {
  const {
    notes,
    appointmentNotesLoading: isLoading,
    appointmentNotesError: error,
  } = useAppointmentDetail();

  if (isLoading) {
    return (
      <CustomCard
        title="Randevu Notları"
        subtitle="Yükleniyor..."
        className="h-100"
      >
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="text-muted mb-0">Notlar yükleniyor...</p>
        </div>
      </CustomCard>
    );
  }

  if (error) {
    return (
      <CustomCard
        title="Randevu Notları"
        subtitle="Hata oluştu"
        className="h-100"
      >
        <div className="text-center py-5">
          <div className="mb-3">
            <i
              className="ph ph-warning-circle text-danger"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
          <h6 className="text-danger mb-2">Yükleme Hatası</h6>
          <p className="text-muted small mb-0">
            Notlar yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
          </p>
        </div>
      </CustomCard>
    );
  }

  if (!notes || !Array.isArray(notes) || notes.length === 0) {
    return (
      <CustomCard
        title="Randevu Notları"
        subtitle="Not bulunamadı"
        className="h-100"
      >
        <div className="text-center py-5">
          <div className="mb-3">
            <i
              className="ph ph-note-blank text-muted"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
          <h6 className="text-muted mb-2">Henüz Not Eklenmemiş</h6>
          <p className="text-muted small mb-0">
            Bu randevu için henüz hiçbir not eklenmemiş.
          </p>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title="Randevu Notları"
      subtitle={`Toplam ${notes.length} adet not`}
      className="h-100"
    >
      <div
        className="position-relative"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <div className="pe-2 d-flex flex-column gap-12">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      </div>
    </CustomCard>
  );
};
