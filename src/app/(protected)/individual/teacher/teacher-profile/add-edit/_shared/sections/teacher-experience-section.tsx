"use client";

import React, { useRef, useState } from "react";
import { useTeacherProfileAddEdit } from "../context";
import { Button } from "@/components/ui";
import { Modal, CustomCard } from "@/components";
import { TeacherExperienceItem } from "./teacher-experience-item";
import { TeacherExperienceForm } from "./teacher-experience-form";
import type { TeacherExperienceDto } from "@/types";

/**
 * ================================================================================
 * TEACHER EXPERIENCE SECTION
 * ================================================================================
 * İş deneyimi listesi ve ekle/düzenle formu
 * Not: Bu bileşen zaten parent CustomCard içinde render edilir,
 * bu yüzden kendi içinde CustomCard kullanmaz.
 */

export const TeacherExperienceSection: React.FC = () => {
  const {
    experiences,
    isLoadingExperiences,
    deleteExperience,
    isDeletingExperience,
  } = useTeacherProfileAddEdit();

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<TeacherExperienceDto | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = () => {
    setTimeout(() => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const offset = 100;
      window.scrollBy({ top: rect.top - offset, behavior: "smooth" });
    }, 150);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditData(null);
    scrollToSection();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditData(null);
  };

  const handleEdit = (experience: TeacherExperienceDto) => {
    setEditData(experience);
    setShowForm(true);
    scrollToSection();
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteExperience(deletingId);
      setIsDeleteModalOpen(false);
      setDeletingId(null);
    } catch {
      // Snackbar context tarafından yönetilir
    }
  };

  const isEmpty = !experiences || experiences.length === 0;

  // Loading State
  if (isLoadingExperiences) {
    return (
      <div>
        <div className="d-flex align-items-center justify-content-between mb-24">
          <div>
            <h6 className="fw-semibold text-dark mb-4">
              <i className="ph-briefcase me-2"></i>
              İş Deneyimleri
            </h6>
            <p className="text-muted mb-0 text-sm">Yükleniyor...</p>
          </div>
        </div>
        <div className="text-center py-32">
          <div className="spinner-border text-primary mb-12" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="text-muted mb-0">İş deneyimleri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={sectionRef}>
        {/* Section Header */}
        <div className="d-flex align-items-center justify-content-between mb-24">
          <div>
            <h6 className="fw-semibold text-dark mb-4">
              <i className="ph-briefcase me-2"></i>
              İş Deneyimleri
            </h6>
            <p className="text-muted mb-0 text-sm">
              {isEmpty
                ? "İş deneyimi bulunamadı"
                : `Toplam ${experiences.length} adet iş deneyimi`}
            </p>
          </div>
          <Button
            variant={showForm ? "outline" : "inline"}
            size="sm"
            onClick={() => {
              if (showForm) {
                handleCancel();
              } else {
                setEditData(null);
                setShowForm(true);
                scrollToSection();
              }
            }}
          >
            {showForm ? (
              <>
                <i className="ph-x me-2"></i>
                Formu Kapat
              </>
            ) : (
              <>
                <i className="ph-plus me-2"></i>
                Deneyim Ekle
              </>
            )}
          </Button>
        </div>

        <div className="row g-3 align-items-start">
          {/* Form — sadece "Deneyim Ekle" tıklanınca gösterilir */}
          {showForm && (
            <div className="col-6">
              <CustomCard
                variant="outline"
                size="sm"
                title={
                  editData ? "İş Deneyimi Düzenle" : "Yeni İş Deneyimi Ekle"
                }
              >
                <TeacherExperienceForm
                  onSuccess={handleSuccess}
                  onCancel={handleCancel}
                  editData={editData}
                />
              </CustomCard>
            </div>
          )}

          {/* İçerik Alanı */}
          {isEmpty ? (
            /* Boş durum — form açıksa yanında, kapalıysa tam genişlik */
            <div className={showForm ? "col-6" : "col-12"}>
              <div className="text-center py-48">
                <div className="mb-16">
                  <i
                    className="ph-briefcase text-muted"
                    style={{ fontSize: "3.5rem" }}
                  ></i>
                </div>
                <h6 className="text-dark mb-8">Henüz İş Deneyimi Eklenmemiş</h6>
                <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                  İş deneyimlerinizi ekleyerek profilinizi güçlendirin.
                </p>
              </div>
            </div>
          ) : (
            /* Deneyim Listesi */
            <div className={showForm ? "col-6" : "col-12"}>
              <div className="row row-gap-16 mb-12">
                {experiences
                  .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                  .map((exp) => (
                    <div
                      className={showForm ? "col-12" : "col-md-6"}
                      key={exp.id}
                    >
                      <TeacherExperienceItem
                        experience={exp}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                        onCancelEdit={() => setEditData(null)}
                        isEditing={editData?.id === exp.id}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => !isDeletingExperience && setIsDeleteModalOpen(false)}
        title="İş Deneyimini Sil"
        size="md"
      >
        <div className="modal-body">
          <div className="text-center mb-16">
            <div className="mb-12">
              <i
                className="ph-warning-circle text-warning"
                style={{ fontSize: "4rem" }}
              ></i>
            </div>
            <h5 className="mb-8 text-dark">
              İş deneyimini silmek istediğinize emin misiniz?
            </h5>
            <p className="text-muted mb-0">Bu işlem geri alınamaz.</p>
          </div>
        </div>
        <div className="modal-footer d-flex gap-8">
          <Button
            variant="outline"
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={isDeletingExperience}
            className="flex-fill"
          >
            İptal
          </Button>
          <Button
            variant="error"
            onClick={handleConfirmDelete}
            loading={isDeletingExperience}
            className="flex-fill"
          >
            Evet, Sil
          </Button>
        </div>
      </Modal>
    </>
  );
};
