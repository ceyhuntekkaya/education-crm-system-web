"use client";

import React from "react";

interface ErrorStateProps {
  message?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
}) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-48">
      <div
        className="d-flex align-items-center justify-content-center bg-danger-100 rounded-circle mb-16"
        style={{ width: "80px", height: "80px" }}
      >
        <i
          className="ph-duotone ph-warning-circle text-danger-500"
          style={{ fontSize: "40px" }}
        />
      </div>
      <h5 className="mb-8 text-neutral-900">Bir Hata Oluştu</h5>
      <p className="text-neutral-600 text-center mb-0">{message}</p>
    </div>
  );
};
