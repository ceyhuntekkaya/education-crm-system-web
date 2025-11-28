"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components";
import { usePageTitle } from "@/hooks";

interface AppointmentAddEditPageProps {}

const AppointmentAddEditPage: React.FC<AppointmentAddEditPageProps> = () => {
  usePageTitle("Randevu Düzenle");
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const isEditing = id !== "new";
  const pageTitle = isEditing ? "Randevu Düzenle" : "Yeni Randevu Oluştur";

  const handleGoBack = () => {
    router.push("/company/appointment");
  };

  const handleSave = () => {
    // Save logic will be implemented here
    console.log("Saving appointment data...");
    // After save, redirect to list
    router.push("/company/appointment");
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-24">
          <div>
            <h2 className="mb-8">{pageTitle}</h2>
            <p className="text-neutral-600 mb-0">
              {isEditing
                ? "Mevcut randevu bilgilerini düzenleyin"
                : "Yeni randevu bilgilerini oluşturun"}
            </p>
          </div>
          <div className="d-flex gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon="ph-arrow-left"
              onClick={handleGoBack}
            >
              Geri Dön
            </Button>
            <Button
              variant="inline"
              size="sm"
              rightIcon="ph-check"
              onClick={handleSave}
            >
              {isEditing ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        {/* Form Content */}
        <div className="row">
          <div className="col-12">
            <div className="text-center py-5">
              <i
                className="ph ph-calendar text-neutral-400"
                style={{ fontSize: "64px" }}
              ></i>
              <h4 className="mt-3 mb-2">Randevu Formu</h4>
              <p className="text-neutral-600">
                Bu alan randevu ekleme/düzenleme formu için ayrılmıştır.
                <br />
                Form bileşenleri burada yer alacaktır.
              </p>
              {isEditing && (
                <div className="mt-3">
                  <small className="text-muted">
                    Düzenlenen ID: <strong>{id}</strong>
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentAddEditPage;
