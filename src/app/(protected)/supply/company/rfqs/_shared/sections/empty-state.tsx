"use client";

import React from "react";

export const EmptyState: React.FC = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-48">
      <div
        className="d-flex align-items-center justify-content-center bg-neutral-100 rounded-circle mb-16"
        style={{ width: "80px", height: "80px" }}
      >
        <i
          className="ph-duotone ph-file-text text-neutral-400"
          style={{ fontSize: "40px" }}
        ></i>
      </div>
      <h5 className="mb-8 text-neutral-900">Henüz Teklif Talebi Yok</h5>
      <p className="text-neutral-600 text-center mb-0">
        Henüz herhangi bir teklif talebi oluşturulmamış.
        <br />
        İlk teklif talebinizi oluşturmak için yukarıdaki butonu
        kullanabilirsiniz.
      </p>
    </div>
  );
};
