"use client";

import React from "react";
import { Loading } from "@/components";

export const SupplierLoadingState: React.FC = () => {
  return (
    <div className="supplier-detail-page">
      <div className="supplier-detail-page__container">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "400px" }}
        >
          <Loading />
          <p className="text-neutral-600 mt-3">
            Tedarikçi bilgileri yükleniyor...
          </p>
        </div>
      </div>
    </div>
  );
};
