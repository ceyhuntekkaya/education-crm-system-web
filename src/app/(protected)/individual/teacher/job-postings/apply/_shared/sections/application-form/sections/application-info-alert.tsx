"use client";

import React from "react";

/**
 * Başvuru bilgilendirme mesajı
 */
export const ApplicationInfoAlert: React.FC = () => {
  return (
    <div className="p-16 bg-primary-50 rounded-12 d-flex align-items-start gap-12 mb-20">
      <i
        className="ph ph-info text-primary-600 flex-shrink-0"
        style={{ fontSize: "18px" }}
      ></i>
      <div className="flex-grow-1">
        <p className="mb-0 text-sm text-neutral-700">
          Başvurunuz gönderildikten sonra okul yetkilisi tarafından
          değerlendirilecektir. Başvuru durumunuzu{" "}
          <span className="fw-semibold text-primary-600">Başvurularım</span>{" "}
          sayfasından takip edebilirsiniz.
        </p>
      </div>
    </div>
  );
};
