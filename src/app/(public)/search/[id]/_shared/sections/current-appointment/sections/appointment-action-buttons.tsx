"use client";

import React from "react";
import { AppointmentActionButtonsProps } from "../types";

const AppointmentActionButtons: React.FC<AppointmentActionButtonsProps> = ({
  appointment,
  onReschedule,
  onCancel,
  onComplete,
}) => {
  const handleReschedule = () => {
    if (onReschedule) {
      onReschedule();
    } else {
      console.log("Reschedule appointment:", appointment.id);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      console.log("Cancel appointment:", appointment.id);
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    } else {
      console.log("Complete appointment:", appointment.id);
    }
  };

  return (
    <div className="appointment-actions">
      {/* Ana Aksiyon Butonları */}
      <div className="primary-actions mb-24">
        <div className="row g-16">
          {appointment.canComplete && (
            <div className="col-md-6">
              <button
                className="btn btn-success w-100"
                onClick={handleComplete}
              >
                <i className="ph ph-check-circle me-8"></i>
                Randevuyu Tamamla
              </button>
            </div>
          )}

          {appointment.canReschedule && (
            <div className="col-md-6">
              <button
                className="btn btn-warning w-100"
                onClick={handleReschedule}
              >
                <i className="ph ph-arrow-clockwise me-8"></i>
                Yeniden Planla
              </button>
            </div>
          )}
        </div>

        {appointment.canCancel && (
          <div className="row g-16 mt-16">
            <div className="col-12">
              <button
                className="btn btn-outline-danger w-100"
                onClick={handleCancel}
              >
                <i className="ph ph-x me-8"></i>
                Randevuyu İptal Et
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hızlı Eylemler */}
      <div className="quick-actions pt-20 border-top border-neutral-100">
        <h6 className="text-neutral-700 mb-16 d-flex align-items-center">
          <i className="ph ph-lightning me-8 text-main-600"></i>
          Hızlı Eylemler
        </h6>

        <div className="d-flex flex-wrap gap-8 justify-content-center">
          <button className="btn btn-outline-neutral btn-sm">
            <i className="ph ph-share me-6"></i>
            Paylaş
          </button>
          <button className="btn btn-outline-neutral btn-sm">
            <i className="ph ph-calendar-plus me-6"></i>
            Takvime Ekle
          </button>
          <button className="btn btn-outline-neutral btn-sm">
            <i className="ph ph-bell me-6"></i>
            Hatırlatıcı
          </button>
          <button className="btn btn-outline-neutral btn-sm">
            <i className="ph ph-printer me-6"></i>
            Yazdır
          </button>
          <button className="btn btn-outline-neutral btn-sm">
            <i className="ph ph-download-simple me-6"></i>
            PDF İndir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentActionButtons;
