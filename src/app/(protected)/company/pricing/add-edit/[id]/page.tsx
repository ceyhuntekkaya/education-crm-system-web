"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { SchoolPricingForm, usePricingAddEdit } from "../_shared";

interface PricingAddEditPageProps {}

const PricingAddEditPage: React.FC<PricingAddEditPageProps> = () => {
  const router = useRouter();
  const { isEditing, pricing, pricingLoading } = usePricingAddEdit();

  const pageTitle = isEditing ? "Fiyat Bilgisi Düzenle" : "Yeni Fiyat Bilgisi";

  const handleGoBack = () => {
    router.push("/company/pricing");
  };

  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-24">
          <div>
            <h2 className="mb-8">{pageTitle}</h2>
            <p className="text-neutral-600 mb-0">
              {isEditing
                ? "Mevcut fiyat bilgilerini düzenleyin"
                : "Yeni okul fiyat bilgilerini oluşturun"}
            </p>
          </div>
          <div className="d-flex gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon="ph-arrow-left"
              onClick={handleGoBack}
            >
              Geri Dön
            </Button>
          </div>
        </div>

        <span className="d-block border border-neutral-30 my-20 border-dashed" />

        {/* Form Content */}
        {pricingLoading && isEditing ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Yükleniyor...</span>
            </div>
            <p className="mt-3 text-muted">Fiyat bilgileri yükleniyor...</p>
          </div>
        ) : (
          <SchoolPricingForm isEditing={isEditing} initialData={pricing} />
        )}
      </div>
    </div>
  );
};

export default PricingAddEditPage;
