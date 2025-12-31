"use client";

import React from "react";

export const QuotationsEmptyState: React.FC = () => {
  return (
    <div className="text-center py-80">
      <div className="mb-32">
        <i
          className="ph-duotone ph-file-text text-neutral-400"
          style={{ fontSize: "64px" }}
        ></i>
      </div>
      <h4 className="mb-16 text-neutral-900">Teklif Bulunamadı</h4>
      <p className="text-neutral-500 mb-0 text-sm">
        Henüz bu şirket için teklif oluşturulmamış.
        <br />
        Yeni bir RFQ oluşturarak tedarikçilerden teklif alabilirsiniz.
      </p>
    </div>
  );
};
