"use client";

import React, { useRef, useState, useEffect } from "react";
import { useTeacherProfileAddEdit } from "../context";
import { Button } from "@/components/ui";
import { Modal, CustomCard } from "@/components";
import { TeacherEducationItem } from "./teacher-education-item";
import { TeacherEducationForm } from "./teacher-education-form";
import type { TeacherEducationDto } from "@/types";

/**
 * ================================================================================
 * TEACHER EDUCATION SECTION
 * ================================================================================
 * Eğitim bilgileri listesi ve ekle/düzenle formu
 * Not: Bu bileşen zaten parent CustomCard içinde render edilir,
 * bu yüzden kendi içinde CustomCard kullanmaz.
 */

export const TeacherEducationSection: React.FC = () => {
  const {
    educations,
    isLoadingEducations,
    deleteEducation,
    isDeletingEducation,
  } = useTeacherProfileAddEdit();

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<TeacherEducationDto | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // scrollTrigger her artışında useEffect DOM paint sonrası doğru pozisyonu hesaplar
  const [scrollTrigger, setScrollTrigger] = useState(0);
  const triggerScroll = () => setScrollTrigger((prev) => prev + 1);

  useEffect(() => {
    if (scrollTrigger === 0) return;
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const top =
          sectionRef.current.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: "smooth" });
      });
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [scrollTrigger]);

  const handleSuccess = () => {
    setShowForm(false);
    setEditData(null);
    triggerScroll();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditData(null);
    triggerScroll();
  };

  const handleEdit = (education: TeacherEducationDto) => {
    setEditData(education);
    setShowForm(true);
    triggerScroll();
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteEducation(deletingId);
      setIsDeleteModalOpen(false);
      setDeletingId(null);
    } catch {
      // Snackbar context tarafından yönetilir
    }
  };

  const isEmpty = !educations || educations.length === 0;

  // Loading State
  if (isLoadingEducations) {
    return (
      <div>
        <div className="d-flex align-items-center justify-content-between mb-24">
          <div>
            <h6 className="fw-semibold text-dark mb-4">
              <i className="ph-graduation-cap me-2"></i>
              Eğitim Bilgileri
            </h6>
            <p className="text-muted mb-0 text-sm">Yükleniyor...</p>
          </div>
        </div>
        <div className="text-center py-32">
          <div className="spinner-border text-primary mb-12" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="text-muted mb-0">Eğitim bilgileri yükleniyor...</p>
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
              <i className="ph-graduation-cap me-2"></i>
              Eğitim Bilgileri
            </h6>
            <p className="text-muted mb-0 text-sm">
              {isEmpty
                ? "Eğitim bilgisi bulunamadı"
                : `Toplam ${educations.length} adet eğitim bilgisi`}
            </p>
          </div>
          <Button
            variant={showForm ? "outline" : "inline"}
            size="sm"
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                setEditData(null);
                triggerScroll();
              } else {
                setEditData(null);
                setShowForm(true);
                triggerScroll();
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
                Eğitim Ekle
              </>
            )}
          </Button>
        </div>

        <div className="row g-3 align-items-start">
          {/* Form — sadece "Eğitim Ekle" tıklanınca gösterilir */}
          {showForm && (
            <div className="col-6">
              <CustomCard
                variant="outline"
                size="sm"
                title={editData ? "Eğitim Bilgisi Düzenle" : "Yeni Eğitim Ekle"}
              >
                <TeacherEducationForm
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
                    className="ph-graduation-cap text-muted"
                    style={{ fontSize: "3.5rem" }}
                  ></i>
                </div>
                <h6 className="text-dark mb-8">
                  Henüz Eğitim Bilgisi Eklenmemiş
                </h6>
                <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                  Eğitim bilgilerinizi ekleyerek profilinizi güçlendirin.
                </p>
              </div>
            </div>
          ) : (
            /* Eğitim Listesi */
            <div className={showForm ? "col-6" : "col-12"}>
              <div className="row row-gap-16 mb-12">
                {educations
                  .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                  .map((edu) => (
                    <div
                      className={showForm ? "col-12" : "col-md-6"}
                      key={edu.id}
                    >
                      <TeacherEducationItem
                        education={edu}
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                        onCancelEdit={() => setEditData(null)}
                        isEditing={editData?.id === edu.id}
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
        onClose={() => !isDeletingEducation && setIsDeleteModalOpen(false)}
        title="Eğitim Bilgisini Sil"
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
              Eğitim bilgisini silmek istediğinize emin misiniz?
            </h5>
            <p className="text-muted mb-0">Bu işlem geri alınamaz.</p>
          </div>
        </div>
        <div className="modal-footer d-flex gap-8">
          <Button
            variant="outline"
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={isDeletingEducation}
            className="flex-fill"
          >
            İptal
          </Button>
          <Button
            variant="error"
            onClick={handleConfirmDelete}
            loading={isDeletingEducation}
            className="flex-fill"
          >
            Evet, Sil
          </Button>
        </div>
      </Modal>
    </>
  );
};
