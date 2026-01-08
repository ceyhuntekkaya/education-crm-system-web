"use client";

import React from "react";

export const LoadingState: React.FC = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-16 py-40">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Yükleniyor...</span>
      </div>
      <p className="text-neutral-60 fw-medium">Tedarikçiler yükleniyor...</p>
    </div>
  );
};
