import React, { useMemo } from "react";
import { FormCheckbox } from "@/components/forms";
import { useFormHook } from "@/hooks/use-form-hook";
import { useAuth } from "@/contexts";
import { appointmentTypeOptions } from "../mock";
import { ConfirmationStepProps } from "../types";
import { useAppointment } from "../contexts";
import { getTypeDisplayName } from "@/utils";

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  className = "",
}) => {
  const { getFieldValue } = useFormHook();
  const { user } = useAuth();
  const { slots } = useAppointment();

  // Seçili slot'u bul
  const selectedSlot = useMemo(() => {
    const selectedSlotId = getFieldValue("selectedSlotId");
    if (!selectedSlotId || !Array.isArray(slots)) return null;

    return slots.find((slot) => slot.id === parseInt(selectedSlotId));
  }, [getFieldValue, slots]);

  const selectedAppointmentType = appointmentTypeOptions.find(
    (opt) => opt.value === getFieldValue("appointmentType")
  );

  // Tarih formatla
  const formattedDate = useMemo(() => {
    const appointmentDate = getFieldValue("appointmentDate");
    if (!appointmentDate) return "Belirtilmemiş";

    return new Date(appointmentDate).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    });
  }, [getFieldValue]);

  // Saat formatla
  const formattedTime = useMemo(() => {
    if (!selectedSlot?.slotDate) return "Belirtilmemiş";

    const startTime = new Date(selectedSlot.slotDate).toLocaleTimeString(
      "tr-TR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    // End time hesapla (duration ekleyerek)
    const endDate = new Date(selectedSlot.slotDate);
    endDate.setMinutes(
      endDate.getMinutes() + (selectedSlot.durationMinutes || 30)
    );
    const endTime = endDate.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${startTime} - ${endTime}`;
  }, [selectedSlot]);

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
                <div className="d-flex flex-column gap-1">
                  <span className="text-neutral-900 fw-semibold">
                    {formattedDate}
                  </span>
                  <span className="text-neutral-600">{formattedTime}</span>
                </div>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Randevu Türü (Slot)
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-900">
                  {selectedSlot?.appointmentType
                    ? getTypeDisplayName(selectedSlot.appointmentType)
                    : "Belirtilmemiş"}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Okul
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-900">
                  {selectedSlot?.schoolName || "Belirtilmemiş"}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Görüşme Yöntemi
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <div className="d-flex align-items-center gap-2">
                  {selectedSlot?.onlineMeetingAvailable ? (
                    <>
                      <span className="text-neutral-900">Online Görüşme</span>
                      <span className="badge bg-success-600 text-white px-8 py-4 rounded-5 text-sm">
                        Online
                      </span>
                    </>
                  ) : (
                    <span className="text-neutral-900">Yüz Yüze Görüşme</span>
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
                  {selectedSlot?.staffUserName || "Belirtilmemiş"}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Süre
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-900">
                  {selectedSlot?.durationMinutes || 30} dakika
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
                  {user?.fullName || (user?.firstName && user?.lastName)
                    ? `${user?.firstName} ${user?.lastName}`
                    : "Belirtilmemiş"}
                </span>
              </span>
            </li>
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                E-posta
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-900 fw-medium">
                  {user?.email || "Belirtilmemiş"}
                </span>
              </span>
            </li>
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Telefon
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-neutral-900 fw-medium">
                  {user?.phone || "Belirtilmemiş"}
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
