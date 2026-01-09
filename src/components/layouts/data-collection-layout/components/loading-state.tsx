"use client";

import React from "react";

/**
 * 📦 LOADING STATE
 * Yükleniyor durumu
 */
export const LoadingState: React.FC<{ text?: string }> = ({
  text = "Yükleniyor...",
}) => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center bg-white rounded-16 py-64"
      style={{
        border: "1.5px solid hsl(var(--neutral-40))",
        minHeight: "400px",
      }}
    >
      <div className="spinner-border text-primary-500 mb-16" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-neutral-600 text-md mb-0">{text}</p>
    </div>
  );
};
