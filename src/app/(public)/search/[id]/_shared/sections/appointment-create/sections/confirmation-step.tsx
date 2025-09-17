import React from "react";
import { FormCheckbox } from "@/components/forms";
import { useFormHook } from "@/hooks/use-form-hook";
import {
  mockAvailableSlots,
  appointmentTypeOptions,
} from "../mock/appointment-create-mock";
import { AppointmentCreateFormData } from "../types/form-types";
import { AvailableSlotDto } from "@/types/dto/appointment/AvailableSlotDto";
import { ConfirmationStepProps } from "../types/component-types";

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  className = "",
}) => {
  const { getFieldValue } = useFormHook();

  const selectedSlot: AvailableSlotDto | undefined = mockAvailableSlots.find(
    (slot) => slot.slotId === parseInt(getFieldValue("selectedSlotId") || "0")
  );

  const selectedAppointmentType = appointmentTypeOptions.find(
    (opt) => opt.value === getFieldValue("appointmentType")
  );

  return (
    <div className={`step-content ${className}`}>
      <div className="bg-white rounded-16 box-shadow-md overflow-hidden">
        <div className="bg-main-50 px-24 py-16 border-bottom border-main-100">
          <h4 className="mb-0 text-main-800 d-flex align-items-center gap-2">
            <i className="ph ph-check-circle text-main-600 text-xl"></i>
            Randevu Özeti
          </h4>
        </div>

        <div className="px-24 py-20 border-bottom border-neutral-100">
          <div className="d-flex align-items-center gap-2 mb-16">
            <i className="ph ph-calendar-check text-main-600 text-lg"></i>
            <h5 className="mb-0 text-main-700">Randevu Detayları</h5>
          </div>

          <div className="row gy-3">
            <div className="col-md-6">
              <div className="info-item">
                <span className="info-label text-neutral-600 fw-medium d-block mb-4">
                  Randevu Türü
                </span>
                <span className="badge bg-main-600 text-white px-12 py-6 rounded-5">
                  {selectedAppointmentType?.label || "Belirtilmemiş"}
                </span>
              </div>
            </div>

            <div className="col-md-6">
              <div className="info-item">
                <span className="info-label text-neutral-600 fw-medium d-block mb-4">
                  Tarih & Saat
                </span>
                <div className="text-neutral-900 fw-semibold">
                  {getFieldValue("appointmentDate")}
                  <span className="text-neutral-600 ms-8">
                    {selectedSlot?.timeRange ||
                      `${selectedSlot?.startTime} - ${selectedSlot?.endTime}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="info-item">
                <span className="info-label text-neutral-600 fw-medium d-block mb-4">
                  Konum
                </span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-neutral-900">
                    {selectedSlot?.location}
                  </span>
                  {selectedSlot?.isOnline && (
                    <span className="badge bg-success-600 text-white px-8 py-4 rounded-5 text-sm">
                      Online
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="info-item">
                <span className="info-label text-neutral-600 fw-medium d-block mb-4">
                  Görüşmeci
                </span>
                <div className="text-neutral-900">
                  {selectedSlot?.staffUserName}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="info-item">
                <span className="info-label text-neutral-600 fw-medium d-block mb-4">
                  Süre
                </span>
                <div className="text-neutral-900">
                  {selectedSlot?.durationMinutes} dakika
                </div>
              </div>
            </div>

            {selectedSlot?.requiresApproval && (
              <div className="col-md-6">
                <div className="info-item">
                  <span className="info-label text-neutral-600 fw-medium d-block mb-4">
                    Durum
                  </span>
                  <span className="badge bg-warning-600 text-white px-12 py-6 rounded-5">
                    Onay Gerekli
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-24 py-20 border-bottom border-neutral-100">
          <div className="d-flex align-items-center gap-2 mb-16">
            <i className="ph ph-users text-main-600 text-lg"></i>
            <h5 className="mb-0 text-main-700">Kişisel Bilgiler</h5>
          </div>

          <div className="bg-main-25 rounded-8 p-16 mb-16">
            <h6 className="text-main-800 mb-12 d-flex align-items-center gap-2">
              <i className="ph ph-user-circle text-main-600"></i>
              Veli Bilgileri
            </h6>
            <div className="row gy-2">
              <div className="col-md-4">
                <span className="text-neutral-600 d-block mb-4 text-sm">
                  Ad Soyad
                </span>
                <div className="text-neutral-900 fw-medium">
                  {getFieldValue("parentName")}
                </div>
              </div>
              <div className="col-md-4">
                <span className="text-neutral-600 d-block mb-4 text-sm">
                  E-posta
                </span>
                <div className="text-neutral-900 fw-medium">
                  {getFieldValue("parentEmail")}
                </div>
              </div>
              <div className="col-md-4">
                <span className="text-neutral-600 d-block mb-4 text-sm">
                  Telefon
                </span>
                <div className="text-neutral-900 fw-medium">
                  {getFieldValue("parentPhone")}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-25 rounded-8 p-16">
            <h6 className="text-neutral-800 mb-12 d-flex align-items-center gap-2">
              <i className="ph ph-student text-main-600"></i>
              Öğrenci Bilgileri
            </h6>
            <div className="row gy-2">
              <div className="col-md-3">
                <span className="text-neutral-600 d-block mb-4 text-sm">
                  Ad Soyad
                </span>
                <div className="text-neutral-900 fw-medium">
                  {getFieldValue("studentName")}
                </div>
              </div>

              {getFieldValue("studentAge") && (
                <div className="col-md-3">
                  <span className="text-neutral-600 d-block mb-4 text-sm">
                    Yaş
                  </span>
                  <div className="text-neutral-900 fw-medium">
                    {getFieldValue("studentAge")} yaş
                  </div>
                </div>
              )}

              {getFieldValue("studentGender") && (
                <div className="col-md-3">
                  <span className="text-neutral-600 d-block mb-4 text-sm">
                    Cinsiyet
                  </span>
                  <div className="text-neutral-900 fw-medium">
                    {getFieldValue("studentGender") === "MALE" && "Erkek"}
                    {getFieldValue("studentGender") === "FEMALE" && "Kız"}
                    {getFieldValue("studentGender") === "OTHER" && "Diğer"}
                    {getFieldValue("studentGender") === "PREFER_NOT_TO_SAY" &&
                      "Belirtmek İstemiyorum"}
                  </div>
                </div>
              )}

              {getFieldValue("studentBirthDate") && (
                <div className="col-md-3">
                  <span className="text-neutral-600 d-block mb-4 text-sm">
                    Doğum Tarihi
                  </span>
                  <div className="text-neutral-900 fw-medium">
                    {getFieldValue("studentBirthDate")}
                  </div>
                </div>
              )}

              {getFieldValue("gradeInterested") && (
                <div className="col-md-6">
                  <span className="text-neutral-600 d-block mb-4 text-sm">
                    İlgilenilen Sınıf
                  </span>
                  <div className="text-neutral-900 fw-medium">
                    {getFieldValue("gradeInterested")}
                  </div>
                </div>
              )}

              {getFieldValue("currentSchool") && (
                <div className="col-md-6">
                  <span className="text-neutral-600 d-block mb-4 text-sm">
                    Mevcut Okul
                  </span>
                  <div className="text-neutral-900 fw-medium">
                    {getFieldValue("currentSchool")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {(getFieldValue("title") ||
          getFieldValue("description") ||
          getFieldValue("specialRequests") ||
          getFieldValue("notes")) && (
          <div className="px-24 py-20 border-bottom border-neutral-100">
            <div className="d-flex align-items-center gap-2 mb-16">
              <i className="ph ph-note-pencil text-main-600 text-lg"></i>
              <h5 className="mb-0 text-main-700">Ek Bilgiler</h5>
            </div>

            <div className="row gy-3">
              {getFieldValue("title") && (
                <div className="col-12">
                  <span className="text-neutral-600 d-block mb-8 fw-medium">
                    Randevu Başlığı
                  </span>
                  <div className="bg-neutral-25 rounded-8 p-12 text-neutral-900">
                    {getFieldValue("title")}
                  </div>
                </div>
              )}

              {getFieldValue("description") && (
                <div className="col-12">
                  <span className="text-neutral-600 d-block mb-8 fw-medium">
                    Açıklama
                  </span>
                  <div className="bg-neutral-25 rounded-8 p-12 text-neutral-900">
                    {getFieldValue("description")}
                  </div>
                </div>
              )}

              {getFieldValue("specialRequests") && (
                <div className="col-12">
                  <span className="text-neutral-600 d-block mb-8 fw-medium">
                    Özel İstekler
                  </span>
                  <div className="bg-warning-25 rounded-8 p-12 text-neutral-900">
                    {getFieldValue("specialRequests")}
                  </div>
                </div>
              )}

              {getFieldValue("notes") && (
                <div className="col-12">
                  <span className="text-neutral-600 d-block mb-8 fw-medium">
                    Ek Notlar
                  </span>
                  <div className="bg-neutral-25 rounded-8 p-12 text-neutral-900">
                    {getFieldValue("notes")}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="px-24 py-20">
          <div className="text-center mb-20">
            <i className="ph ph-check-circle text-success-600 text-4xl mb-12 d-block"></i>
            <h5 className="text-neutral-900 mb-8">Son Adım</h5>
            <p className="text-neutral-600 mb-0">
              Randevu oluşturmak için aşağıdaki koşulları kabul etmeniz
              gerekmektedir
            </p>
          </div>

          <div className="bg-main-25 rounded-8 p-16 mb-16">
            <FormCheckbox
              name="agreedToTerms"
              label="Kullanım şartlarını ve gizlilik politikasını okudum ve kabul ediyorum. Kişisel verilerimin işlenmesine onay veriyorum."
            />
            <div className="mt-8 d-flex align-items-center gap-2 text-neutral-600">
              <i className="ph ph-shield-check text-main-600"></i>
              <small>
                Bu randevu KVKK kapsamında güvenli bir şekilde işlenmektedir.
              </small>
            </div>
          </div>

          <div className="text-center">
            <div className="alert alert-info d-inline-flex align-items-center px-16 py-12 rounded-8 border-0 bg-info-25">
              <i className="ph ph-info text-info-600 me-8"></i>
              <small className="text-info-700 mb-0">
                Randevunuz onaylandıktan sonra size bilgilendirme e-postası
                gönderilecektir.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
