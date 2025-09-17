import React from "react";
import { FormCheckbox } from "@/components/forms";
import { useFormHook } from "@/hooks/use-form-hook";
import {
  mockAvailableSlots,
  appointmentTypeOptions,
} from "../mock/appointment-create-mock";
import { ConfirmationStepProps } from "../types";
import { AvailableSlotDto } from "@/types";

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
    <div className={`tutor-details__content ${className}`}>
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          {/* Ana Başlık */}
          <h4 className="mb-16 d-flex align-items-center gap-4">
            <i className="ph ph-check-circle text-neutral-900 text-xl"></i>
            Randevu Özeti
          </h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          {/* Randevu Detayları Bölümü */}
          <h5 className="mb-16 d-flex align-items-center gap-4">
            <i className="ph ph-calendar-check text-neutral-900 text-lg"></i>
            Randevu Detayları
          </h5>
          <ul className="tution-info-list bg-white rounded-8 mb-32">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Randevu Türü
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="badge bg-main-600 text-white px-12 py-6 rounded-5">
                  {selectedAppointmentType?.label || "Belirtilmemiş"}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Tarih & Saat
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-900 fw-semibold">
                  {getFieldValue("appointmentDate")}
                  <span className="text-neutral-600 ms-8">
                    {selectedSlot?.timeRange ||
                      `${selectedSlot?.startTime} - ${selectedSlot?.endTime}`}
                  </span>
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Konum
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
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
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Görüşmeci
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-900">
                  {selectedSlot?.staffUserName}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Süre
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-900">
                  {selectedSlot?.durationMinutes} dakika
                </span>
              </span>
            </li>

            {selectedSlot?.requiresApproval && (
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">
                  Durum
                </span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">
                  <span className="badge bg-warning-600 text-white px-12 py-6 rounded-5">
                    Onay Gerekli
                  </span>
                </span>
              </li>
            )}
          </ul>

          {/* Kişisel Bilgiler Bölümü */}
          <h5 className="mb-24 d-flex align-items-center gap-4">
            <i className="ph ph-users text-neutral-900 text-lg"></i>
            Kişisel Bilgiler
          </h5>

          {/* Veli Bilgileri */}
          <h6 className="text-main-800 mb-16 d-flex align-items-center gap-4 ps-8">
            <i className="ph ph-user-circle text-main-600"></i>
            Veli Bilgileri
          </h6>
          <ul className="tution-info-list bg-white rounded-8 mb-24 ms-8">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Ad Soyad
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-900 fw-medium">
                  {getFieldValue("parentName")}
                </span>
              </span>
            </li>
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                E-posta
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-900 fw-medium">
                  {getFieldValue("parentEmail")}
                </span>
              </span>
            </li>
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Telefon
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-900 fw-medium">
                  {getFieldValue("parentPhone")}
                </span>
              </span>
            </li>
          </ul>

          {/* Öğrenci Bilgileri */}
          <h6 className="text-main-800 mb-16 d-flex align-items-center gap-4 ps-8">
            <i className="ph ph-student text-main-600"></i>
            Öğrenci Bilgileri
          </h6>
          <ul className="tution-info-list bg-white rounded-8 mb-32 ms-8">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Ad Soyad
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-900 fw-medium">
                  {getFieldValue("studentName")}
                </span>
              </span>
            </li>

            {getFieldValue("studentAge") && (
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">
                  Yaş
                </span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">
                  <span className="text-neutral-900 fw-medium">
                    {getFieldValue("studentAge")} yaş
                  </span>
                </span>
              </li>
            )}

            {getFieldValue("studentGender") && (
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">
                  Cinsiyet
                </span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">
                  <span className="text-neutral-900 fw-medium">
                    {getFieldValue("studentGender") === "MALE" && "Erkek"}
                    {getFieldValue("studentGender") === "FEMALE" && "Kız"}
                    {getFieldValue("studentGender") === "OTHER" && "Diğer"}
                    {getFieldValue("studentGender") === "PREFER_NOT_TO_SAY" &&
                      "Belirtmek İstemiyorum"}
                  </span>
                </span>
              </li>
            )}

            {getFieldValue("studentBirthDate") && (
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">
                  Doğum Tarihi
                </span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">
                  <span className="text-neutral-900 fw-medium">
                    {getFieldValue("studentBirthDate")}
                  </span>
                </span>
              </li>
            )}

            {getFieldValue("gradeInterested") && (
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">
                  İlgilenilen Sınıf
                </span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">
                  <span className="text-neutral-900 fw-medium">
                    {getFieldValue("gradeInterested")}
                  </span>
                </span>
              </li>
            )}

            {getFieldValue("currentSchool") && (
              <li className="d-flex align-items-start px-32 py-16">
                <span className="w-50-percent fw-semibold text-neutral-700">
                  Mevcut Okul
                </span>
                <span className="w-50-percent fw-normal text-neutral-500 text-md">
                  <span className="text-neutral-900 fw-medium">
                    {getFieldValue("currentSchool")}
                  </span>
                </span>
              </li>
            )}
          </ul>

          {/* Ek Bilgiler Bölümü */}
          {(getFieldValue("title") ||
            getFieldValue("description") ||
            getFieldValue("specialRequests") ||
            getFieldValue("notes")) && (
            <>
              <h5 className="mb-24 d-flex align-items-center gap-4">
                <i className="ph ph-note-pencil text-neutral-900 text-lg"></i>
                Ek Bilgiler
              </h5>

              {/* İlk satır: Randevu Başlığı ve Açıklama */}
              {(getFieldValue("title") || getFieldValue("description")) && (
                <ul className="tution-info-list bg-white rounded-8 mb-24">
                  {getFieldValue("title") && (
                    <li className="d-flex align-items-start px-32 py-16">
                      <span className="w-30-percent fw-semibold text-neutral-700">
                        Randevu Başlığı
                      </span>
                      <span className="w-70-percent fw-normal text-neutral-500 text-md">
                        <span className="text-neutral-900 fw-medium">
                          {getFieldValue("title")}
                        </span>
                      </span>
                    </li>
                  )}

                  {getFieldValue("description") && (
                    <li className="d-flex align-items-start px-32 py-16">
                      <span className="w-30-percent fw-semibold text-neutral-700">
                        Açıklama
                      </span>
                      <span className="w-70-percent fw-normal text-neutral-500 text-md">
                        <span className="text-neutral-900 fw-medium">
                          {getFieldValue("description")}
                        </span>
                      </span>
                    </li>
                  )}
                </ul>
              )}

              {/* Özel İstekler */}
              {getFieldValue("specialRequests") && (
                <>
                  <h6 className="text-main-800 mb-16 d-flex align-items-center gap-4 ps-8">
                    <i className="ph ph-warning-circle text-warning-600"></i>
                    Özel İstekler
                  </h6>
                  <ul className="tution-info-list bg-white rounded-8 mb-24 ms-8">
                    <li className="d-flex align-items-start px-32 py-16">
                      <span className="w-50-percent fw-semibold text-neutral-700">
                        İstekler
                      </span>
                      <span className="w-50-percent fw-normal text-neutral-500 text-md">
                        <span className="bg-warning-25 rounded-6 px-12 py-8 text-neutral-900 fw-medium d-block">
                          {getFieldValue("specialRequests")}
                        </span>
                      </span>
                    </li>
                  </ul>
                </>
              )}

              {/* Ek Notlar */}
              {getFieldValue("notes") && (
                <>
                  <h6 className="text-main-800 mb-16 d-flex align-items-center gap-4 ps-8">
                    <i className="ph ph-note-pencil text-main-600"></i>
                    Ek Notlar
                  </h6>
                  <ul className="tution-info-list bg-white rounded-8 mb-24 ms-8">
                    <li className="d-flex align-items-start px-32 py-16">
                      <span className="w-50-percent fw-semibold text-neutral-700">
                        Notlar
                      </span>
                      <span className="w-50-percent fw-normal text-neutral-500 text-md">
                        <span className="text-neutral-900 fw-medium">
                          {getFieldValue("notes")}
                        </span>
                      </span>
                    </li>
                  </ul>
                </>
              )}

              {/* Son row'un bottom margin'ı */}
              <div className="mb-8"></div>
            </>
          )}

          {/* Son Adım - Onay Bölümü */}
          <h5 className="mb-16 d-flex align-items-center gap-4">
            <i className="ph ph-check-circle text-neutral-900 text-lg"></i>
            Son Adım
          </h5>

          <ul className="tution-info-list bg-white rounded-8 mb-32">
            <li className="d-flex align-items-start px-32 py-24">
              <span className="w-100-percent">
                <div className="d-flex align-items-center gap-3 mb-16">
                  <i className="ph ph-shield-check text-success-600 text-xl"></i>
                  <h6 className="text-neutral-900 mb-0">Onay Gereklidir</h6>
                </div>
                <p className="text-neutral-600 mb-20 text-sm">
                  Randevu oluşturmak için aşağıdaki koşulları kabul etmeniz
                  gerekmektedir
                </p>

                <div className="bg-main-25 rounded-8 p-20 mb-16">
                  <FormCheckbox
                    name="agreedToTerms"
                    label="Kullanım şartlarını ve gizlilik politikasını okudum ve kabul ediyorum. Kişisel verilerimin işlenmesine onay veriyorum."
                  />
                </div>

                <div className="d-flex align-items-center gap-2 text-neutral-600 mb-16">
                  <i className="ph ph-shield-check text-main-600"></i>
                  <small>
                    Bu randevu KVKK kapsamında güvenli bir şekilde
                    işlenmektedir.
                  </small>
                </div>

                <div className="alert alert-info d-flex align-items-center px-16 py-12 rounded-6 border-0 bg-info-25 mb-0">
                  <i className="ph ph-info text-info-600 me-8"></i>
                  <small className="text-info-700 mb-0">
                    Randevunuz onaylandıktan sonra size bilgilendirme e-postası
                    gönderilecektir.
                  </small>
                </div>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
