"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components";

interface SupplierErrorStateProps {
  error: string;
}

export const SupplierErrorState: React.FC<SupplierErrorStateProps> = ({
  error,
}) => {
  const router = useRouter();

  return (
    <div className="supplier-detail-page">
      <div className="supplier-detail-page__container">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "400px" }}
        >
          <div
            className="d-flex align-items-center justify-content-center bg-danger-100 text-danger-700 mb-16"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              fontSize: "32px",
            }}
          >
            <i className="ph-bold ph-warning-circle"></i>
          </div>
          <h3 className="text-neutral-900 mb-8">Bir Hata Oluştu</h3>
          <p className="text-neutral-600 mb-20">{error}</p>
          <Button
            variant="inline"
            onClick={() => router.push("/supply/company/suppliers")}
          >
            <i className="ph-bold ph-arrow-left me-2"></i>
            Tedarikçiler Listesine Dön
          </Button>
        </div>
      </div>
    </div>
  );
};
