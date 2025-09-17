import React from "react";
import { FormCheckbox } from "@/components/forms";
import { useFormHook } from "@/hooks/use-form-hook";
import {
  mockAvailableSlots,
  appointmentTypeOptions,
} from "../mock/appointment-create-mock";

interface ConfirmationStepProps {
  className?: string;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  className = "",
}) => {
  const { getFieldValue } = useFormHook();

  const selectedSlot = mockAvailableSlots.find(
    (slot) => slot.slotId === parseInt(getFieldValue("selectedSlotId") || "0")
  );
  const selectedAppointmentType = appointmentTypeOptions.find(
    (opt) => opt.value === getFieldValue("appointmentType")
  );

  return (
    <div className={`step-content ${className}`}>
      <h4 className="mb-24">Randevu Özeti</h4>

      <div className="confirmation-summary bg-neutral-50 p-24 rounded-8 mb-24">
        <div className="row gy-3">
          <div className="col-md-6">
            <strong>Randevu Türü:</strong>
            <p className="mt-4">{selectedAppointmentType?.label}</p>
          </div>
          <div className="col-md-6">
            <strong>Tarih & Saat:</strong>
            <p className="mt-4">
              {getFieldValue("appointmentDate")} - {selectedSlot?.timeRange}
            </p>
          </div>
          <div className="col-md-6">
            <strong>Konum:</strong>
            <p className="mt-4">{selectedSlot?.location}</p>
          </div>
          <div className="col-md-6">
            <strong>Görüşmeci:</strong>
            <p className="mt-4">{selectedSlot?.staffUserName}</p>
          </div>
          <div className="col-md-6">
            <strong>Veli:</strong>
            <p className="mt-4">{getFieldValue("parentName")}</p>
          </div>
          <div className="col-md-6">
            <strong>E-posta:</strong>
            <p className="mt-4">{getFieldValue("parentEmail")}</p>
          </div>
          <div className="col-md-6">
            <strong>Telefon:</strong>
            <p className="mt-4">{getFieldValue("parentPhone")}</p>
          </div>
          <div className="col-md-6">
            <strong>Öğrenci:</strong>
            <p className="mt-4">
              {getFieldValue("studentName")} ({getFieldValue("studentAge")} yaş)
            </p>
          </div>
          {getFieldValue("gradeInterested") && (
            <div className="col-md-6">
              <strong>İlgilenilen Sınıf:</strong>
              <p className="mt-4">{getFieldValue("gradeInterested")}</p>
            </div>
          )}
          {getFieldValue("currentSchool") && (
            <div className="col-md-6">
              <strong>Mevcut Okul:</strong>
              <p className="mt-4">{getFieldValue("currentSchool")}</p>
            </div>
          )}
          {getFieldValue("specialRequests") && (
            <div className="col-12">
              <strong>Özel İstekler:</strong>
              <p className="mt-4">{getFieldValue("specialRequests")}</p>
            </div>
          )}
          {getFieldValue("notes") && (
            <div className="col-12">
              <strong>Ek Notlar:</strong>
              <p className="mt-4">{getFieldValue("notes")}</p>
            </div>
          )}
        </div>
      </div>

      <div className="terms-checkbox">
        <FormCheckbox
          name="agreedToTerms"
          label="Kullanım şartlarını ve gizlilik politikasını okudum ve kabul ediyorum. Kişisel verilerimin işlenmesine onay veriyorum."
        />
      </div>
    </div>
  );
};
