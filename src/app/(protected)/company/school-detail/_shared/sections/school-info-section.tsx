"use client";

import React from "react";
import { useSchoolDetail } from "../context/school-detail-context";
import { Button } from "@/components";

export const SchoolInfoSection: React.FC = () => {
  const {
    currentSchool,
    isEditing,
    setIsEditing,
    isLoading,
    selectedSchool,
    schools,
  } = useSchoolDetail();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (!currentSchool) {
    return (
      <div className="alert alert-warning">
        <h5>Okul Bilgisi Bulunamadı</h5>
        <p className="mb-0">
          {schools.length > 0
            ? "Lütfen yukarıdan bir okul seçiniz."
            : "Okul listesi sayfasından okul ekleyiniz."}
        </p>
        {schools.length > 0 && (
          <div className="mt-2">
            <small className="text-muted">
              Mevcut okullar: {schools.map((s) => s.name).join(", ")}
            </small>
          </div>
        )}
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    // TODO: Implement save logic
    setIsEditing(false);
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-24">
      <div className="d-flex align-items-center justify-content-between mb-20">
        <div>
          <h3 className="mb-8">{currentSchool.name}</h3>
          <p className="text-neutral-600 mb-0">
            Okul bilgilerini görüntüleyin ve düzenleyin
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            leftIcon="ph-pencil"
            onClick={handleEdit}
          >
            Düzenle
          </Button>
        )}
      </div>

      {isEditing ? (
        // Edit Mode
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Okul Adı</label>
            <input
              type="text"
              className="form-control"
              defaultValue={currentSchool.name}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">E-posta</label>
            <input
              type="email"
              className="form-control"
              defaultValue={currentSchool.email}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Telefon</label>
            <input
              type="tel"
              className="form-control"
              defaultValue={currentSchool.phone}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Kampüs</label>
            <input
              type="text"
              className="form-control"
              defaultValue={currentSchool.campus?.name}
            />
          </div>
          <div className="col-12">
            <label className="form-label">İl/İlçe</label>
            <input
              type="text"
              className="form-control"
              defaultValue={`${currentSchool.campus?.province?.name || ""} / ${
                currentSchool.campus?.district?.name || ""
              }`}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Açıklama</label>
            <textarea
              className="form-control"
              rows={4}
              defaultValue={currentSchool.description}
            />
          </div>
          <div className="col-12">
            <div className="d-flex gap-2 pt-3">
              <Button
                variant="inline"
                size="sm"
                leftIcon="ph-check"
                onClick={handleSave}
              >
                Kaydet
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon="ph-x"
                onClick={handleCancel}
              >
                İptal
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // View Mode
        <div className="row g-4">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label text-neutral-600">Okul Adı</label>
              <p className="fw-medium mb-0">{currentSchool.name}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label text-neutral-600">E-posta</label>
              <p className="fw-medium mb-0">
                {currentSchool.email || "Belirtilmemiş"}
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label text-neutral-600">Telefon</label>
              <p className="fw-medium mb-0">
                {currentSchool.phone || "Belirtilmemiş"}
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label text-neutral-600">Kampüs</label>
              <p className="fw-medium mb-0">
                {currentSchool.campus?.name || "Belirtilmemiş"}
              </p>
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <label className="form-label text-neutral-600">İl/İlçe</label>
              <p className="fw-medium mb-0">
                {currentSchool.campus?.province?.name &&
                currentSchool.campus?.district?.name
                  ? `${currentSchool.campus.province.name} / ${currentSchool.campus.district.name}`
                  : "Belirtilmemiş"}
              </p>
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <label className="form-label text-neutral-600">Açıklama</label>
              <p className="fw-medium mb-0">
                {currentSchool.description || "Belirtilmemiş"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
